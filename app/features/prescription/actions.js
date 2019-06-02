import {constants} from './constants';
import type {Store} from "../../store/reducers/types";
import {services} from "./services";

export const resetState = patientName => ({
  type: constants.RESET_STATE
});

export const setPatientName = patientName => ({
  type: constants.SET_PATIENT_NAME,
  payload: patientName
});
export const setPatientAge = age => ({
  type: constants.SET_PATIENT_AGE,
  payload: age
});
export const setPatientSex = sex => ({
  type: constants.SET_PATIENT_SEX,
  payload: sex
});
export const setPatientMobile = mobile => ({
  type: constants.SET_PATIENT_MOBILE,
  payload: mobile
});
export const setPatientEmail = email => ({
  type: constants.SET_PATIENT_EMAIL,
  payload: email
});
export const setPatientPatientId = patientid => ({
  type: constants.SET_PATIENT_PATIENTID,
  payload: patientid
});


export const setCC = cc => ({
  type: constants.SET_PATIENT_CC,
  payload: cc
});
export const updateCC = cc => ({
  type: constants.UPDATE_PATIENT_CC,
  payload: cc
});
export const deleteCC = id => ({
  type: constants.DELETE_ITEM_PATIENT_CC,
  payload: id
});

export const setDiagnosis = diagnosis => ({
  type: constants.SET_PATIENT_DIAGNOSIS,
  payload: diagnosis
});
export const updateDiagnosis = diagnosis => ({
  type: constants.UPDATE_PATIENT_DIAGNOSIS,
  payload: diagnosis
});
export const deleteDiagnosis = id => ({
  type: constants.DELETE_ITEM_PATIENT_DIAGNOSIS,
  payload: id
});
export const setOE = oe => ({
  type: constants.SET_PATIENT_OE,
  payload: oe
});
export const updateOE = oe => ({
  type: constants.UPDATE_PATIENT_OE,
  payload: oe
});
export const deleteOE = id => ({
  type: constants.DELETE_ITEM_PATIENT_OE,
  payload: id
});

export const setTests = tests => ({
  type: constants.SET_PATIENT_TESTS,
  payload: tests
});
export const updateTest = tests => ({
  type: constants.UPDATE_PATIENT_TESTS,
  payload: tests
});
export const deleteTest = id => ({
  type: constants.DELETE_ITEM_PATIENT_TESTS,
  payload: id
});
export const setAdvice = advice => ({
  type: constants.SET_PATIENT_ADVICE,
  payload: advice
});
export const setMedicine = medicineObj => ({
  type: constants.SET_PATIENT_MEDICINE,
  medicine: medicineObj.medicine,
  medtype : medicineObj.type,
  strength: medicineObj.strength,
  remark: medicineObj.remark,
  frequency: medicineObj.frequency
});
export const updateMedicineName = medName => ({
  type: constants.UPDATE_PATIENT_MEDICINE_NAME,
  payload: medName
});
export const updateMedicineType = type => ({
  type: constants.UPDATE_PATIENT_MEDICINE_TYPE,
  payload: type
});
export const updateMedicineStrength = strength => ({
  type: constants.UPDATE_PATIENT_MEDICINE_STRENGTH,
  payload: strength
});
export const updateMedicineRemark = remark => ({
  type: constants.UPDATE_PATIENT_MEDICINE_REMARK,
  payload: remark
});
export const updateMedicineFequency = frequency => ({
  type: constants.UPDATE_PATIENT_MEDICINE_FREQUENCY,
  payload: frequency
});

export const deleteMedicine = id => ({
  type: constants.DELETE_PATIENT_MEDICINE,
  payload: id
});
