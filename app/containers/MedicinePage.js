// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddMedicine from '../components/AddMedicine';
import { addMedicineActions } from '../actions/AddMedicineFormActions';
import type {AddMedicineFormStateType} from "../types/state/AddMedicineFormStateType";

type State = {
  medicineForm: AddMedicineFormStateType
};

// Map the stuff we want from the global application state in redux to the props
function mapStateToProps(state: State) {
  return {
    medicineForm: state.medicineForm
  };
}

// Map any actions required to the props
function mapDispatchToProps(dispatch: any) {
  console.log('working');
  console.log(addMedicineActions);
  return bindActionCreators(
    {
      setForm: addMedicineActions.setForm,
      setName: addMedicineActions.setName,
      setStrength: addMedicineActions.setStrength,
      setFrequency: addMedicineActions.setFrequency,
      setRemark: addMedicineActions.setRemark,
      setSubmitted: addMedicineActions.setSubmitted
    },
    dispatch
  );
}

type Props = {};

export default connect(mapStateToProps,mapDispatchToProps)(AddMedicine);
