/**
 * @flow
 */

import {constants} from "./constants";

let initialState = {
  defaultPrinter:'',
  backgroundPrint: true,
  defaultTemplate: true,
  dr_education:'',
  dr_specialist:'',
  education_institute:'',
  reg_no:'',
  center_text:'',
  chamber_name:'',
  chamber_address:'',
  chamber_timing:'',
  margin_top:'',
  margin_bottom:'',
  margin_left:'',
  margin_right:'',
  document: ''
};

export default function settingsState(state: any = initialState, action){
  switch (action.type) {
    case constants.SETTINGS_DEFAULT_PRINTERS:
      return {
        ...state,
        defaultPrinter: action.payload
      };
    case constants.SETTINGS_DEFAULT_TEMPLATE:
      return {
        ...state,
        defaultTemplate: action.payload
      };
    case constants.SETTINGS_CHANGE:
      return {
        ...state,
        [action.payload.id]: action.payload.value
      };
    case constants.SETTINGS_DEFAULT_DOCUMENT:
      return {
        ...state,
        document: action.payload
      };
    case constants.SETTINGS_DEFAULT_PRINTER_BACKGROUND_PRINT:
      return {
        ...state,
        backgroundPrint: action.payload
      };
    case constants.SETTINGS_SAVE_SUCCESS:
      return {
        ...state,
        defaultPrinter: action.settings.defaultPrinter,
        backgroundPrint: action.settings.backgroundPrint
      };
    case constants.SETTINGS_FETCH_SUCCESS:
      return {
        ...state,
        defaultPrinter: action.payload.default_printer,
        backgroundPrint: action.payload.background_print === "1",
        defaultTemplate: action.payload.printTemplate === "1",
        dr_education:action.payload.dr_education,
        dr_specialist:action.payload.dr_specialist,
        education_institute:action.payload.education_institute,
        reg_no:action.payload.reg_no,
        center_text:action.payload.center_text,
        chamber_name:action.payload.chamber_name,
        chamber_address:action.payload.chamber_address,
        chamber_timing:action.payload.chamber_timing,
        margin_top:action.payload.margin_top,
        margin_bottom:action.payload.margin_bottom,
        margin_left:action.payload.margin_left,
        margin_right:action.payload.margin_right
      };
    default:
      return state;
  }
}
