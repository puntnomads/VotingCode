import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  reduxForm,
  FieldArray,
  Field,
  change,
  formValueSelector
} from "redux-form";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Glyphicon
} from "react-bootstrap";
import Messages from "../Notifications/Messages";
import Errors from "../Notifications/Errors";
import { pollCreate, pollCreateReset } from "./actions";
import tagInput from "../Lib/tagInput";

const titleRequired = value => (value ? undefined : "Title Required");
const optionRequired = value => (value ? undefined : "Option Required");
const tagRequired = (value, props) =>
  props.tags && props.tags.length > 0 ? undefined : "Tag Required";

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
        {fields.map((option, i) => {
          if (i < 2) {
            return (
              <Field
                key={i + 1}
                name={option}
                label={`Option ${i + 1}`}
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
                  label={`Option ${i + 1}`}
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

class Input extends React.Component {
  render() {
    const {
      input,
      label,
      key,
      controlId,
      bsSize,
      type,
      fields,
      meta: { touched },
      ...props
    } = this.props;
    const validationState =
      (touched && (input.value.length === 0 && "error")) || null;
    return (
      <FormGroup
        key={key}
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

class NewPoll extends Component {
  componentWillUnmount() {
    if (this.props.newpoll.newpoll._id) {
      this.props.pollCreateReset();
    }
  }
  addTag = value => {
    const tags = this.props.tags;
    const tagsArray = tags ? tags : [];
    if (tagsArray.indexOf(value) !== -1) {
      return null;
    }
    const newtags = tagsArray.concat(value);
    this.props.dispatch(change("newpoll", "tags", newtags));
  };

  deleteTag = (tag, tags) => {
    const newtags = tags.filter(item => item !== tag);
    this.props.dispatch(change("newpoll", "tags", newtags));
  };

  submit = values => {
    values["token"] = this.props.user.token;
    values["name"] = this.props.user.name;
    values.options = values.options.map(function(obj) {
      return [obj, 1];
    });
    console.log(values);
    this.props.pollCreate(values);
  };

  render() {
    const {
      tags,
      handleSubmit,
      invalid,
      newpoll: { requesting, successful, messages, errors, newpoll }
    } = this.props;
    const poll_ID = newpoll._id;
    return (
      <div>
        {!poll_ID ? (
          <Grid>
            <Row>
              <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
                <div className="page">
                  <h1>New Poll</h1>
                  <form onSubmit={handleSubmit(this.submit)}>
                    <Field
                      key="title"
                      name="title"
                      label="Title"
                      controlId="title"
                      bsSize="large"
                      type="text"
                      validate={titleRequired}
                      component={Input}
                    />
                    <FieldArray
                      name="options"
                      component={renderOptions}
                      shouldUpdate={1}
                    />
                    <div className="displaytags">
                      {tags &&
                        tags.map((tag, i) => (
                          <a
                            className="tag"
                            key={i}
                            value={tag}
                            onClick={() => this.deleteTag(tag, tags)}
                          >
                            {tag} <Glyphicon glyph="remove" />
                          </a>
                        ))}
                    </div>
                    <Field
                      name="taginput"
                      type="text"
                      list="data"
                      validate={tagRequired}
                      addTag={this.addTag}
                      tags={tags}
                      component={tagInput}
                    />
                    <Button
                      block
                      bsSize="large"
                      disabled={invalid}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                  <div className="auth-messages">
                    {!requesting &&
                      !!errors.length && (
                        <Errors
                          message="Failure to create a new poll due to:"
                          errors={errors}
                        />
                      )}
                    {!requesting &&
                      !!messages.length && <Messages messages={messages} />}
                    {!requesting && successful && <div>New Poll Created! </div>}
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        ) : (
          <Redirect to={"/poll/" + newpoll._id} />
        )}
      </div>
    );
  }
}

const selector = formValueSelector("newpoll");

const mapStateToProps = state => ({
  user: state.user,
  newpoll: state.newpoll,
  tags: selector(state, "tags")
});

const connected = connect(mapStateToProps, { pollCreate, pollCreateReset })(
  NewPoll
);

const formed = reduxForm({
  form: "newpoll"
})(connected);

export default formed;
