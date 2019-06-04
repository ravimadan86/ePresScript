import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router';
import TreatmentContainer from'../containers/TreatmentContainer';
import LoginContainer from '../containers/LoginContainer';
import MedicineContainer from '../containers/MedicineContainer';
import DashboardContentContainer from '../containers/DashboardContentContainer'
import ProtectedRoute from '../features/protectedRoute/ProtectedRoute';
import RootContainer from '../containers/RootContainer';
import ForgetPassword from '../components/forgetPassword';
import Patients from '../components/Patient';
import Patient from '../components/PatientProfile';
import PrescriptionContainer from '../containers/PrescriptionContainer';
import SettingsContainer from '../containers/SettingsContainer';
import HelpContainer from '../containers/HelpContainer';

const routes = (
    <Switch>
      <ProtectedRoute path="/prescription" component={PrescriptionContainer} /> /*TODO : Create container for this component*/
      <ProtectedRoute path="/treatment" component={TreatmentContainer} />
      <ProtectedRoute path="/dashboard" component={DashboardContentContainer} />
      <ProtectedRoute path="/medicine" component={MedicineContainer} />
      <ProtectedRoute path="/root" component={RootContainer} />
      <ProtectedRoute path="/patients" component={Patients} />
      {/* <ProtectedRoute path="/patient" component={Patient} /> */}
      <ProtectedRoute path="/settings" component={SettingsContainer} />
      <ProtectedRoute path="/help" component={HelpContainer} />
      <Route path="/" exact component={LoginContainer} />
      <Route path="/forgetPassword" exact component={ForgetPassword} />
    </Switch>
);

export default routes;
