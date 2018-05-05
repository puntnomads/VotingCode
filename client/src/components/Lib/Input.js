import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Input extends Component {
  render() {
    const {
      input,
      label,
      controlId,
      bsSize,
      type,
      meta: { touched },
      ...props
    } = this.props;

    const validationState =
      (touched && (input.value.length === 0 && "error")) || null;
    return (
      <FormGroup
        controlId={controlId}
        bsSize={bsSize}
        validationState={validationState}
      >
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...input} type={type} {...props} />
      </FormGroup>
    );
  }
}

export default Input;
