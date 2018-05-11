import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ErrorBoundary from "./ErrorBoundary";

class Input extends Component {
  render() {
    const {
      input,
      label,
      placeholder,
      controlId,
      bsSize,
      type,
      meta: { touched }
    } = this.props;
    const validationState =
      (touched && (input.value.length === 0 && "error")) || null;
    return (
      <ErrorBoundary>
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
      </ErrorBoundary>
    );
  }
}

export default Input;
