import {constants} from './constants';
import type {Store} from "../../store/reducers/types";
import {services} from "./services";

export const defaultPrinter = defaultPrinter => ({
  type: constants.SETTINGS_DEFAULT_PRINTERS,
  payload: defaultPrinter,
});

export const defaultTemplate = defaultTemplate => ({
  type: constants.SETTINGS_DEFAULT_TEMPLATE,
  payload: defaultTemplate,
});
export const changeTemplateSettings = settings => ({
  type: constants.SETTINGS_CHANGE,
  payload: settings,
});

export const backgroundPrint = bgprint => ({
  type: constants.SETTINGS_DEFAULT_PRINTER_BACKGROUND_PRINT,
  payload: bgprint,
});

export const defaultDocument = document  => ({
  type: constants.SETTINGS_DEFAULT_DOCUMENT,
  payload: document
});

export function saveSettings(data) {
  return (dispatch , getState: Store) => {
    const { securityState } = getState();
    const { access_token } = securityState.user;

    dispatch(request());
    services.saveSettings(data, access_token)
      .then(
        (settings) => {
          dispatch(success(data));
        },
        (error: any) => {
          dispatch(failure(error));
        }
      );
  };

  function request() { return { type: constants.SETTINGS_SAVE_REQUEST} }
  function success(settings: Object ){
    return {
      type: constants.SETTINGS_SAVE_SUCCESS, settings
    }
  }
  function failure(error) {
    return {
      type: constants.SETTINGS_SAVE_FAILURE , error
    }
  }
}

export function updateTemplateSettings(data) {
  return (dispatch , getState: Store) => {
    const { securityState } = getState();
    const { access_token } = securityState.user;

    dispatch(request());
    services.updateTemplateSettings(data, access_token)
      .then(
        (settings) => {
          console.log(settings);
          dispatch(success(data));
        },
        (error: any) => {
          dispatch(failure(error));
        }
      );
  };

  function request() { return { type: constants.SETTINGS_UPDATE_REQUEST} }
  function success(settings: Object ){
    return {
      type: constants.SETTINGS_UPDATE_SUCCESS, settings
    }
  }
  function failure(error) {
    return {
      type: constants.SETTINGS_UPDATE_FAILURE , error
    }
  }
}

export function fetchSettings() {
  return (dispatch , getState: Store) => {
    const { securityState } = getState();
    const { access_token } = securityState.user;

    dispatch(request());
    services.fetchSettings()
      .then(
        (settings) => {
          console.log("settings : ", settings);
          const {dataValues} = settings;
          console.log(dataValues);
          dispatch(success(dataValues));
        },
        (error: any) => {
          dispatch(failure(error));
        }
      );
  };

  function request() { return { type: constants.SETTINGS_FETCH_REQUEST} }
  function success(dataValues){
    return {
      type: constants.SETTINGS_FETCH_SUCCESS, payload: dataValues
    }
  }
  function failure(error) {
    return {
      type: constants.SETTINGS_FETCH_FAILURE , error
    }
  }
}
