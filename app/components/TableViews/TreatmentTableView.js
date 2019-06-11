import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from "@material-ui/core/TableHead/TableHead";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TreatmentMedicineView from './TreatmentMedicineView';
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Cancel from '@material-ui/icons/Delete';
let update = require('immutability-helper');
//import Done  from '@material-ui/icons/DoneAll';
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '96%',
    marginTop: theme.spacing.unit * 12,
    marginLeft:'2%'
  },
  table: {
    minWidth: 500,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  medicineListSearch: {
    padding: 10,
  },
  TableCell:{
    '&:hover': {
      background:'#f0f0f0',
      cursor:'pointer',
    }
  },
  addMedicineBtn:{
    position: 'relative',
    zIndex:'100',
    float: 'right',
    marginRight:'1%',
    marginTop:'1%'
  },
  medtextField:{
    width:'80%',
    margin:'0px',
    padding:'0px',
  },
  searchKeyword:{

    cursor:'pointer',
    borderBottom:'1px solid #D1D2D7',
    '&:hover': {
      color: '#59B0F6',
    },
    marginLeft:'-5px',
    padding:'5px 0px',
    width:'100%',
    overflowY:'auto',
    overflowX:'hidden'
  },
});

class TreatmentTableView extends React.Component {
  constructor(props) {
    super(props);
    console.log('In TreatmentTableView');
    console.log(props);
    this.state = {
      rows: [],
      page: 0,
      rowsPerPage: 5,
      searchOn:false,
      filtered:[],
      openMedicineDetail: false,
      //medicine:[],
      treatmentDetails: '',
      MedicineList: this.props.medicineState.medicineList,
      openAddTreatment:false,

      treatmentName:'',
      treatmentDescription:'',
      //TempMedValue:'',
      MedOnchange:false,
      MedData: [],
      MedFiltered:[],
      MedList:[],
      MedFlag:false,

      TempMedValue:'',
      NewMedType:'',
      NewMedStrength:'',


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

      openSnackbar:false,
      SnackbarMessage:'',
      Medicines:[],
      Treatment:[]
    };
  }

