import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Check from "@material-ui/icons/Check";
import Edit from "@material-ui/icons/Create";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import UpdateMedicine from './../updateMedicine';
import { FormControl } from '@material-ui/core';



function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'genric', numeric: false, disablePadding: false, label: 'Generic' },
  { id: 'strength', numeric: false, disablePadding: false, label: 'Strength' },
  { id: 'indication', numeric: false, disablePadding: false, label: 'Indication' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
          <TableCell padding="delete">
            
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    width: 800
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

// let EnhancedTableToolbar = props => {
//   const { numSelected, classes , name } = props;
//   let treatmentId = props.treatmentDetails;
  
//   return (
//     <Toolbar
//       className={classNames(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       <div className={classes.title}>      
//         <Typography variant="h6" id="tableTitle">
//           Medicines under {name} Treatment
//           {/* name -> input ,  */}
//         </Typography>
//         <Tooltip title="Edit Treatment Name">
//           <IconButton style={{marginLeft:'95%',marginTop:'-45px'}} onClick={()=>this.handleEditTreatmentName(treatmentId)}>
//             <Edit/>
//           </IconButton>
//         </Tooltip>
//       </div>
//       <div className={classes.spacer} />
//       <div className={classes.actions}>

//       </div>
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
// };

// EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  TableCell:{
    '&:hover': {
      background:'#f0f0f0',
      cursor:'pointer',
    }
  },
  medtextField:{
    width:'80%',
    margin:'0px',
    padding:'0px',
    marginLeft:'-30px'
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
  title: {
    flex: '0 0 auto',
    padding:'2%'
  },
  addMedReqTextFields: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,

},
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    NewMedicine:'',
    NewMedType:'',
    NewMedStrength:'',
    MOnChange: false,
    MedFiltered:[],
    MedData:this.props.medList,
    MedFlag:false,
    medDetails:'',
    UpdateDialog:false,
    deleteDialog:false,
    editDialog:false,
    editableTreatment:'',
    editedTreatmentName:'',
    deletableMed:''
  };

  componentDidMount(){
    this.setState({
      data: this.props.medicine
    })
  }
  componentDidUpdate(prevProps){
    if (this.props.medicine !== prevProps.medicine) {
      this.setState({
        data: this.props.medicine
      })
    }
  }
  
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  // Update = (event, id, obj) => {
  //   this.setState({
  //     medDetails:obj
  //   })
  //   console.log(obj)
  //   const { selected } = this.state;
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   this.setState({ selected: newSelected });
  // };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  addMed=(item)=>{
    //console.log(item);
    this.setState({
      NewMedicine:`${item.product_name}`,
      NewMedType:`${item.types}`,
      NewMedStrength:`${item.strength}`,
      MedFlag:true
    });
  };
  addAll=()=>{
    // Have to call an api for saving it to database

  }
  MedicineSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({MOnChange:true,MedFlag:false})
    if( keyword == ""){
      this.setState({MOnChange:false})
    }
    this.setState({ NewMedicine: event.target.value });
    let filtered = this.state.MedData.filter((item)=>{
      return item.product_name.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
    });
    this.setState({
      MedFiltered:filtered,
      MOnChange:true
    })
  };
  handleClickEditTreatment=(treatment)=>{
    this.setState({
      editDialog:true,
      editableTreatment:treatment,
      editedTreatmentName:treatment.name
    })
  }
  handleCloseEditTreatment=()=>{
    this.setState({
      editDialog:false,
    })
  }
  handleEditTreatmentName=()=>{
    console.log(this.state.editedTreatmentName);
    this.setState({
      editDialog:false,
    })
  }
  handleEditTreatmentChangeKeyword=(event)=>{
    this.setState({
      editedTreatmentName: event.target.value
    })
  }
  handleDelete=(med)=>{
    this.setState({
      deleteDialog:true,
      deletableMed:med
    })
  }
  handleCloseDelete=()=>{
    this.setState({
      deleteDialog:false
    }) 
  }
  handleShowUpdateDialog=(obj)=>{
    this.setState({
      UpdateDialog:true,
      medDetails:obj
    })
  }
  handleClose = () => {
    this.setState({ UpdateDialog: false });
  };
  render() {
    const { classes , name} = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    console.log("Inside Treatment Medicine view ");
    console.log(this.state);
    const Med = this.state.MOnChange?this.state.MedFiltered.map((item)=>{
      return(
        <li key={item.id} onClick={()=>this.addMed(item)} className={classes.searchKeyword}>
          {item.product_name} <span><i> {item.types} </i></span> {item.strength}
        </li>
      )
    }):null;
    let treatmentDetails = this.props.treatmentDetails;
    let treatmentName = this.props.treatmentDetails.name;
    return (
      <Paper className={classes.root}>
        {/* <EnhancedTableToolbar numSelected={selected.length} name={name} /> */}
        <div className={classes.title}>      
          <Typography variant="h6" id="tableTitle">
            Medicines under {name} Treatment
            {/* name -> input ,  */}
          </Typography>
          <Tooltip title="Edit Treatment Name">
            <IconButton style={{marginLeft:'55%',marginTop:'-45px'}} onClick={()=>this.handleClickEditTreatment(treatmentDetails)}>
              <Edit/>
            </IconButton>
          </Tooltip>
        </div>
        <div style={{marginLeft:'1.4%'}}>
            <Grid container>
                <Grid item xs={1}>
                  <Fab color="secondary" size="small" disabled style={{marginTop:'10px'}}>
                    <AddIcon />
                  </Fab>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id=""
                    label="Add New Medicine"
                    value={this.state.NewMedicine}
                    onChange={this.MedicineSearchKeywords}
                    margin="normal"
                    style={{fontSize:'14px',width:'85%',margin:'0px', padding:'0px',marginLeft:'-30px'}}
                  />
                  {!this.state.NewMedicine=="" && !this.state.MedFlag?
                  <div style={{marginLeft:'-65px',maxHeight:'200px', width:'100%', position:'relative', overflow:'auto',padding:'0px',marginTop:'0px'}}>
                    <ul style={{marginTop:'-1px'}}>
                      {!this.state.NewMedicine=="" && !this.state.MedFlag?Med:null}
                    </ul>
                  </div>:null
                  }
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="strength"
                    label="Strength"
                    className={classes.medtextField}
                    value={this.state.NewMedStrength}
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
                    value={this.state.NewMedType}
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
                <Grid item xs={2}>
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
                    onClick={this.addAll}
                    disabled={!this.state.TempMedValue}
                    style={{marginTop:'-40px',marginLeft:'70%'}}
                  >
                    <Check style={{color:'#7f7f7f'}}/>
                  </IconButton>
                </Grid>
              </Grid>
        </div>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      className={classes.TableCell}
                      
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.medicine_id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none" onClick={event => this.handleShowUpdateDialog(n)}>{n.product_name}</TableCell>
                      <TableCell align="right" onClick={event => this.handleShowUpdateDialog(n)}>{n.type}</TableCell>
                      <TableCell align="right" onClick={event => this.handleShowUpdateDialog(n)}>{n.generic}</TableCell>
                      <TableCell align="right" onClick={event => this.handleShowUpdateDialog(n)}>{n.strength}</TableCell>
                      <TableCell align="right" onClick={event => this.handleShowUpdateDialog(n)}>{n.indication}</TableCell>
                      <TableCell padding="delete">
                        <Tooltip title="Delete">
                          <IconButton onClick={()=>this.handleDelete(n)}>
                              <DeleteIcon/>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <Dialog
            open={this.state.UpdateDialog}
            onClose={this.handleClose}
          >
          <UpdateMedicine name={"Treatment Medicine"} obj={this.state.medDetails}/>
          <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Ok
              </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={this.state.deleteDialog}
            onClose={this.handleCloseDelete}
          >
          <DialogTitle>Are you Sure you want to delete?</DialogTitle>
            <DialogContent>
              
                <Typography>{this.state.deletableMed.product_name}</Typography>
              
            </DialogContent>
          <DialogActions>
              <Button onClick={this.handleCloseDelete} color="secondary" variant="contained"> 
                Delete
              </Button>
              <Button onClick={this.handleCloseDelete} color="primary">
                Cancel
              </Button>
              
            </DialogActions>
        </Dialog>
        <Dialog
            open={this.state.editDialog}
            onClose={this.handleCloseEditTreatment}
          >
          <DialogTitle>Update Treatment Name:</DialogTitle>
            <DialogContent>
              
              <TextField
                id=""
                label="Treatment Name"
                className={classes.addMedReqTextFields}
                value={this.state.editedTreatmentName}
                onChange={this.handleEditTreatmentChangeKeyword.bind(this)}
                margin="normal"
              />
              
              
              
            </DialogContent>
          <DialogActions>
              <Button onClick={this.handleEditTreatmentName} color="secondary" variant="contained"> 
                Update
              </Button>
              <Button onClick={this.handleCloseEditTreatment} color="primary">
                Cancel
              </Button>
              
            </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
