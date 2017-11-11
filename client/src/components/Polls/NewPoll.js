import React from "react";
import PropTypes from "prop-types";
import { reduxForm, FieldArray, Field, change } from "redux-form";
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
import { pollCreate } from "./actions";

const titleRequired = value => (value ? undefined : "Title Required");
const optionRequired = value => (value ? undefined : "Option Required");
const tagRequired = (value,props) => (props.tags && props.tags.length > 0 ? undefined : "Tag Required");

class renderOptions extends React.Component {
  componentWillMount() {
    const { fields, shouldUpdate } = this.props;
    if (!fields.length) {
      fields.push();
      fields.push();
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.props.shouldUpdate !== nextProps.shouldUpdate;
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
        <ControlLabel>
          {label}
        </ControlLabel>
        <FormControl {...input} type={type} {...props} />
      </FormGroup>
    );
  }
}

class tagInput extends React.Component {
  render() {
    const {
      input,
      type,
      list,
      alltags,
      addTag
    } = this.props;
    return (
      <div className="taginput">
        <input
          {...input}
          type={type}
          list={list}
          onChange={addTag}
          placeholder="Add a tag"
        />
        <datalist id="data">
          <select>
            {alltags.map((item, i) =>
              <option key={i} value={item}>
                {item}
              </option>
            )}
          </select>
        </datalist>
      </div>
    );
  }
}

class NewPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alltags: ["React", "Redux", "NodeJS", "Express", "MongoDB"],
      tags: []
    };
  }

  addTag = event => {
    if (this.state.tags.length > 0 && this.state.tags.indexOf(event.target.value) > -1) {
      return null;
    }
    console.log(event.target.value);
    const tags = this.state.tags.concat(event.target.value);
    console.log(tags);
    event.target.value = "";
    this.setState({
      tags: tags
    });
    this.props.dispatch(change('newpoll', 'tags', tags));
  };

  deleteTag = tag => {
    console.log(tag);
    const tags = this.state.tags.filter(item => item !== tag);
    this.setState({
      tags: tags
    });
    this.props.dispatch(change('newpoll', 'tags', tags));
  };

  submit = values => {
    const { reset } = this.props;
    this.props.pollCreate(values);
    reset();
    this.setState({
      tags: []
    });
    console.log(values);
  };

  render() {
    const {
      handleSubmit,
      invalid,
      polls: { requesting, successful, messages, errors }
    } = this.props;

    const number = this.state.number;
    return (
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
                <FieldArray name="options" component={renderOptions} shouldUpdate={1}/>
                <div className="displaytags">
                  {this.state.tags.map((tag, i) =>
                    <a className="tag" key={i} value={tag} onClick={() => this.deleteTag(tag)}>
                      {tag} <Glyphicon glyph="remove" />
                    </a>
                  )}
                </div>
                <Field
                  name="taginput"
                  type="text"
                  list="data"
                  validate={tagRequired}
                  addTag={this.addTag}
                  component={tagInput}
                  alltags={this.state.alltags}
                  tags={this.state.tags}
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
                  !!errors.length &&
                  <Errors
                    message="Failure to create a new poll due to:"
                    errors={errors}
                  />}
                {!requesting &&
                  !!messages.length &&
                  <Messages messages={messages} />}
                {!requesting &&
                  successful &&
                  <div>
                    New Poll Created!{" "}
                  </div>}
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  polls: state.polls
});

const connected = connect(mapStateToProps, { pollCreate })(NewPoll);

const formed = reduxForm({
  form: "newpoll"
})(connected);

export default formed;
