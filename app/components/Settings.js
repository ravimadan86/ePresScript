import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Check from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
const ipcRenderer = require("electron").ipcRenderer;
import {IconSettingsPrinter , IconSettingsDocument} from '../assets';
import Switch from '@material-ui/core/Switch';
import PDFViewer from 'mgr-pdf-viewer-react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "auto",
    marginTop: theme.spacing.unit * 8,
  },
  printerList:{
    minWidth: 600,
    listStyle: 'none'
  },
  printerListElm: {
    display: 'inline-block',
    listStyleType: 'none',
    padding: '20px 10px 20px 10px',
    width: 'auto',
    height: '200px',
    position: 'relative',
    margin: 'inherit'
  },
  printerElm:{
    textAlign:'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    padding: '0 0'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
    width: '200px'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  settingsTemplateLayoutRoot:{
    marginTop:"8px",
    width: "auto",
    display: "flex",
  },
  settingsTemplateLayoutPreview:{
    width:"auto"
  },
  settingsTemplateLayoutOptions:{
    padding:'2%',
    marginTop:'-20px',
    width:"100%",
    display: "flex",
    flexDirection: "column"
  },
  LayoutOptionsContent:{
    width:"auto",
    margin:"0px",
    display:"flex"
  },
  layoutOptionsTextfield:{
    margin:"10px"
  }
});


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
function PrinterElements(props) {
  return (
    <div className={props.classes.printerElm}>
    <IconSettingsPrinter />
    <p>{props.printer.name}</p>
    </div>
  );
}


TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};



