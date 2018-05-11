import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import ErrorBoundary from "./ErrorBoundary";

class simpleInput extends Component {
  render() {
    const { input, selectedOption } = this.props;
    return (
      <ErrorBoundary>
        <FormControl
          type="text"
          placeholder="your own option"
          disabled={selectedOption ? "disabled" : ""}
          {...input}
        />
      </ErrorBoundary>
    );
  }
}

export default simpleInput;
