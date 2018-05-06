import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Input extends Component {
  render() {
    const {
      input,
      label,
      placeholder,
      controlId,
      bsSize,
      type,
      meta: { touched },
      ...props
    } = this.props;
    console.log("label: ", label);
    const validationState =
      (touched && (input.value.length === 0 && "error")) || null;
    return (
      <FormGroup
        controlId={controlId}
        bsSize={bsSize}
        validationState={validationState}
      >
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormControl
          {...input}
          type={type}
          placeholder={placeholder ? placeholder : ""}
        />
      </FormGroup>
    );
  }
}

export default Input;
