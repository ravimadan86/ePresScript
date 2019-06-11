import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    addMedReqTextFields: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,

    },
    addMedicineBtn:{
        position: 'relative',
        zIndex:'100',
        float: 'right',
        marginRight:'3%',
        marginTop:'1%'
    }
});

class UpdateMedicine extends React.Component{
    constructor(props){
      super(props);
      console.log(this.props);
      this.state={
        medDetails:'',
        id: '',
        treatment_medicine_id: '',
        product_name:'',
        types:'',
        generic:'',
        strength:'',
        indication:'',
        frequency:'',
        remark:''
      }
    }

    componentWillMount(){
        this.setState({
          product_name:this.props.obj.product_name,
          types:this.props.obj.types,
          generic:this.props.obj.generic,
          strength:this.props.obj.strength,
          indication:this.props.obj.indication,
          id: this.props.obj.medicine_id,
          treatment_medicine_id: this.props.obj.treatment_medicine_id,
          frequency:this.props.obj.frequency,
          remark:this.props.obj.remark
        })
    }
  handleChange(event: any, target: any) {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "product_name":
        this.setState({product_name:value});
        break;

      case "type":
        this.setState({types:value});
        break;

      case "strength":
        this.setState({strength:value});
        break;
      case "generic":
        this.setState({generic:value});
        break;
      case "indication":
        this.setState({indication:value});
        break;
      case "remark":
        this.setState({remark:value});
        break;
      case "frequency":
        this.setState({frequency:value});
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading:true
    });
    //check if it is medicine or medicine from treatment
    const {name, treatment_id} = this.props;
    const {  product_name, types, generic, strength, indication, id ,treatment_medicine_id, frequency, remark } = this.state;
    if (name === 'treatmentMedicine') {
      const updateMedicineForTreatment = {
        treatment_medicine_id: treatment_medicine_id,
        product_name:product_name,
        types:types,
        generic:generic,
        indication:indication,
        strength:strength,
        frequency: frequency,
        remark: remark
      };
      this.props.updateMedicineFromTreatment(updateMedicineForTreatment , treatment_id);
      this.props.handleClose();
    }else {
      const updateMedicine = {
        product_name:product_name,
        types:types,
        generic:generic,
        indication:indication,
        strength:strength
      };
      this.props.updateMedicine(updateMedicine, id);
    }
  }
    render(){
        const { classes , name} = this.props;
        const {  product_name, types, generic, strength, indication, remark, frequency} = this.state;

        return(
            <div>
            <DialogTitle>Medicine Details</DialogTitle>
            <DialogContent>
              <FormControl margin="normal" required fullWidth>
                <form className={classes.form}
                      onSubmit={(event: any, target: any) => {
                        this.handleSubmit(event, target);
                      }}
                >
                  <TextField
                    required={true}
                    id="type"
                    name="type"
                    label="Type"
                    className={classes.addMedReqTextFields}
                    margin="normal"
                    value={types == null ? '' : types}
                    onChange={(event: any, target: any) => {
                      this.handleChange(event, target);
                    }}
                  />
                  <TextField
                    required={true}
                    id="product_name"
                    name="product_name"
                    label="Product Name"
                    className={classes.addMedReqTextFields}
                    margin="normal"
                    value={product_name==null? '': product_name}
                    onChange={(event: any, target: any) => {
                      this.handleChange(event, target);
                    }}
                  />
                  <TextField
                    id="strength"
                    name="strength"
                    label="Strength"
                    className={classes.addMedReqTextFields}
                    margin="normal"
                    value={strength==null? '': strength}
                    onChange={(event: any, target: any) => {
                      this.handleChange(event, target);
                    }}
                  />
                  <TextField
                    id="generic"
                    name="generic"
                    label="Generic"
                    className={classes.addMedReqTextFields}
                    margin="normal"
                    value={generic == null ? '': generic}
                    onChange={(event: any, target: any) => {
                      this.handleChange(event, target);
                    }}
                  />
                  <TextField
                    id="indication"
                    name="indication"
                    label="Indication"
                    className={classes.addMedReqTextFields}
                    margin="normal"
                    multiline={true}
                    value={indication == null ? '': indication}
                    onChange={(event: any, target: any) => {
                      this.handleChange(event, target);
                    }}
                  />
                  {name === 'treatmentMedicine' ?
                    <TextField
                      id="frequency"
                      name="frequency"
                      label="Frequency"
                      className={classes.addMedReqTextFields}
                      margin="normal"
                      multiline={true}
                      value={frequency == null ? '': frequency}
                      onChange={(event: any, target: any) => {
                        this.handleChange(event, target);
                      }}
                    />
                  : null}
                  {name === 'treatmentMedicine' ?
                    <TextField
                      id="remark"
                      name="remark"
                      label="Remark"
                      className={classes.addMedReqTextFields}
                      margin="normal"
                      multiline={true}
                      value={remark == null ? '': remark}
                      onChange={(event: any, target: any) => {
                        this.handleChange(event, target);
                      }}
                    />
                    : null}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Update Medicine
                  </Button>
                </form>
              </FormControl>

            </DialogContent>

            </div>
        )
    }
}
UpdateMedicine.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UpdateMedicine);
