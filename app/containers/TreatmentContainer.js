// @flow

import React, {Component} from 'react';
import { connect } from 'react-redux';
import Treatment from '../components/Treatment';
import {fetchTreatment , saveTreatment, updateTreatmentMedicine, deleteTreatment, deleteMedicineFromTreatment, updateMedicineFromTreatment} from "../features/treatment";
import {saveMedicine} from "../features/medicine";


const mapStateToProps = state => ({
  medicineState: state.medicineState,
  securityState: state.securityState,
  treatmentState: state.treatmentState
});

const mapDispatchToProps = {
  fetchTreatment , saveTreatment , saveMedicine , updateTreatmentMedicine, deleteTreatment,
  deleteMedicineFromTreatment, updateMedicineFromTreatment
};

class TreatmentContainer extends Component {
  constructor(props) {
    super(props);

    // if the accessToken is valid, redirect to homepage
    //const { accessTokenIsValid, navigateToAlias } = this.props;
  }

  render() {
    const {
     medicineState, securityState , treatmentState, saveTreatment,
      fetchTreatment , saveMedicine , updateTreatmentMedicine, deleteMedicineFromTreatment,
      deleteTreatment, updateMedicineFromTreatment
    } = this.props;
    console.log("Treatment Container");
    console.log(this.props);
    return (
      <Treatment
        medicineState={medicineState}
        securityState={securityState}
        treatmentState={treatmentState}

        saveTreatment={saveTreatment}
        fetchTreatment={fetchTreatment}
        saveMedicine={saveMedicine}
        updateTreatmentMedicine={updateTreatmentMedicine}
        deleteMedicineFromTreatment={deleteMedicineFromTreatment}
        deleteTreatment={deleteTreatment}
        updateMedicineFromTreatment={updateMedicineFromTreatment}
      />
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TreatmentContainer);
