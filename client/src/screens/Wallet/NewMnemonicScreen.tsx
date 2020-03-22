import React from "react";
import {TezosWalletUtil} from "conseiljs";
import { Container } from "react-bootstrap";
import PageHeader from "../../components/PageHeader/PageHeader";
import {Breadcrumb} from "../../components/PageHeader/Breadcrumb";

export const NewMnemonicScreen: React.FC = () => {
    const mnemonic = TezosWalletUtil.generateMnemonic();
    console.log(`mnemonic: ${mnemonic}`);

    alert("QQQ")

    const breadcrumbs: Breadcrumb[] = [
        {
            url: '/wallet',
            title: 'Wallet',
        },
    ];

    return <div className="content content-fixed">
        <PageHeader
            title={'Generating new address'}
            breadcrumbs={breadcrumbs}
        /><Container>KUKU:{mnemonic}</Container>
    </div>

}
