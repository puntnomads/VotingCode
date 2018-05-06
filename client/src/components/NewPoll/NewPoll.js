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
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import styled from "styled-components";
import Messages from "../Notifications/Messages";
import Errors from "../Notifications/Errors";
import { pollCreate, pollCreateReset } from "./actions";
import Input from "../Lib/Input";
import renderOptions from "../Lib/renderOptions";
import tagInput from "../Lib/tagInput";
import "./index.css";

const titleRequired = value => (value ? undefined : "Title Required");
const tagRequired = (value, props) =>
  props.tags && props.tags.length > 0 ? undefined : "Tag Required";

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

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
                  <Title>New Poll</Title>
                  <form
                    className="new-poll"
                    onSubmit={handleSubmit(this.submit)}
                  >
                    <Field
                      key="title"
                      name="title"
                      label="Name your poll"
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
