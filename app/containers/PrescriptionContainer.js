// @flow

import React, {Component} from 'react';
import { connect } from 'react-redux';
import PrescriptionWritting from '../components/PrescriptionWritting';
import {setAdvice , setPatientAge, setCC, setMedicine , setOE , setPatientEmail,
  setPatientMobile, setPatientName , setPatientPatientId , setPatientSex , setTests ,
  deleteCC, updateCC , deleteOE , updateOE , updateTest, deleteTest, updateMedicineFequency, updateMedicineName,
  updateMedicineRemark, updateMedicineStrength, updateMedicineType, deleteMedicine, deleteDiagnosis, setDiagnosis,
  updateDiagnosis} from "../features/prescription";


const mapStateToProps = state => ({
  medicineState: state.medicineState,
  securityState: state.securityState,
  treatmentState: state.treatmentState,
  prescriptionState : state.prescriptionState,
  settingsState: state.settingsState
});

const mapDispatchToProps = {
  setAdvice , setPatientAge, setCC, setMedicine , setOE , setPatientEmail,
  setPatientMobile, setPatientName , setPatientPatientId , setPatientSex , setTests ,
  deleteCC, updateCC , deleteOE , updateOE , updateTest, deleteTest, updateMedicineFequency, updateMedicineName,
  updateMedicineRemark, updateMedicineStrength, updateMedicineType, deleteMedicine, deleteDiagnosis, setDiagnosis,
  updateDiagnosis
};

class PrescriptionContainer extends Component {
  constructor(props) {
    super(props);

    // if the accessToken is valid, redirect to homepage
    //const { accessTokenIsValid, navigateToAlias } = this.props;
  }

  render() {
    const {
      securityState , medicineState , treatmentState , prescriptionState ,
      setAdvice , setPatientAge, setCC, setMedicine , setOE , setPatientEmail,
      setPatientMobile, setPatientName , setPatientPatientId , setPatientSex , setTests ,
      deleteCC, updateCC , deleteOE , updateOE , updateTest, deleteTest, updateMedicineFequency, updateMedicineName,
      updateMedicineRemark, updateMedicineStrength, updateMedicineType, deleteMedicine, deleteDiagnosis, setDiagnosis,
      updateDiagnosis, settingsState
    } = this.props;
    return (
      <PrescriptionWritting
        securityState={securityState}
        treatmentState={treatmentState}
        medicineState={medicineState}
        prescriptionState={prescriptionState}
        settingsState={settingsState}

        setDiagnosis={setDiagnosis}
        updateDiagnosis={updateDiagnosis}
        deleteDiagnosis={deleteDiagnosis}
        setCC={setCC}
        updateCC={updateCC}
        deleteCC={deleteCC}
        setOE={setOE}
        deleteOE={deleteOE}
        updateOE={updateOE}
        setTests={setTests}
        deleteTest={deleteTest}
        updateTest={updateTest}
        setAdvice={setAdvice}

        setMedicine={setMedicine}
        deleteMedicine={deleteMedicine}
        updateMedicineName={updateMedicineName}
        updateMedicineFequency={updateMedicineFequency}
        updateMedicineRemark={updateMedicineRemark}
        updateMedicineStrength={updateMedicineStrength}
        updateMedicineType={updateMedicineType}

        setPatientAge={setPatientAge}
        setPatientEmail={setPatientEmail}
        setPatientMobile={setPatientMobile}
        setPatientName={setPatientName}
        setPatientPatientId={setPatientPatientId}
        setPatientSex={setPatientSex}

      />
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(PrescriptionContainer);
