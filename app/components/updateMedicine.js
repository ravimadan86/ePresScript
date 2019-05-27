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
    state={
        medDetails:''
    }
    componentWillMount(){
        this.setState({
            medDetails:this.props.obj
        })
    }
    render(){
        const { classes } = this.props;
        console.log(this.props);
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
                    value={!this.state.medDetails.types==''?this.state.medDetails.types:'N/A'}
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
                    value={!this.state.medDetails.product_name==''?this.state.medDetails.product_name:'N/A'}
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
                    value={!this.state.medDetails.strength==''?this.state.medDetails.strength:'N/A'}
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
                    value={!this.state.medDetails.generic==''?this.state.medDetails.generic:'N/A'}
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
                    value={!this.state.medDetails.indication==''?this.state.medDetails.indication:'N/A'}
                    onChange={(event: any, target: any) => {
                      this.handleChange(event, target);
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.saveMedicineBtn}
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