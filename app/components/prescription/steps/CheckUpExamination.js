import React, { Component } from 'react';

type Props = {
  setForm: (form: string) => void,
  setName: (name: string) => void,
  setStrength: (strength: string) => void,
  setFrequency: (frequency: string) => void,
  setRemark: (remark: string) => void,
  setSubmitted: (submitted: boolean) => void
};

class CheckUpExamination extends React.Component<Props, any> {

  constructor(props: Props, state: any) {
    super(props);
    console.log('in CheckUpExamination constructor');
    console.log(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1> Check-Up And Examination </h1>
        <h2> Code me! </h2>
      </div>
    );
  }
}

export default (CheckUpExamination);
