// @flow

import React, {Component} from 'react';
import { connect } from 'react-redux';
import Settings from '../components/Settings';
import {fetchTreatment , saveTreatment} from "../features/treatment";
import {saveSettings, defaultDocument, updateTemplateSettings, changeTemplateSettings , defaultTemplate} from "../features/settings";

const mapStateToProps = state => ({
  securityState: state.securityState,
  systemEnvState: state.systemEnvState,
  settingsState: state.settingsState,
  usermanagementState: state.usermanagementState
});

const mapDispatchToProps = {
  fetchTreatment , saveTreatment, saveSettings , defaultDocument, updateTemplateSettings, changeTemplateSettings , defaultTemplate
};

class SettingsContainer extends Component {
  constructor(props) {
    super(props);

    // if the accessToken is valid, redirect to homepage
    //const { accessTokenIsValid, navigateToAlias } = this.props;
  }

  render() {
    const {
       securityState , systemEnvState, settingsState, saveSettings, defaultDocument,updateTemplateSettings, changeTemplateSettings, usermanagementState , defaultTemplate
    } = this.props;
    console.log("Settings Container");
    console.log(this.props);
    return (
      <Settings
        securityState={securityState}
        systemEnvState={systemEnvState}
        settingsState={settingsState}
        usermanagementState={usermanagementState}

        saveSettings={saveSettings}
        defaultDocument={defaultDocument}
        updateTemplateSettings={updateTemplateSettings}
        changeTemplateSettings={changeTemplateSettings}
        defaultTemplate={defaultTemplate}
      />
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SettingsContainer);
