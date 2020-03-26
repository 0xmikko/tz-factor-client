import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {AccountKey, FaucetAccount} from '../../core/accounts';
import {KeyStore} from 'conseiljs/dist/types/wallet/KeyStore';
import {TezosNodeWriter, TezosWalletUtil} from 'conseiljs';
import {ACCOUNTS_KEY_PREFIX, ACCOUNTS_PREFIX, namespace} from './index';
import {DETAIL_FAILURE, DETAIL_SUCCESS, LIST_FAILURE, LIST_SUCCESS} from '../dataloader';
import {tezosNode} from '../../config';
import {SocketEmitAction} from "../socketMiddleware";
import {PAYMENTS_PREFIX} from "../payments";

export const addNewKey = (
  fa: FaucetAccount,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const newKeystore: KeyStore = await TezosWalletUtil.unlockFundraiserIdentity(
    fa.mnemonic,
    fa.email,
    fa.password,
    fa.pkh,
  );

  const newAccountKey: AccountKey = {
    id: newKeystore.publicKeyHash,
    name: fa.name,
    keystore: newKeystore,
    status: 'New',
  };

  const result = await TezosNodeWriter.sendIdentityActivationOperation(
    tezosNode,
    newKeystore,
    fa.secret,
  );
  console.log(`Injected operation group id ${result.operationGroupID}`);

  dispatch(updateAccountKey(newAccountKey));
  dispatch(RevealAccount(newAccountKey));
};

export const RevealAccount = (
  account: AccountKey,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {

    console.log("Try to reveal account for ", account.name)
  try {
    const result = await TezosNodeWriter.sendKeyRevealOperation(
        tezosNode,
        account.keystore,
    );
    console.log(`Injected REVEAL operation group id ${result.operationGroupID}`);
    account.status = 'Revealed';
    dispatch(updateAccountKey(account));
  }
  catch (e) {
      console.log("Error during revealing account", e)

  }
};

export const registerAccount: (id: string, opHash: string) => SocketEmitAction = (id, opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'accounts:create',
  typeOnFailure: ACCOUNTS_PREFIX + DETAIL_FAILURE,
  payload: { id, opHash },
});

export const deposit: (id: string, opHash: string) => SocketEmitAction = (id, opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'accounts:deposit',
  typeOnFailure: ACCOUNTS_PREFIX + DETAIL_FAILURE,
  payload: {id, opHash},
});


export const updateAccountKey = (
  updatedKey: AccountKey,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const keys: AccountKey[] = [];
  const keysJSON = localStorage.getItem('keys');
  if (keysJSON) {
    const existingKeys = JSON.parse(keysJSON) as AccountKey[];
    let found = false;
    for (const k of existingKeys) {
        console.log(k, updatedKey, found)
      if (k.id === updatedKey.id) {
        keys.push(updatedKey);
        found = true;
      } else {
        keys.push(k);
      }
    }
    if (!found) keys.push(updatedKey);
  } else {
    keys.push(updatedKey);
  }
  localStorage.setItem('keys', JSON.stringify(keys));
  console.log('keystore', keys);
  dispatch(getLocalAccountsList());
};

export const getLocalAccountsList = () => {
  const results = localStorage.getItem('keys');
  const keys: KeyStore[] = results ? (JSON.parse(results) as KeyStore[]) : [];
  return {
    type: ACCOUNTS_KEY_PREFIX + LIST_SUCCESS,
    payload: keys,
  };
};




export const connectSocket = (): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
    > => async dispatch => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'accounts:updateList',
    typeOnSuccess: ACCOUNTS_PREFIX + LIST_SUCCESS,
  });

};


export const getList: () => SocketEmitAction = () => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'accounts:list',
  typeOnFailure: ACCOUNTS_PREFIX + LIST_FAILURE,
  payload: undefined,
});
