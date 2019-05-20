/**
 * @flow
 */

import {constants} from "./constants";

let initialState = {
  patientName:'',
  patientAge:'',
  patientSex:'',
  patientMobile:'',
  patientEmail:'',
  patientPatientId:'',
  cc: [],
  oe: [],
  diagnosis: [],
  tests: [],
  medicine: [],
  strength: [],
  type: [],
  frequency: [],
  remark: [],
  advice: '',
  followupdate: '',
  saveSuccess: false,
  updateSuccess: false,
  updating: false
};

export default function prescriptionState(state: any = initialState, action){
  switch (action.type) {
    case constants.SET_PATIENT_NAME:
      return {
        ...state,
        patientName: action.payload
      };
    case constants.SET_PATIENT_AGE:
      return {
        ...state,
        patientAge: action.payload
      };
    case constants.SET_PATIENT_SEX:
      return {
        ...state,
        patientSex: action.payload
      };
    case constants.SET_PATIENT_MOBILE:
      return {
        ...state,
        patientMobile: action.payload
      };
    case constants.SET_PATIENT_EMAIL:
      return {
        ...state,
        patientEmail: action.payload
      };
    case constants.SET_PATIENT_PATIENTID:
      return {
        ...state,
        patientPatientId: action.payload
      };
    case constants.SET_PATIENT_OE:
      return {
        ...state,
        oe: [...state.oe, action.payload]
      };
    case constants.UPDATE_PATIENT_OE:
      return {
        ...state,
        oe: action.payload
      };
    case constants.DELETE_ITEM_PATIENT_OE:
      return {
        ...state,
        oe: [
          ...state.oe.slice(0, action.payload),
          ...state.oe.slice(action.payload + 1)
        ]
      };
    case constants.SET_PATIENT_TESTS:
      return {
        ...state,
        tests: [...state.tests, action.payload]
      };
    case constants.UPDATE_PATIENT_TESTS:
      return {
        ...state,
        tests: action.payload
      };
    case constants.DELETE_ITEM_PATIENT_TESTS:
      return {
        ...state,
        tests: [
          ...state.tests.slice(0, action.payload),
          ...state.tests.slice(action.payload + 1)
        ]
      };
    case constants.SET_PATIENT_CC:
      return {
        ...state,
        cc: [...state.cc, action.payload]
      };
    case constants.UPDATE_PATIENT_CC:
      return {
        ...state,
        cc: action.payload
      };
    case constants.DELETE_ITEM_PATIENT_CC:
      return {
        ...state,
        cc: [
          ...state.cc.slice(0, action.payload),
          ...state.cc.slice(action.payload + 1)
        ]
      };
    case constants.SET_PATIENT_DIAGNOSIS:
      return {
        ...state,
        diagnosis: [...state.diagnosis, action.payload]
      };
    case constants.UPDATE_PATIENT_DIAGNOSIS:
      return {
        ...state,
        diagnosis: action.payload
      };
    case constants.DELETE_ITEM_PATIENT_DIAGNOSIS:
      return {
        ...state,
        diagnosis: [
          ...state.diagnosis.slice(0, action.payload),
          ...state.diagnosis.slice(action.payload + 1)
        ]
      };
    case constants.SET_PATIENT_MEDICINE:
      return {
        ...state,
        medicine: [...state.medicine, action.medicine],
        strength: [...state.strength, action.strength],
        type: [...state.type, action.medtype],
        frequency: [...state.frequency, action.frequency],
        remark: [...state.remark, action.remark]
      };
    case constants.UPDATE_PATIENT_MEDICINE_NAME:
      return {
        ...state,
        medicine: action.payload
      };
    case constants.UPDATE_PATIENT_MEDICINE_STRENGTH:
      return {
        ...state,
        strength: action.payload
      };
    case constants.UPDATE_PATIENT_MEDICINE_TYPE:
      return {
        ...state,
        type: action.payload
      };
    case constants.UPDATE_PATIENT_MEDICINE_FREQUENCY:
      return {
        ...state,
        frequency: action.payload
      };
    case constants.UPDATE_PATIENT_MEDICINE_REMARK:
      return {
        ...state,
        remark: action.payload
      };
    case constants.DELETE_PATIENT_MEDICINE:
      return {
        ...state,
        medicine: [
          ...state.medicine.slice(0, action.payload),
          ...state.medicine.slice(action.payload + 1)
        ],
        remark: [
          ...state.remark.slice(0, action.payload),
          ...state.remark.slice(action.payload + 1)
        ],
        strength: [
          ...state.strength.slice(0, action.payload),
          ...state.strength.slice(action.payload + 1)
        ],
        type: [
          ...state.type.slice(0, action.payload),
          ...state.type.slice(action.payload + 1)
        ],
        frequency: [
          ...state.frequency.slice(0, action.payload),
          ...state.frequency.slice(action.payload + 1)
        ]
      };
    case constants.SET_PATIENT_ADVICE:
      return {
        ...state,
        advice: action.payload
      };
    case constants.SET_PATIENT_FOLLOWUPDATE:
      return {
        ...state,
        followupdate: action.payload
      };
    default:
      return state;
  }
}
