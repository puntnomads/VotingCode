import React, { Component } from "react";
import { Field } from "redux-form";
import { Button } from "react-bootstrap";
import Input from "./Input";

const optionRequired = value => (value ? undefined : "Option Required");

class renderOptions extends Component {
  componentWillMount() {
    const { fields } = this.props;
    if (!fields.length) {
      fields.push();
      fields.push();
    }
  }
  render() {
    const { fields } = this.props;
    return (
      <div>
        <label>Options</label>
        {fields.map((option, i) => {
          if (i < 2) {
            return (
              <Field
                key={i + 1}
                name={option}
                placeholder={i === 0 ? "Java" : "JavaScript"}
                controlId={`option${i + 1}`}
                bsSize="large"
                type="text"
                validate={optionRequired}
                component={Input}
              />
            );
          } else {
            return (
              <div>
                <Field
                  key={i + 1}
                  name={option}
                  placeholder={"New Option"}
                  controlId={`option${i + 1}`}
                  bsSize="large"
                  type="text"
                  validate={optionRequired}
                  component={Input}
                />
                <div className="text-center">
                  <Button
                    className="delete"
                    bsSize="xsmall"
                    bsStyle="danger"
                    onClick={() => fields.remove(i)} // problem
                    type="button"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          }
        })}
        <div className="text-center">
          <Button
            className="add"
            bsSize="large"
            bsStyle="link"
            onClick={() => fields.push()}
            type="button"
          >
            Add Option
          </Button>
        </div>
      </div>
    );
  }
}

export default renderOptions;