class Settings extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      printers: [],
      defaultPrinter: '',
      backgroundPrint: true,
      expanded: null,
      document: '',
      defaultTemplate: true,
      dr_name:'',
      dr_education:'',
      dr_specialist:'',
      education_institute:'',
      reg_no:'',
      center_text:'',
      chamber_name:'',
      chamber_address:'',
      chamber_timing:'',
      margin_top:0,
      margin_bottom:0,
      margin_left:0,
      margin_right:0,
      docUpdated: false,
      printLines: true,
      openPreview: false
    };
  }

  componentDidMount(){

    const {firstname , lastname} = this.props.usermanagementState.profile;
    const username = firstname +` ` +lastname;

    this.setState( {
      printers : this.props.systemEnvState.printers,
      defaultPrinter: this.props.settingsState.defaultPrinter,
      backgroundPrint: this.props.settingsState.backgroundPrint,
      document: this.props.settingsState.document,
      defaultTemplate: this.props.settingsState.defaultTemplate,
      dr_name: username,
      dr_education:this.props.settingsState.dr_education,
      dr_specialist:this.props.settingsState.dr_specialist,
      education_institute:this.props.settingsState.education_institute,
      reg_no:this.props.settingsState.reg_no,
      center_text:this.props.settingsState.center_text,
      chamber_name:this.props.settingsState.chamber_name,
      chamber_address:this.props.settingsState.chamber_address,
      chamber_timing:this.props.settingsState.chamber_timing,
      margin_top:this.props.settingsState.margin_top,
      margin_bottom:this.props.settingsState.margin_bottom,
      margin_left:this.props.settingsState.margin_left,
      margin_right:this.props.settingsState.margin_right,
      printLines: this.props.settingsState.printLines
    });

    const { dr_education, dr_specialist, education_institute, reg_no,
      center_text, chamber_name, chamber_address, chamber_timing, margin_top,
      margin_bottom, margin_left, margin_right, defaultTemplate, printLines} = this.props.settingsState;

    const templateData = {
      preview: true,
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
      }
    };
    ipcRenderer.send("updateTemplateRequest", templateData);
    this.props.defaultDocument(ipcRenderer.sendSync("generate-pdf"));
  }

  componentDidUpdate(prevProps){
    if (this.props.settingsState !== prevProps.settingsState) {
      const {firstname , lastname} = this.props.usermanagementState.profile;
      const username = firstname +` ` +lastname;
      this.setState({
        printers : this.props.systemEnvState.printers,
        defaultPrinter: this.props.settingsState.defaultPrinter,
        backgroundPrint: this.props.settingsState.backgroundPrint,
        document: this.props.settingsState.document,
        defaultTemplate: this.props.settingsState.defaultTemplate,
        dr_name: username,
        dr_education:this.props.settingsState.dr_education,
        dr_specialist:this.props.settingsState.dr_specialist,
        education_institute:this.props.settingsState.education_institute,
        reg_no:this.props.settingsState.reg_no,
        center_text:this.props.settingsState.center_text,
        chamber_name:this.props.settingsState.chamber_name,
        chamber_address:this.props.settingsState.chamber_address,
        chamber_timing:this.props.settingsState.chamber_timing,
        margin_top:this.props.settingsState.margin_top,
        margin_bottom:this.props.settingsState.margin_bottom,
        margin_left:this.props.settingsState.margin_left,
        margin_right:this.props.settingsState.margin_right,
        printLines: this.props.settingsState.printLines
      })
    }
  }

  handleSettingChange=(event)=>{
    console.log("handleSettingChange");
    let value = event.target.value;
    let id = event.target.id;
    this.setState({ [id]: value });
    const data = {
      id: id,
      value:value
    };
    this.props.changeTemplateSettings(data);
  };


  handlebackgroundPrintChange = name => event => {
    const settings ={
      backgroundPrint: event.target.checked,
      defaultPrinter: this.state.defaultPrinter
    };
    this.props.saveSettings(settings);
    //this.setState({ [name]: event.target.checked });
  };
  handleprintTemplateChange = name => event =>{
    this.setState({ defaultTemplate: event.target.checked});
    this.props.defaultTemplate(event.target.checked);
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };
  handleClose = (event, value) => {
    this.setState({ openPreview : false });
  };
  handleChange = panel => (event, expanded) => {
    event.preventDefault();

    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  setDefaultPrinter = p => (event) => {
    event.preventDefault();

    const settings ={
      defaultPrinter: p,
      backgroundPrint: this.state.backgroundPrint
    };

    this.props.saveSettings(settings);
  };

  testPrint = p => (event) => {
    event.preventDefault();
    const printerObj={
      content: "<h1>TEST PRINT FROM E-DOCTORSCRIPT</h1>",
      options: {
        silent: this.state.backgroundPrint, //Don't ask user for print settings. Default is false.
        printBackground: true, //Also prints the background color and image of the web page. Default is false.
        deviceName: p
      }
    };
    console.log("Test print request", printerObj);
    ipcRenderer.send("printPDF", printerObj);
  };

  handleChangePrintLines = name => event => {
    this.setState({[name]: event.target.checked });
    const data = {
      id: name,
      value:event.target.checked
    };
    this.props.changeTemplateSettings(data);
  };

  updateTemplate = (event)=>{
    //event.preventDefault();
    console.log("UPDATE TEMPLATE REQUEST, before");
    console.log(this.state);
    const { dr_name, dr_education, dr_specialist, education_institute, reg_no,
      center_text, chamber_name, chamber_address, chamber_timing, margin_top,
      margin_bottom, margin_left, margin_right, defaultTemplate, printLines} = this.state;
    const {firstname , lastname} = this.props.usermanagementState.profile;
    const username = firstname +` ` +lastname;
    const templateData = {
      preview: true,
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
      }
    };
    ipcRenderer.send("updateTemplateRequest", templateData);

    this.props.defaultDocument(ipcRenderer.sendSync("generate-pdf"));

    console.log("After");
    console.log(this.state);

    const settings ={
      defaultTemplate: this.state.defaultTemplate,
      dr_name:this.state.dr_name,
      dr_education:this.state.dr_education,
      dr_specialist:this.state.dr_specialist,
      education_institute:this.state.education_institute,
      reg_no:this.state.reg_no,
      center_text:this.state.center_text,
      chamber_name:this.state.chamber_name,
      chamber_address:this.state.chamber_address,
      chamber_timing:this.state.chamber_timing,
      margin_top:this.state.margin_top,
      margin_bottom:this.state.margin_bottom,
      margin_left:this.state.margin_left,
      margin_right:this.state.margin_right,
      printLines: this.state.printLines
    };

    this.props.updateTemplateSettings(settings);


    this.setState({openPreview : true})
  };


  render(){
    const { classes } = this.props;
    console.log("Inside Settings Component");
    console.log("State :" , this.state);

    const {expanded, value, docUpdated, defaultTemplate, dr_name, dr_education, dr_specialist, education_institute, reg_no,
      center_text, chamber_name, chamber_address, chamber_timing, margin_top,
      margin_bottom, margin_left, margin_right, document} = this.state;


      return(
      <div className={classes.root}>
        <Dialog open={this.state.openPreview} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Test Print Preview</DialogTitle>
          <DialogContent>
            <PDFViewer document={{"binary": document  }} scale={.9}  loader={<CircularProgress />}/>
          </DialogContent>
        </Dialog>

        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleTabChange} variant="scrollable" scrollButtons="on" indicatorColor="primary" textColor="primary">
            <Tab label="Printer" icon= {<IconSettingsPrinter />} />
            <Tab label="Template" icon={<FavoriteIcon />} />
          </Tabs>
        </AppBar>

        {value === 0 &&
        <div style={{ marginTop:'20px'}}>
          <span style={{padding:'4.5%'}}>
            Background Print
              <Switch
                checked={this.state.backgroundPrint}
                onChange={this.handlebackgroundPrintChange('backgroundPrint')}
                value="backgroundPrint"
              />
            </span>

        <ul className={classes.printerList}>

          {this.state.printers.map((p, key) =>
          <li className={classes.printerListElm} key={key}>

            <PrinterElements printer={p} classes={classes}/>

            <ExpansionPanel expanded={expanded === p.name} onChange={this.handleChange(p.name)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container>
                  {this.state.defaultPrinter == p.name?
                  <Grid item xs={2}><Check style={{color:'green'}} /></Grid>
                  :null}
                  <Grid item xs={10}><Typography className={classes.heading}>General settings</Typography></Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <a href="#" onClick={this.setDefaultPrinter(p.name)}>Set this as default printer</a>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.testPrint(p.name)}>Send Test Print</Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </li>
        )}
        </ul> </div>
        }

        {value === 1 &&
        <div className= {classes.settingsTemplateLayoutRoot}>
          <div className= {classes.settingsTemplateLayoutOptions}>

            <span style={{marginLeft:'1.5%'}}>
            Use default Template
              <Switch
                checked={this.state.defaultTemplate}
                onChange={this.handleprintTemplateChange('defaultTemplate')}
                value="defaultTemplate"
              />
            </span>
            <div className= {classes.LayoutOptionsContent}>
              <div className= {classes.LayoutOptionsContentLeft}>
                <TextField disabled={true} onChange={this.handleSettingChange} id="dr_name" label="Dr Name" value={dr_name} className={classes.layoutOptionsTextfield}/>
                <TextField disabled={!defaultTemplate} onChange={this.handleSettingChange} id="dr_education" label="Education" value={dr_education} placeholder="Placeholder" className={classes.layoutOptionsTextfield} />
                <TextField disabled={!defaultTemplate} onChange={this.handleSettingChange} id="dr_specialist" label="Specialist" value={dr_specialist} placeholder="Placeholder" className={classes.layoutOptionsTextfield}/>
                <TextField disabled={!defaultTemplate} onChange={this.handleSettingChange} id="education_institute" label="Education" value={education_institute} placeholder="Placeholder" className={classes.layoutOptionsTextfield}/>
                <TextField disabled={!defaultTemplate} onChange={this.handleSettingChange} id="reg_no" label="Register No" value={reg_no} placeholder="Placeholder" className={classes.layoutOptionsTextfield} />
              </div>

              <div className= {classes.LayoutOptionsContentCenter}>
                <TextField disabled={!defaultTemplate} onChange={this.handleSettingChange} id="center_text" label="Center Text" value={center_text} className={classes.layoutOptionsTextfield}/>
              </div>

              <div className= {classes.LayoutOptionsContentRight}>
                <TextField disabled={!defaultTemplate} onChange={this.handleSettingChange} id="chamber_name" label="Chamber Name" value={chamber_name} className={classes.layoutOptionsTextfield}/>
                <TextField disabled={!defaultTemplate} onChange={this.handleSettingChange} id="chamber_address" label="Chamber Address" value={chamber_address} className={classes.layoutOptionsTextfield}/>
                <TextField disabled={!defaultTemplate} onChange={this.handleSettingChange} id="chamber_timing" label="Timing" value={chamber_timing} className={classes.layoutOptionsTextfield}/>
              </div>


            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox checked={this.state.printLines}
                            onChange={this.handleChangePrintLines('printLines')}
                            value="printLines" />
                }
                label="Display Lines"
              />
            </div>
            <div className= {classes.LayoutOptionsMargin}>
              <TextField onChange={this.handleSettingChange} id="margin_top" type="number" label="Top" value= {margin_top} className={classes.layoutOptionsTextfield}/>
              <TextField onChange={this.handleSettingChange} id="margin_bottom" type="number" label="Bottom" value= {margin_bottom} className={classes.layoutOptionsTextfield}/>
              <TextField onChange={this.handleSettingChange} id="margin_left" type="number" label="Left" value= {margin_left} className={classes.layoutOptionsTextfield}/>
              <TextField onChange={this.handleSettingChange} id="margin_right" type="number" label="Right" value= {margin_right} className={classes.layoutOptionsTextfield}/>

            </div>
            <Button variant="contained" color="primary" className={classes.button}
                    onClick={this.updateTemplate}>Update Template
            </Button>
          </div>
        </div>
        }
      </div>
    )
  }
}
export default withStyles(styles)(Settings);
