import React from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';

import Cancel from '@material-ui/icons/Delete';
import Check from "@material-ui/icons/Add";
import Info from "@material-ui/icons/info";
import CCData from '../fakedata/cc_fake.json';
import TestsData from '../fakedata/Tests_fake.json';
import DiagnosisData from '../fakedata/diagnosis_fake.json';
import TreatmentData from '../fakedata/Treatment_fake.json';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Assignment from '@material-ui/icons/Assignment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Done  from '@material-ui/icons/DoneAll';
import InputAdornment from '@material-ui/core/InputAdornment';

let update = require('immutability-helper');
const ipcRenderer = require("electron").ipcRenderer;

const styles = theme => ({
  root:{
    padding: '1%',
    backgroundColor: '#f0f1f6',
    paddingTop: '70px',
    height:'100%',
  },
    rootContainer:{
      height:'100%'
    },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
  textField2: {
    marginRight:'4%',
    width: '45%',
  },
  cctextField:{
    width:'180px',
    margin:'0px',
    overflow: 'auto',
    marginTop:'10px'
  },
  cctextFieldInput:{
    overflowY:'hidden',
    '&:hover': {
      overflowY:'auto'
    }
  },
  medtextField:{
    width:'80%',
    margin:'0px',
    padding:'0px'
  },
  adviceTextField:{
    width:'95%',
    margin:'0px',
    padding:'0px'
  },
  card: {
    width: '100%',
  },
  customCard:{
    width:'100%',
    marginTop:'20px',
    padding:'0px'
  },
  leftGrid:{
    //padding:'0% 1%',
    paddingTop:'0px',
    borderRight:'1px solid #D1D2D7',
    display:'table'
  },
 centerGrid:{
    //padding:'0% 1%',
    paddingTop:'0px',
    borderRight:'1px solid #D1D2D7',
    height:'100%'
  },
  rightGrid:{
    height:'100%'
  },
  iconBtn:{
    color:'#D9DADF',
  },
  searchKeyword:{
    cursor:'pointer',
    borderBottom:'1px solid #D1D2D7',
    '&:hover': {
      color: '#59B0F6',
    },
    marginLeft:'-5px',
    padding:'5px 0px',
    width:'90%'
  },
  suggestionAdd:{
    background:'#f2f2f2',
    marginTop:'-10px',
    padding:'10px',
    cursor:'pointer',
    '&:hover': {
      background: '#f9f9f9',
    },

  },
  leftPaneElm:{
    margin:'0px',
    marginTop:'15px',
    padding:'0px',
    height:'auto' ,

  },
  listElem:{
    height:'20%' ,
    maxHeight:'150px',
    position:'relative',
    overflowY:'hidden',
    overflowX:'hidden',
    '&:hover': {
      overflowY:'auto'
    },
  },
  medicineListElem:{
    height:'auto' ,
    maxHeight:'400px',
    position:'relative',
    overflowY:'auto',
    overflowX:'hidden'
  },
  listElmContent:{
    margin:'0px',
    padding:'0px',
    marginTop:'-10px'
  },
  centerPaneContent:{
    height:'100%'
  },
  centerPaneContentHeader:{
    height:'70%'

  },
  centerPaneContentFooter:{
    height:'30%'
  },
  footer:{
    flexShrink: 0
}
});


