import React, { Component } from "react";
import { FormControl } from "react-bootstrap";

class simpleInput extends Component {
  render() {
    const { input, selectedOption } = this.props;
    return (
      <FormControl
        type="text"
        placeholder="your own option"
        disabled={selectedOption ? "disabled" : ""}
        {...input}
      />
    );
  }
}

export default simpleInput;
