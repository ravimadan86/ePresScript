/**
 * @flow
 */

import {constants} from "./constants";
let initialState = {
  product_name:"",
  type:"",
  strength:"",
  generic:"",
  indication:"",
  medicineList:[],
  submitted: false,
  medicine:'',
  saveMedicineSuccess: false,
  updateMedicineSuccess: false
};

export default function medicineState(state: any = initialState, action){
  switch (action.type) {
    case constants.SET_PRODUCT_NAME:
      return {
        ...state,
        product_name: action.payload
      };
    case constants.SET_TYPE:
      return {
        ...state,
        type: action.payload
      };
    case constants.SET_STRENGTH:
      return {
        ...state,
        strength: action.payload
      };
    case constants.SET_GENRIC:
      return {
        ...state,
        generic: action.payload
      };
    case constants.SET_INDICATION:
      return {
        ...state,
        indication: action.payload
      };
      case constants.SET_SUBMITTED:
      return {
        ...state,
        submitted: action.submitted
      };
    case constants.SAVE_MEDICINE_REQUEST:
      return {
        ...state,
        product_name:"",
        type:"",
        strength:"",
        generic:"",
        indication:"",
        submitted: false,
        medicine:'',
        saveMedicineSuccess: false
      };
    case constants.SAVE_MEDICINE_SUCCESS:
      return {
        ...state,
        medicineList: action.medicine,
        saveMedicineSuccess: true
      };
    case constants.RESET_MEDICINE_STATE:
      return {
        ...state,
        product_name:"",
        type:"",
        strength:"",
        generic:"",
        indication:"",
        submitted: false,
        saveMedicineSuccess: false,
        deleteMedicineSuccess: false,
        updateMedicineSuccess: false
      };
    case constants.FETCH_MEDICINE_SUCCESS:
        return{
          ...state,
          medicineList: action.medicineList
        };
    case constants.UPDATE_MEDICINE_REQUEST:
      return{
        ...state,
        updateMedicineSuccess: false
      };
    case constants.UPDATE_MEDICINE_SUCCESS:
      return{
        ...state,
        medicineList: action.payload,
        updateMedicineSuccess: true
      };

    case constants.DELETE_MEDICINE_REQUEST:
      return{
        ...state,
        deleteMedicineSuccess: false
      };
    case constants.DELETE_MEDICINE_SUCCESS:
      return{
        ...state,
        medicineList: action.payload,
        deleteMedicineSuccess: true
      };
    default:
      return state;
  }
}