class PrescriptionWrittng extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ccFakeData: CCData,
      ccFiltered:[],
      list:[],
      value:'',
      ccOnChange: false,
      ccFinalList:[],

      TestsFakeData: TestsData,
      TestsFiltered:[],
      Testsvalue:'',
      Testslist:[],
      TestsOnChange: false,

      DiagnosisFakeData: DiagnosisData,
      DiagnosisFiltered:[],
      Diagnosisvalue:'',
      Diagnosislist:[],
      DiagnosisOnChange: false,

      OEvalue:'',
      OElist:[],

      AdviceValue:'',

      TempMedValue:'',
      MedOnchange:false,
      MedData: [],
      MedFiltered:[],
      MedList:[],
      MedFlag:false,

      TempStrenValue:'',
      StrenList:[],
      //StrenOnchange:false,
      TempTypValue:'',
      TypeList:[],
      //TypOnchange:false,
      TempFreqValue:'',
      FreqList:[],
      //FreqOnchange:false,
      TempRemValue:'',
      RemList:[],
      //RemOnchange:false,

      SuggestionsData: TreatmentData,
      SuggestionOn:false,
      SuggestionsFiltered:[],

      expanded: {},
      openSnackbarCC: false,
      SnackbarMessage:'',
      PatientName: '',
      Age: '',
      Sex: '',
      Mobile: '',
      Email: '',
      PatientId: '',

      Medicines:[] // For All medicines
    };
  }
  printPrescription = () =>{
    console.log("Print Prescription request");
    console.log("Save Medicine");

    let size = this.state.MedList.length;

    for(let i=0;i<size;i++){

      let MedName = this.state.MedList[i].name;
      let TypeName = this.state.TypeList[i].name;
      let strengthName = this.state.StrenList[i].name;
      let FrequencyName = this.state.FreqList[i].name;
      let RemarkName = this.state.RemList[i].name;
      let Idval = `${this.state.Medicines.length + 1}`;

      //Checking if there is any duplicate for safety, if Save button is double pressed.
      let fl = 1;
      let loopMed = this.state.Medicines.map((j)=>{
        if(j.product_name.toUpperCase() === MedName.toUpperCase() && j.strength.toUpperCase() === strengthName.toUpperCase()){
          fl = 0;
        }
      });

      if(fl==1){
        this.setState((prevState) => ({
          Medicines: [...prevState.Medicines, {id: Idval, product_name:MedName, type:TypeName, strength: strengthName, frequency: FrequencyName, remark: RemarkName}]
        }));
      }
    }

    const {firstname , lastname} = this.props.usermanagementState.profile;
    const username = firstname +` ` +lastname;

    let medList = this.state.Medicines;
    const { dr_education, dr_specialist, education_institute, reg_no,
      center_text, chamber_name, chamber_address, chamber_timing, margin_top,
      margin_bottom, margin_left, margin_right, defaultTemplate, printLines} = this.props.settingsState;

    const templateData = {
      preview: false,
      header_center_img : 'data:image/gif;base64,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',
      header_left_img:'',
      header_right_img:'',
      content_main_right_rx_img: 'data:image/png;base64,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',
      header_center_text: {
        text1:center_text
      },
      header_left_text: {
        dr_name: username,
        dr_education: dr_education,
        dr_specialist: dr_specialist,
        education_institute: education_institute,
        dr_reg: reg_no
      },
      header_right_text:{
        chamber_name : chamber_name,
        chamber_address: chamber_address,
        chamber_timing: chamber_timing
      },
      header_footer_text:'',
      defaultTemplate: defaultTemplate,
      margins:{
        top: margin_top,
        bottom: margin_bottom,
        left: margin_left,
        right: margin_right
      },
      userTemplateSettings:{
        patientDetail: true,
        leftSideBar: true,
        printLines: printLines
      },
      patient:{
        name: `Name: ${this.state.PatientName}`,
        sex: `Sex: ${this.state.Sex}`,
        age: `Age: ${this.state.Age}Yrs`,
        id: 'PID: 123456789',
        date: `Date: ${new Date()}`
      },
      cc: this.props.prescriptionState.cc,
      oe: this.props.prescriptionState.oe,
      tests: this.props.prescriptionState.tests,
      treatment: this.props.prescriptionState.diagnosis,
      medicines: medList,
      advice: this.props.prescriptionState.advice
    };

    const printerObj={
      content: templateData,
      options: {
        silent: this.props.settingsState.backgroundPrint, //Don't ask user for print settings. Default is false.
        printBackground: true, //Also prints the background color and image of the web page. Default is false.
        deviceName: this.props.settingsState.defaultPrinter
      }
    };
    console.log(printerObj);

    ipcRenderer.send("printPDF", printerObj);

  };
  clearPrescription = () =>{
    console.log("Clear Prescription request");
  };
  componentDidMount(){
    console.log(this.props.prescriptionState.cc);
    const {cc } = this.props.prescriptionState;
    console.log(cc);
    let medicineData = this.props.medicineState.medicineList;
    console.log(medicineData);
    this.setState({
      list : cc,
      MedData:medicineData
    });
  }
  handlePatientDetailChange=(event)=>{
    let value = event.target.value;
    let id = event.target.id;
    switch (id) {
      case 'PatientName': this.props.setPatientName(value);  break;
      case 'Age': this.props.setPatientAge(value);  break;
      case 'Sex': this.props.setPatientSex(value);  break;
      case 'Mobile': this.props.setPatientMobile(value);  break;
      case 'Email': this.props.setPatientEmail(value);  break;
      case 'PatientId': this.props.setPatientPatientId(value);  break;
      default : break;
    }
    this.setState({ [id]: value });
  };
  handleAdviceChange = (event)=>{
    let value = event.target.value;
    this.setState({AdviceValue:value});
    this.props.setAdvice(value);
  };

  handleSnackbar=(msg)=>{
    this.setState({
      openSnackbarCC:true,
      SnackbarMessage:msg
    })
  };
  handleCloseSnackbar = () => {
    this.setState({ openSnackbarCC: false });
  };

  handleExpandClick = (val) => {
    console.log(val);
    this.setState({
      expanded: {...this.state.expanded,
        [val]: !this.state.expanded[val]},
      //expanded[val]: !state.expanded[val]
    });
    console.log(this.state.expanded[0]);
  };
  handleSelectionClick = (val,value) => {
    console.log(val);
    let Index1 = this.state.SuggestionsData.findIndex(function(c) {
      return c.treatment_id === value;
    });
    let Index2 = this.state.SuggestionsData[Index1].treatment_medicine_list.findIndex(function(x){
      return x.medicine_id === val;
    })
    let bool = !this.state.SuggestionsData[Index1].treatment_medicine_list[Index2].checked;

    let updatedCheck = update(this.state.SuggestionsData[Index1].treatment_medicine_list[Index2], {checked: {$set: bool}});
    //console.log(updatedCheck);
    let data = this.state.SuggestionsData;
    let newData = update(data[Index1], {treatment_medicine_list: {[Index2]: {$set: updatedCheck}}});

    let uData = update(data,{$splice:[[Index1,1,newData]]});

    this.setState({SuggestionsData:uData});

  };


  onRemoveCC = i => {
    //console.log(i);
    //console.log((this.state.list.length - i)-1);
    let x = (this.state.list.length - i)-1;//Since the list is printed in Descending order
    const listtest = this.state.list.filter((item, j) => x !== j);
    console.log(listtest);
    this.setState(state => {
      const list = state.list.filter((item, j) => x !== j);
      return {
        list,
      };
    });
    this.props.deleteCC(i);
  };
  onRemoveOE = i => {
    let x = (this.state.OElist.length - i)-1;
    this.setState(state => {
      const OElist = state.OElist.filter((item, j) => x !== j);
      return {
        OElist,
      };
    });
    this.props.deleteOE(i);
  };
  onRemoveTests = i => {
    let x = (this.state.Testslist.length - i)-1;
    console.log(x);
    this.setState(state => {
      const Testslist = state.Testslist.filter((item, j) => x !== j);
      return {
        Testslist,
      };
    });
    this.props.deleteTest(i);
  };
  onRemoveDiagnosis = i => {
    let x = (this.state.Diagnosislist.length - i)-1;
    console.log(x);
    this.setState(state => {
      const Diagnosislist = state.Diagnosislist.filter((item, j) => x !== j);
      return {
        Diagnosislist,
      };
    });
    this.props.deleteDiagnosis(i);
  };


  removeAllMedicine = i =>{
    let x =  i;
    console.log(x);
    this.setState(state => {
      const MedList = state.MedList.filter((item, j) => x !== j);
      const StrenList = state.StrenList.filter((item, j) => x !== j);
      const TypeList = state.TypeList.filter((item, j) => x !== j);
      const FreqList = state.FreqList.filter((item, j) => x !== j);
      const RemList = state.RemList.filter((item, j) => x !== j);
      return {
        MedList,
        StrenList,
        TypeList,
        FreqList,
        RemList,
      };
    });
    this.props.deleteMedicine(i);
  };

  addCustomClinicalComplain = () => {
    let customItemValue = this.state.value;
    let latestId = `${this.state.ccFakeData.length + 1}`;
    let fl = 1;
    let loopCC = this.state.list.map((j)=>{
      if(j.name.toUpperCase() === customItemValue.toUpperCase()){
        fl = 0;
      }
    });
    if(fl===1){
      this.setState((prevState) => ({
        list: [...prevState.list, {name:customItemValue, id: latestId }],
        ccFakeData : [...prevState.ccFakeData, {name:customItemValue, id: latestId }],
        value:''
      }));
      const newClinicalCompain = { name : customItemValue, id : latestId};
      this.props.setCC(newClinicalCompain);
    }else{
      let msg = "This C/C Already Exists!";
      this.handleSnackbar(msg);
    }
  };

  addCC=(item)=>{
    let itemName = item.name;
    let fl = 1;
    let loopCC = this.state.list.map((j)=>{
      if(j.name.toUpperCase() === itemName.toUpperCase()){
        fl = 0;
      }
    });
    if(fl===1){
      this.setState((prevState) => ({
        list: [...prevState.list, {name:item.name, id:item.id}],
        value:''
      }));

      const newClinicalCompain = { name : item.name, id : item.id};
      this.props.setCC(newClinicalCompain);
    }else{
      let msg = "This C/C Already Exists!";
      this.handleSnackbar(msg);
    }
  };
  addCustomOE=()=>{
    let customItemValue = this.state.OEvalue;
    let fl = 1;
    let loopOE = this.state.OElist.map((j)=>{
      if(j.name.toUpperCase() === customItemValue.toUpperCase()){
        fl = 0;
      }
    });
    if(fl===1){
      let latestId = `${this.state.OElist.length + 1}`;
      const newOE = { name : customItemValue, id : latestId};
      this.setState((prevState) => ({
        OElist: [...prevState.OElist, {name:customItemValue, id: latestId }],
        //ccFakeData : [...prevState.ccFakeData, {name:customItemValue, id: latestId }],
        OEvalue:''
      }));
      this.props.setOE(newOE);
    }
    else{
      let msg = "This O/E Already Exists!";
      this.handleSnackbar(msg);
    }
  };
  addCustomTests=()=>{
    let customItemValue = this.state.Testsvalue;
    let fl = 1;
    let loopTests = this.state.Testslist.map((j)=>{
      if(j.name.toUpperCase() === customItemValue.toUpperCase()){
        fl = 0;
      }
    });
    if(fl===1){
      let latestId = `${this.state.Testslist.length + 1}`;
      const newTest = { name : customItemValue, id : latestId};

      this.setState((prevState) => ({
        Testslist: [...prevState.Testslist, {name:customItemValue, id: latestId }],
        TestsFakeData : [...prevState.TestsFakeData, {name:customItemValue, id: latestId }],
        Testsvalue:''
      }));
      this.props.setTests(newTest);
    }else{
      let msg = "This Test Already Exists!";
      this.handleSnackbar(msg);
    }
  };
  addTests=(item)=>{
    let itemName = item.name;
    let fl = 1;
    let loopTests = this.state.Testslist.map((j)=>{
      if(j.name.toUpperCase() === itemName.toUpperCase()){
        fl = 0;
      }
    });
    if(fl===1){
      this.setState((prevState) => ({
        Testslist: [...prevState.Testslist, {name:item.name, id:item.id}],
        Testsvalue:''
      }));

      const newTest = { name : item.name, id : item.id};
      this.props.setTests(newTest);
    }
    else{
      let msg = "This Test Already Exists!";
      this.handleSnackbar(msg);
    }
  };
  addCustomDiagnosis=()=>{
    let customItemValue = this.state.Diagnosisvalue;
    let fl = 1;
    let loopDiag = this.state.Diagnosislist.map((j)=>{
      if(j.name.toUpperCase() === customItemValue.toUpperCase()){
        fl = 0;
      }
    });
    if(fl===1){
      let latestId = `${this.state.Diagnosislist.length + 1}`;
      const newDiagnosis={name: customItemValue , id: latestId};
      this.setState((prevState) => ({
        Diagnosislist: [...prevState.Diagnosislist, {name:customItemValue, id: latestId }],
        DiagnosisFakeData : [...prevState.DiagnosisFakeData, {name:customItemValue, id: latestId }],
        Diagnosisvalue:''
      }));
      this.props.setDiagnosis(newDiagnosis);
      this.handleAddSuggestion(customItemValue);
    }else{
      let msg = "This Diagnosis Already Exists!";
      this.handleSnackbar(msg);
    }
  };
  addDiagnosis=(item)=>{
    let itemName = item.name;
    let fl = 1;
    let loopDiagnosis = this.state.Diagnosislist.map((j)=>{
      if(j.name.toUpperCase() === itemName.toUpperCase()){
        fl = 0;
      }
    });
    if(fl===1){
      this.setState((prevState) => ({
        Diagnosislist: [...prevState.Diagnosislist, {name:item.name, id:item.id}],
        Diagnosisvalue:''
      }));
      const newDiagnosis = { name : item.name, id : item.id};
      this.props.setDiagnosis(newDiagnosis);
      this.handleAddSuggestion(1);
    }
    else{
      let msg = "This Diagnosis Already Exists!";
      this.handleSnackbar(msg);
    }
  };
  addMed=(item)=>{
    //console.log(item);
    this.setState({
      TempMedValue:`${item.product_name}`,
      TempStrenValue:`${item.strength}`,
      TempTypValue:`${item.types}`,
      MedFlag:true
    });
    //console.log(this.state.TempMedValue);
  };
  addAllMedicine=()=>{
    let MedVal = this.state.TempMedValue;
    let StrenVal = this.state.TempStrenValue;
    if(StrenVal == '')StrenVal = "N/A";

    let TypVal = this.state.TempTypValue;
    if(TypVal == '')TypVal = "N/A";

    let RemVal = this.state.TempRemValue;
    if(RemVal == '')RemVal = "N/A";

    let FreqVal = this.state.TempFreqValue;
    if(FreqVal == '')FreqVal = "N/A";

    let fl = 1;
    let loopMed = this.state.MedList.map((j)=>{
      if(j.name.toUpperCase() == MedVal.toUpperCase()){
        fl = 0;
      }
    })

    let loopStren = this.state.StrenList.map((k)=>{
      if(k.name.toUpperCase() == MedVal.toUpperCase()){
        fl = 0;
      }
    })
    if(fl == 1){
      let latestId = `${this.state.MedList.length + 1}`;

      const medicine= {name: MedVal , id:latestId};
      const type= {name: TypVal , id:latestId};
      const frequency= {name: FreqVal , id:latestId};
      const remark= {name: RemVal , id:latestId};
      const strength= {name: StrenVal , id:latestId};


      this.setState((prevState) => ({
        MedList: [...prevState.MedList, {name: MedVal , id:latestId }],
        StrenList: [...prevState.StrenList, {name: StrenVal , id:latestId}],
        TypeList: [...prevState.TypeList, {name: TypVal , id:latestId }],
        FreqList: [...prevState.FreqList, {name: FreqVal , id:latestId }],
        RemList: [...prevState.RemList, {name: RemVal , id:latestId}],
        //TestsFakeData : [...prevState.TestsFakeData, {name:customItemValue, id: latestId }],
        TempMedValue:'',
        TempFreqValue:'',
        TempRemValue:'',
        TempStrenValue:'',
        TempTypValue:'',

      }));
      const medObj = {
        medicine : medicine,
        type: type,
        frequency: frequency,
        strength: strength,
        remark: remark
      };
      this.props.setMedicine(medObj);
    }
    else{
      let msg = "Already Exists!";
      this.handleSnackbar(msg);
    }
    //console.log(this.state);
  };
  onUpdateCC = (val) => {
    let target = val.target;
    let value = target.value;
    let id = target.id;
    let data = this.state.list;
    //get index of the object using ID
    let commentIndex = data.findIndex(function(c) {
      return c.id === target.id;
    });
    //update this object with new values
    let updatedComment = update(data[commentIndex], {name: {$set: value} , id:{$set: id}});

    let newData = update(data, {
      $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({list: newData});
    console.log("Update CC " , newData);
    this.props.updateCC(newData);
  };
  onUpdateOE = (val) => {
    let target = val.target;
    let value = target.value;
    let id = target.id;
    let data = this.state.OElist;
    //get index of the object using ID
    let commentIndex = data.findIndex(function(c) {
      return c.id === target.id;
    });
    //update this object with new values
    let updatedComment = update(data[commentIndex], {name: {$set: value} , id:{$set: id}});

    let newData = update(data, {
      $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({OElist: newData});
    this.props.updateOE(newData);
  };
  onUpdateTests = (val) => {
    let target = val.target;
    let value = target.value;
    let id = target.id;
    let data = this.state.Testslist;
    //get index of the object using ID
    let commentIndex = data.findIndex(function(c) {
      return c.id === target.id;
    });
    //update this object with new values
    let updatedComment = update(data[commentIndex], {name: {$set: value} , id:{$set: id}});

    let newData = update(data, {
      $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({Testslist: newData});
    this.props.updateTest(newData);
  };
  onUpdateDiagnosis = (val) => {
    let target = val.target;
    let value = target.value;
    let id = target.id;
    let data = this.state.Diagnosislist;
    //get index of the object using ID
    let commentIndex = data.findIndex(function(c) {
      return c.id === target.id;
    });
    //update this object with new values
    let updatedComment = update(data[commentIndex], {name: {$set: value} , id:{$set: id}});

    let newData = update(data, {
      $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({Diagnosislist: newData});
    this.props.updateDiagnosis(newData);
  };
  onUpdateMed = (val) => {
    let target = val.target;
    let value = target.value;
    let id = target.id;
    let data = this.state.MedList;
    //get index of the object using ID
    let commentIndex = data.findIndex(function(c) {
      return c.id === target.id;
    });
    //update this object with new values
    let updatedComment = update(data[commentIndex], {name: {$set: value} , id:{$set: id}});

    let newData = update(data, {
      $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({MedList: newData});
    this.props.updateMedicineName(newData);
  };
  onUpdateStren = (val) => {
    let target = val.target;
    let value = target.value;
    let id = target.id;
    let data = this.state.StrenList;
    //get index of the object using ID
    let commentIndex = data.findIndex(function(c) {
      return c.id === target.id;
    });
    //update this object with new values
    let updatedComment = update(data[commentIndex], {name: {$set: value} , id:{$set: id}});

    let newData = update(data, {
      $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({StrenList: newData});
    this.props.updateMedicineStrength(newData);
  };
  onUpdateType = (val) => {
    let target = val.target;
    let value = target.value;
    let id = target.id;
    let data = this.state.TypeList;
    //get index of the object using ID
    let commentIndex = data.findIndex(function(c) {
      return c.id === target.id;
    });
    //update this object with new values
    let updatedComment = update(data[commentIndex], {name: {$set: value} , id:{$set: id}});

    let newData = update(data, {
      $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({TypeList: newData});
    this.props.updateMedicineType(newData);
  };
  onUpdateFreq = (val) => {
    let target = val.target;
    let value = target.value;
    let id = target.id;
    let data = this.state.FreqList;
    //get index of the object using ID
    let commentIndex = data.findIndex(function(c) {
      return c.id === target.id;
    });
    //update this object with new values
    let updatedComment = update(data[commentIndex], {name: {$set: value} , id:{$set: id}});

    let newData = update(data, {
      $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({FreqList: newData});
    this.props.updateMedicineFequency(newData);
  };
  onUpdateRem = (val) => {
    let target = val.target;
    let value = target.value;
    let id = target.id;
    let data = this.state.RemList;
    //get index of the object using ID
    let commentIndex = data.findIndex(function(c) {
      return c.id === target.id;
    });
    //update this object with new values
    let updatedComment = update(data[commentIndex], {name: {$set: value} , id:{$set: id}});

    let newData = update(data, {
      $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({RemList: newData});
    this.props.updateMedicineRemark(newData);
  };
  CCsearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({ccOnChange:true})
    if( keyword == ""){
      this.setState({ccOnChange:false})
    }
    this.setState({ value: event.target.value });
    let filtered = this.state.ccFakeData.filter((item)=>{
      return item.name.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
    });
    this.setState({
      ccFiltered:filtered,
      ccOnChange:true
    })
  };
  OEsearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({OEvalue:keyword});
  };
  TestsSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({TestsOnChange:true})
    if( keyword == ""){
      this.setState({TestsOnChange:false})
    }
    this.setState({ Testsvalue: event.target.value });
    let filtered = this.state.TestsFakeData.filter((item)=>{
      return item.name.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
    });
    this.setState({
      TestsFiltered:filtered,
      TestsOnChange:true
    })
  };
  DiagnosisSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({DiagnosisOnChange:true})
    if( keyword == ""){
      this.setState({DiagnosisOnChange:false})
    }
    this.setState({ Diagnosisvalue: event.target.value });
    let filtered = this.state.DiagnosisFakeData.filter((item)=>{
      return item.name.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
    });
    this.setState({
      DiagnosisFiltered:filtered,
      DiagnosisOnChange:true
    })
  };

  OEsearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({OEvalue:keyword});
  };
  MedSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({MedOnchange:true, MedFlag:false})
    if( keyword == ""){
      this.setState({MedOnchange:false})
    }
    this.setState({ TempMedValue: event.target.value });
    let filtered = this.state.MedData.filter((item)=>{
      return item.product_name.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
    });
    this.setState({
      MedFiltered:filtered,
      MedOnchange:true
    })
  };
  StrenSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({TempStrenValue:keyword});
  };
  TypeSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({TempTypValue:keyword});
  };
  FreqSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({TempFreqValue:keyword});
  };
  RemarkSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({TempRemValue:keyword});
  };
  handleAddSuggestion = (value)=>{
    this.state.SuggestionOn = true;
    console.log("Suggestion added ", value)
  };
  handleAddSuggestion2 = (val) =>{
    console.log(val);
    console.log(this.state.SuggestionsData);
    let filter = this.state.SuggestionsData.map((item)=>{

      if(item.treatment_id == val){
        let med = item.treatment_medicine_list.map((i)=>{
          if(i.checked === true){
            console.log(i.product_name);
            let MedVal = i.product_name;
            let StrenVal = i.strength;
            if(StrenVal == '')StrenVal = "N/A";

            let TypVal = i.type;
            if(TypVal == '')TypVal = "N/A";

            let RemVal = i.indication;
            if(RemVal == '')RemVal = "N/A";

            let FreqVal = i.frequency;
            if(FreqVal == '')FreqVal = "N/A";
            let fl = 1;
            let loopMed = this.state.MedList.map((j)=>{
              if(j.name.toUpperCase() === MedVal.toUpperCase()){
                fl = 0;
              }
            });

            let loopStren = this.state.StrenList.map((k)=>{
              if(k.name.toUpperCase() === MedVal.toUpperCase()){
                fl = 0;
              }
            });
            if(fl === 1){
              let latestId = `${this.state.MedList.length + 1}`;
              const medicine= {name: MedVal , id:latestId};
              const type= {name: TypVal , id:latestId};
              const frequency= {name: FreqVal , id:latestId};
              const remark= {name: RemVal , id:latestId};
              const strength= {name: StrenVal , id:latestId};

              this.setState((prevState) => ({
                MedList: [...prevState.MedList, {name:MedVal, id: latestId }],
                StrenList: [...prevState.StrenList, {name:StrenVal, id: latestId }],
                TypeList: [...prevState.TypeList, {name:TypVal, id: latestId }],
                FreqList: [...prevState.FreqList, {name:FreqVal, id: latestId }],
                RemList: [...prevState.RemList, {name:RemVal, id: latestId }],

                TempMedValue:'',
                TempFreqValue:'',
                TempRemValue:'',
                TempStrenValue:'',
                TempTypValue:'',

              }));
              const medObj = {
                medicine : medicine,
                type: type,
                frequency: frequency,
                strength: strength,
                remark: remark
              };
              this.props.setMedicine(medObj);
            }
            else{
              let msg = "Already exists in the prescription!";
              this.handleSnackbar(msg);
            }
          }
        });
      }
    })
  };
  handleSaveMedicine=()=>{


  }
  render(){
    console.log("Props " , this.props);
    console.log("State " , this.state);
    const followupDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
    console.log(followupDate);

    const {
      patientName, patientAge, patientSex, patientMobile, patientEmail, advice, followupdate,
      patientPatientId , cc , oe, diagnosis, tests, medicine , type, strength, remark, frequency} = this.props.prescriptionState;


    const { classes } = this.props;
    const CC = this.state.ccOnChange?this.state.ccFiltered.map((item)=>{
      return(
        <li key={item.id} onClick={()=>this.addCC(item)} className={classes.searchKeyword}>
          {item.name}
        </li>
      )
    }):null;
    const TESTS = this.state.TestsOnChange?this.state.TestsFiltered.map((item)=>{
      return(
        <li key={item.id} onClick={()=>this.addTests(item)} className={classes.searchKeyword}>
          {item.name}
        </li>
      )
    }):null;
    const Diagnosis = this.state.DiagnosisOnChange?this.state.DiagnosisFiltered.map((item)=>{
      return(
        <li key={item.id} onClick={()=>this.addDiagnosis(item)} className={classes.searchKeyword}>
          {item.name}
        </li>
      )
    }):null;
    const Med = this.state.MedOnchange?this.state.MedFiltered.map((item)=>{
      return(
        <li key={item.id} onClick={()=>this.addMed(item)} className={classes.searchKeyword}>
          {item.product_name} <i>{item.types}</i> {item.strength}
        </li>
      )
    }):null;
    const SuggestionShow = this.state.SuggestionOn?this.state.Diagnosislist.map((item)=>{
      let val = item.name;
      return(
        this.state.SuggestionsData.map((i)=>{
          if(val.toUpperCase() == i.name.toUpperCase()){
            console.log("hi");
            return(
              <Card className={classes.customCard} key={i.treatment_id}>
                <CardHeader
                  style={{
                    padding:'10px'
                  }}
                  avatar={
                    <Assignment style={{color:'blue'}}/>
                  }
                  action={
                    <CardActions className={classes.actions} disableActionSpacing>
                      <IconButton
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.expanded[i.treatment_id],
                        })}
                        onClick={()=>this.handleExpandClick(i.treatment_id)}
                        aria-expanded={this.state.expanded[i.treatment_id]}
                        aria-label="Show more"
                      >
                        <ExpandMoreIcon style={{color:'blue'}}/>
                      </IconButton>
                    </CardActions>
                  }
                  title= {
                    <h5 style={{marginLeft:'-10px'}}>Treatment for {`${val}`}</h5>
                  }
                />

                <Button style={{color:'blue'}} onClick={()=>this.handleAddSuggestion2(i.treatment_id)}>Add</Button>

                <Collapse  in={this.state.expanded[i.treatment_id]} timeout="auto" unmountOnExit>
                  <div style={{marginLeft:'-30px', padding:'5px'}}>
                    <ul style={{margin:'0px',}}>
                      {i.treatment_medicine_list.map((med)=>{
                        console.log(med.product_name);
                        return(
                          <li key={med.medicine_id} style={{marginBottom:"5px"}}>
                            {/*<h5>{`${med.product_name}`}</h5>*/}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={med.checked}
                                  onChange={()=>this.handleSelectionClick(med.medicine_id, i.treatment_id)}

                                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                                  //value="checkedI"
                                />
                              }
                              label={`${med.product_name}`}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </Collapse>
              </Card>
            )
          }
        })
      )
    }):null;
    return (
      <div className={classes.root}>
        <Card className={classes.rootContainer}>
          <Grid container style={{width:'100%',padding:'0%',borderBottom:'1px solid #D1D2D7'}}>
            <form className={classes.container} noValidate autoComplete="off">
              <Grid item xs={3}>
                <TextField
                  required={true}
                  id="PatientName"
                  label="Patient Name"
                  className={classes.textField}
                  value={patientName}
                  onChange={this.handlePatientDetailChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required={true}
                  id="Age"
                  label="Age"
                  className={classes.textField2}
                  value={patientAge}
                  onChange={this.handlePatientDetailChange}
                  margin="normal"
                />
                <TextField
                  id="Sex"
                  label="Sex"
                  className={classes.textField2}
                  value={patientSex}
                  onChange={this.handlePatientDetailChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="Mobile"
                  label="Mobile"
                  className={classes.textField}
                  value={patientMobile}
                  onChange={this.handlePatientDetailChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="Email"
                  label="Email"
                  className={classes.textField}
                  value={patientEmail}
                  onChange={this.handlePatientDetailChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="PatientId"
                  label="Id"
                  className={classes.textField}
                  value={patientPatientId}
                  onChange={this.handlePatientDetailChange}
                  margin="normal"
                />
              </Grid>
            </form>
          </Grid>
          <Grid container style={{ height:'100%'}} >
            <Grid item xs={2} className={classes.leftGrid} style={{ height:'100%',paddingRight:'0px'}}>

              {/*<Typography style={{marginTop:'5px', color:'#7f7f7f', fontWeight:'bold'}}>C/C</Typography>*/}
              <div className={classes.leftPaneElm}>
                <TextField
                  id="standard-name"
                  className={classes.cctextField}
                  value={this.state.value}
                  onChange={this.CCsearchKeywords}
                  margin="normal"
                  style={{fontSize:'14px'}}
                  InputProps={{
                    padding:'0% 1%',
                    startAdornment: <InputAdornment position="start">CC</InputAdornment>,
                    endAdornment:  <IconButton
                      onClick={this.addCustomClinicalComplain}
                      disabled={!this.state.value}
                    >
                      <Check style={{color:'#000', fontSize:'20px'}}/>
                    </IconButton>
                  }}
                />

                {!this.state.value==""?
                  <div style={{zIndex:'100',maxHeight:'200px', width:'150px',backgroundColor:'#f6f6f6', position:'absolute', overflow:'auto',padding:'0px',marginTop:'0px'}}>
                    <ul style={{marginLeft:'-35px',marginTop:'-1px'}}>
                      {!this.state.value==""?CC:null}
                    </ul>
                  </div>:null
                }
                <div className={classes.listElem}>
                  {cc != null ?
                  cc.slice(0).map((itemx,index) => (
                    <div key={index} className={classes.listElmContent}>
                      <TextField
                        id={itemx.id}
                        multiline
                        className={classes.cctextField}
                        name={`${index}`}
                        value={itemx.name}
                        onChange={this.onUpdateCC.bind(this)}
                        margin="normal"
                        style={{fontSize:'14px'}}
                        InputProps={{
                          className: classes.cctextFieldInput,
                          startAdornment: <InputAdornment position="start">
                            <Done />
                          </InputAdornment>,
                          endAdornment: <IconButton
                            onClick={() => this.onRemoveCC(index)}
                          >
                            <Cancel  style={{color:'#7f7f7f', fontSize:'18px'}}/>
                          </IconButton>
                        }}
                      />

                    </div>
                  )) : null} </div>
              </div>
              {/*<Typography style={{marginTop:'5px', color:'#7f7f7f', fontWeight:'bold'}}>O/E</Typography>*/}
              <div className={classes.leftPaneElm}>
                <TextField
                  id=""
                  multiline
                  className={classes.cctextField}
                  value={this.state.OEvalue}
                  onChange={this.OEsearchKeywords}
                  margin="normal"
                  style={{fontSize:'14px'}}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">O/E</InputAdornment>,
                    endAdornment:  <IconButton onClick={this.addCustomOE}
                      disabled={!this.state.OEvalue}>
                      <Check style={{color:'#000', fontSize:'20px'}}/>
                    </IconButton>
                  }}
                />
                <div className={classes.listElem}>
                  {oe != null ?
                  oe.slice(0).reverse().map((itemx,index) => (
                    <div key={index} className={classes.listElmContent}>
                      <TextField
                        id={itemx.id}
                        multiline
                        className={classes.cctextField}
                        name={`${index}`}
                        value={itemx.name}
                        onChange={this.onUpdateOE.bind(this)}
                        margin="normal"
                        style={{fontSize:'14px'}}
                        InputProps={{
                          className: classes.cctextFieldInput,
                          startAdornment: <InputAdornment position="start">
                            <Done />
                          </InputAdornment>,
                          endAdornment: <IconButton
                            onClick={() => this.onRemoveOE(index)}>
                            <Cancel  style={{color:'#7f7f7f', fontSize:'18px'}}/>
                          </IconButton>
                        }}
                      />

                    </div>
                  )) : null} </div>
              </div>
              {/*<Typography style={{marginTop:'5px', color:'#7f7f7f', fontWeight:'bold'}}>Diagnosis</Typography>*/}
              <div className={classes.leftPaneElm}>
                <TextField
                  id="Diagnosis"
                  className={classes.cctextField}
                  value={this.state.Diagnosisvalue}
                  onChange={this.DiagnosisSearchKeywords}
                  margin="normal"
                  style={{fontSize:'14px'}}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Diagnosis</InputAdornment>,
                    endAdornment:  <IconButton
                      onClick={this.addCustomDiagnosis}
                      disabled={!this.state.Diagnosisvalue}
                    >
                      <Check style={{color:'#000', fontSize:'20px'}}/>
                    </IconButton>
                  }}
                />

                {!this.state.Diagnosisvalue==""?
                  <div style={{zIndex:'100',maxHeight:'200px', width:'150px',backgroundColor:'#f6f6f6', position:'absolute', overflow:'auto',padding:'0px',marginTop:'0px'}}>
                    <ul style={{marginLeft:'-35px',marginTop:'-1px'}}>
                      {!this.state.Diagnosisvalue==""?Diagnosis:null}
                    </ul>
                  </div>:null
                }
                <div className={classes.listElem}>
                  {diagnosis != null ?
                  diagnosis.slice(0).reverse().map((itemx,index) => (
                    <div key={index} className={classes.listElmContent}>
                      <TextField
                        id={itemx.id}
                        multiline
                        className={classes.cctextField}
                        name={`${index}`}
                        value={itemx.name}
                        onChange={this.onUpdateDiagnosis.bind(this)}
                        margin="normal"
                        style={{fontSize:'14px'}}
                        InputProps={{
                          className: classes.cctextFieldInput,
                          startAdornment: <InputAdornment position="start"> <Done /></InputAdornment>,
                          endAdornment:  <IconButton onClick={() => this.onRemoveDiagnosis(index)}>
                            <Cancel  style={{color:'#7f7f7f', fontSize:'18px'}}/>
                          </IconButton>
                        }}
                      />

                    </div>
                  )) : null} </div>
              </div>
              
              {/*<Typography style={{marginTop:'5px', color:'#7f7f7f', fontWeight:'bold'}}>Tests</Typography>*/}
              <div className={classes.leftPaneElm}>

                <TextField
                  id="tests"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Tests</InputAdornment>,
                    endAdornment:  <IconButton onClick={this.addCustomTests}
                      disabled={!this.state.Testsvalue}>
                      <Check style={{color:'#000', fontSize:'20px'}}/>
                    </IconButton>
                  }}
                  className={classes.cctextField}
                  value={this.state.Testsvalue}
                  onChange={this.TestsSearchKeywords}
                  margin="normal"
                  style={{fontSize:'14px', overflow:'auto'}}
                />

                {!this.state.Testsvalue==""?
                  <div style={{zIndex:'100',maxHeight:'200px', width:'150px',backgroundColor:'#f6f6f6', position:'absolute', overflow:'auto',padding:'0px',marginTop:'0px'}}>
                    <ul style={{marginLeft:'-35px',marginTop:'-1px'}}>
                      {!this.state.Testsvalue==""?TESTS:null}
                    </ul>
                  </div>:null
                }
                <div className={classes.listElem}>
                {tests != null ?
                  tests.slice(0).reverse().map((itemx,index) => (

                    <div key={index} className={classes.listElmContent}>
                      <TextField
                        id={itemx.id}
                        multiline
                        InputProps={{
                          className: classes.cctextFieldInput,
                          startAdornment: <InputAdornment position="start">
                           <Done />
                          </InputAdornment>,
                          endAdornment: <IconButton
                            onClick={() => this.onRemoveTests(index)}>
                            <Cancel  style={{color:'#7f7f7f', fontSize:'18px'}}/>
                          </IconButton>
                        }}
                        className={classes.cctextField}
                        name={`${index}`}
                        value={itemx.name}
                        onChange={this.onUpdateTests.bind(this)}
                        margin="normal"
                        style={{fontSize:'14px'}}
                      />
                    </div>
                  )) : null}</div>


              </div>
              {/*<Typography style={{marginTop:'5px', color:'#7f7f7f', fontWeight:'bold'}}>Advice</Typography>*/}
              <div className={classes.leftPaneElm}>
                <TextField
                  id="advice"
                  label="Add Advice"
                  multiline
                  rowsMax="3"
                  value={advice}
                  onChange={this.handleAdviceChange}
                  className={classes.adviceTextField}
                  margin="normal"
                  style={{fontSize:'14px',marginTop:'-3px'}}
                />
              </div>
            </Grid>
            <Grid item xs={7} className={classes.centerGrid} >

              <Grid container>
                <Grid item xs={3}>
                  <TextField
                    id=""
                    label="Medicine Name"
                    className={classes.medtextField}
                    value={this.state.TempMedValue}
                    onChange={this.MedSearchKeywords}
                    margin="normal"
                    style={{fontSize:'14px'}}
                  />
                  {!this.state.TempMedValue=="" && !this.state.MedFlag?
                    <div style={{zIndex:'100',maxHeight:'200px', width:'150px',backgroundColor:'#f6f6f6', position:'absolute', overflow:'auto',padding:'0px',marginTop:'0px'}}>
                      <ul style={{marginLeft:'-35px',marginTop:'-1px'}}>
                        {!this.state.TempMedValue=="" && !this.state.MedFlag?Med:null}
                      </ul>
                    </div>:null
                  }
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="strength"
                    label="Strength"
                    className={classes.medtextField}
                    value={this.state.TempStrenValue}
                    onChange={this.StrenSearchKeywords}
                    margin="normal"
                    style={{fontSize:'14px'}}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="type"
                    label="Type"
                    className={classes.medtextField}
                    value={this.state.TempTypValue}
                    onChange={this.TypeSearchKeywords}
                    margin="normal"
                    style={{fontSize:'14px'}}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="frequency"
                    label="Frequency"
                    className={classes.medtextField}
                    value={this.state.TempFreqValue}
                    onChange={this.FreqSearchKeywords}
                    margin="normal"
                    style={{fontSize:'14px'}}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="remark"
                    label="Remark"
                    className={classes.medtextField}
                    value={this.state.TempRemValue}
                    onChange={this.RemarkSearchKeywords}
                    margin="normal"
                    style={{fontSize:'14px'}}
                  />
                  <IconButton
                    onClick={this.addAllMedicine}
                    disabled={!this.state.TempMedValue}
                    style={{marginTop:'-40px',marginLeft:'80%'}}
                  >
                    <Check style={{color:'#7f7f7f'}}/>
                  </IconButton>
                </Grid>
              </Grid>
              <div className={classes.centerPaneContentHeader}>
              <div className={classes.medicineListElem}>
                {medicine != null ?
                  medicine.map((itemx,index) => (
                    <Grid container key={index} style={{marginTop:'10px'}}>
                      <Grid item xs={3}>
                        <TextField
                          id={itemx.id}
                          name={`${index}`}
                          //label="Medicine Name"
                          className={classes.medtextField}
                          value={itemx.name}
                          onChange={this.onUpdateMed.bind(this)}
                          margin="normal"
                          style={{fontSize:'14px'}}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          id={itemx.id}
                          name={`${index}`}
                          //label="Strength"
                          className={classes.medtextField}
                          value={strength[index].name}
                          onChange={this.onUpdateStren.bind(this)}
                          margin="normal"
                          style={{fontSize:'14px'}}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          id={itemx.id}
                          name={`${index}`}
                          //label="Type"
                          className={classes.medtextField}
                          value={type[index].name}
                          onChange={this.onUpdateType.bind(this)}
                          margin="normal"
                          style={{fontSize:'14px'}}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          id={itemx.id}
                          name={`${index}`}
                          //label="Frequency"
                          className={classes.medtextField}
                          value={frequency[index].name}
                          onChange={this.onUpdateFreq.bind(this)}
                          margin="normal"
                          style={{fontSize:'14px'}}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          id={itemx.id}
                          name={`${index}`}
                          //label="Remark"
                          className={classes.medtextField}
                          value={remark[index].name}
                          onChange={this.onUpdateRem.bind(this)}
                          margin="normal"
                          style={{fontSize:'14px'}}
                        />
                        <IconButton
                          onClick={() => this.removeAllMedicine(index)}
                          //disabled={!this.state.TempMedValue}
                          style={{marginTop:'-40px',marginLeft:'80%'}}
                        >
                          <Cancel style={{color:'#7f7f7f'}}/>
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))
                  : null}
                  </div>
              </div>

              <footer className={classes.footer}>
                <TextField
                  id="date"
                  label="Follow Up Date"
                  type="date"
                  defaultValue= "2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button variant="outlined" color="primary" className={classes.button} onClick={() => this.clearPrescription()}>
                  Clear
                </Button>
                <Button variant="outlined" color="primary" className={classes.button} onClick={() => this.printPrescription()}>
                  Print
                </Button>
              </footer>

            </Grid>
            <Grid item xs={3} className={classes.rightGrid}>
              <Info style={{fontSize:'18px',color:'orange'}}/>
              <h5 style={{marginTop:'30px'}}>Suggestions</h5>
              {SuggestionShow}
            </Grid>
          </Grid>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackbarCC}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.SnackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
PrescriptionWrittng.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(PrescriptionWrittng));