  handleClickOpen = () => {
    this.setState({ openMedicineDetail: true });
  };
  handleClickOpenAddTreatment=()=>{
    this.setState({openAddTreatment:true});
  };
  handleCloseAddTreatment = () => {
    this.setState({ openAddTreatment: false });
  };
  handleCloseTreatmentDialogue = () => {
    this.setState({ openMedicineDetail: false });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  SearchMedicine = event =>{
    let keyword = event.target.value;
    this.setState({
      searchOn:true
    });
    if (this.state.rows.length !== 0){
      let filtered = this.state.rows.filter((item)=>{
        return item.name.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
      });
      this.setState({
        filtered:filtered,
        searching:true
      })
    }

  };

  handleChange(index,treatment)
  {
    console.log(treatment);

    const {treatment_medicine_list , name , treatment_id} = treatment;
    this.setState({
      openMedicineDetail: true,
      medicine: treatment_medicine_list,
      treatmentDetails: treatment
    });
  }
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
      //this.props.setMedicine(medObj);
    }
    else{
      let msg = "Already Exists!";
      this.handleSnackbar(msg);
    }
    //console.log(this.state);
  };
  handleSnackbar=(msg)=>{
    this.setState({
      openSnackbar:true,
      SnackbarMessage:msg
    })
  };
  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false });
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
    //this.props.updateMedicineName(newData);
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
    //this.props.updateMedicineStrength(newData);
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
    //this.props.updateMedicineType(newData);
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
    //this.props.updateMedicineFequency(newData);
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
    //this.props.updateMedicineRemark(newData);
  };
  handleTreatmentName =(event)=>{
    let keyword = event.target.value;
    this.setState({ treatmentName: event.target.value });
  }

  handleTreatmentDescription =(event)=>{
    let keyword = event.target.value;
    this.setState({ treatmentDescription: event.target.value });
  }
  MedicineSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({MOnChange:true,MedFlag:false})
    if( keyword == ""){
      this.setState({MOnChange:false})
    }
    this.setState({ TempMedValue: event.target.value });
    let filtered = this.state.MedData.filter((item)=>{
      return item.product_name.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
    });
    this.setState({
      MedFiltered:filtered,
      MOnChange:true
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
  handleSaveTreatment=()=>{
    console.log("Save Treatment request");
    let Treatmentdescription = this.state.treatmentDescription;
    let NameTreatment = this.state.treatmentName;
    let medicineList =[];

    let size = this.state.MedList.length;

    if (size === 0) {
      let msg = "Add atleast one medicine and click on the + Button";
      this.handleSnackbar(msg);
    }else{
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
        let medicines = {
          "product_name": MedName,
          "types": TypeName,
          "generic": "",
          "strength": strengthName,
          "indication": "",
          "frequency": FrequencyName,
          "remark": RemarkName
        };
        medicineList.push(medicines);
      }
      const treatmentBody = {
        name: NameTreatment,
        description: Treatmentdescription,
        treatment_medicine_list: medicineList
      };

      this.props.saveTreatment(treatmentBody);

      this.setState({
        MedList: [],
        treatmentDescription: '',
        treatmentName:''
      });
    }
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
    //this.props.deleteMedicine(i);
  };

  componentWillMount(){
    this.setState({
      MedData: this.props.medicineState.medicineList,
      rows: this.props.treatmentState.treatment,
    });
  }

  componentDidUpdate(prevProps){
    if (this.props.treatmentState.treatment !== prevProps.treatmentState.treatment) {
      this.setState({
        rows: this.props.treatmentState.treatment
      })
    }
  }
  render() {
    console.log("Inside Treatment Table View");
    console.log(this.props);
    console.log(this.state);
    const { classes , saveMedicine, updateTreatmentMedicine, deleteTreatment, deleteMedicineFromTreatment, updateMedicineFromTreatment} = this.props;
    const { rows, rowsPerPage, page , medicine , treatmentDetails, MedicineList} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const Med = this.state.MOnChange?this.state.MedFiltered.map((item)=>{
      return(
        <li key={item.id} onClick={()=>this.addMed(item)} className={classes.searchKeyword}>
          {item.product_name} <span><i> {item.types} </i></span> {item.strength}
        </li>
      )
    }):null;

    let medTable = null;

    if (rows.length !==0 ){
      medTable = !this.state.searchOn?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map( (treatment, index) => {
        return(
          <TableRow className={classes.TableCell} key={index} onClick={() => {
            this.handleChange(index , treatment);
          }}>
            <TableCell  component="th" scope="row">{treatment.name}</TableCell>
            <TableCell  component="th" scope="row">{treatment.description}</TableCell>
          </TableRow>
        )
      }):this.state.filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((treatment, index) => {
        return(
          <TableRow className={classes.TableCell} key={index} onClick={() => {
            this.handleChange(index , treatment);
          }}>
            <TableCell component="th" scope="row">{treatment.name}</TableCell>
            <TableCell component="th" scope="row">{treatment.description}</TableCell>
          </TableRow>
        )
      });
    }
    return (
      <Paper className={classes.root}>
        <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.openSnackbar}
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
          <Dialog
            fullWidth = {true}
            maxWidth = "xl"
            open={this.state.openMedicineDetail}
            onClose={this.handleCloseTreatmentDialogue}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogContent>
              <TreatmentMedicineView
                medicine={medicine}
                medList={MedicineList}
                treatmentDetails={treatmentDetails}
                saveMedicine={saveMedicine}
                deleteTreatment={deleteTreatment}
                updateTreatmentMedicine={updateTreatmentMedicine}
                deleteMedicineFromTreatment={deleteMedicineFromTreatment}
                onDeleteTreatment={this.handleCloseTreatmentDialogue}
                updateMedicineFromTreatment={updateMedicineFromTreatment}

              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseTreatmentDialogue} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleCloseTreatmentDialogue} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
          {/* Add treatment Dialog */}
          <Dialog
            fullWidth = {true}
            maxWidth = "md"
            open={this.state.openAddTreatment}
            onClose={this.handleCloseAddTreatment}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogContent>
            <div>
            <Grid container>
                <Grid item xs={4}>
                  <TextField
                    id=""
                    label="Add New Treatment"
                    value={this.state.treatmentName}
                    onChange={this.handleTreatmentName}
                    margin="normal"
                    style={{fontSize:'14px',width:'85%',margin:'0px', padding:'0px'}}
                  />

                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id=""
                    label="Description..."
                    value={this.state.treatmentDescription}
                    onChange={this.handleTreatmentDescription}
                    margin="normal"
                    style={{fontSize:'14px',width:'85%',margin:'0px', padding:'0px'}}
                  />
                </Grid>
              </Grid>
              </div>
              <div className={classes.medicineListElem}>
                {this.state.MedList != null ?
                  this.state.MedList.map((itemx,index) => (
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
                          value={this.state.StrenList[index].name}
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
                          value={this.state.TypeList[index].name}
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
                          value={this.state.FreqList[index].name}
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
                          value={this.state.RemList[index].name}
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
              <div>
              <Grid container>
                {/* <Grid item xs={1}>
                  <Fab color="secondary" size="small" disabled style={{marginTop:'10px'}}>

                  </Fab>
                </Grid> */}
                <Grid item xs={3}>
                  <TextField
                    id=""
                    label="Add New Medicine"
                    value={this.state.TempMedValue}
                    onChange={this.MedicineSearchKeywords}
                    margin="normal"
                    style={{fontSize:'14px',width:'85%',margin:'0px', padding:'0px'}}
                  />
                  {!this.state.TempMedValue=="" && !this.state.MedFlag?
                  <div style={{marginLeft:'-35px',maxHeight:'200px', width:'100%', position:'relative', overflow:'auto',padding:'0px',marginTop:'0px'}}>
                    <ul style={{marginTop:'-1px'}}>
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
                  <Tooltip title="Add Medicine">
                    <IconButton
                      onClick={this.addAllMedicine}
                      //disabled={!this.state.TempMedValue}
                      style={{marginTop:'-40px',marginLeft:'80%'}}
                    >
                      <AddIcon style={{color:'#7f7f7f'}}/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSaveTreatment} color="primary">
                Save Treatment
              </Button>
              <Button onClick={this.handleCloseAddTreatment} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className={classes.medicineListSearch}>
          <InputBase className={classes.input} placeholder="Search Treatment" onChange={this.SearchMedicine} />
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>

          <div className={classes.addMedicineBtn}>
              <Tooltip title="Add" aria-label="Add">
                <Fab color="secondary" size="small" onClick={this.handleClickOpenAddTreatment}>
                  <AddIcon />
                </Fab>
              </Tooltip>
          </div>
        </div>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow >
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medTable}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={2}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

TreatmentTableView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreatmentTableView);
