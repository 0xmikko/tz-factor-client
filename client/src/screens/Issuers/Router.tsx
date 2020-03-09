import React from 'react';
import { PrivateRoute } from '../../components/PrivateRoute';
import { withTracker } from '../../utils/ga';
import { PaymentsScreen } from './Payments/PaymentsScreen';

const RetailerRouter : React.FC = () =>  {
return (<>
    <PrivateRoute path="/" component={withTracker(PaymentsScreen)} />
    <PrivateRoute path="/" component={withTracker(PaymentsScreen)} />

</>);
}