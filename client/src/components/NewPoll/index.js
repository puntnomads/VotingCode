import React, { Component } from "react";
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
import { pollCreate, pollCreateReset } from "./actions";
import Input from "../Lib/Input";
import renderOptions from "../Lib/renderOptions";
import tagInput from "../Lib/tagInput";
import ErrorBoundary from "../Lib/ErrorBoundary";
import "./index.css";

const titleRequired = value => (value ? undefined : "Title Required");
const tagRequired = (value, props) =>
  props.tags && props.tags.length > 0 ? undefined : "Tag Required";

const NewPollLinkContainer = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 72px;
`;
const Message = styled.h3`
  text-align: center;
  font-size: 30px;
`;
const LinkContainer = styled.p`
  text-align: center;
  font-size: 30px;
`;

class NewPoll extends Component {
  user = JSON.parse(localStorage.getItem("user"));
  componentWillUnmount() {
    if (this.props.newPoll.newPoll._id) {
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
    this.props.dispatch(change("newPoll", "tags", newtags));
  };
  deleteTag = (tag, tags) => {
    const newtags = tags.filter(item => item !== tag);
    this.props.dispatch(change("newPoll", "tags", newtags));
  };
  submit = values => {
    values["name"] = this.user.name;
    values.options = values.options.map(function(obj) {
      return [obj, 1];
    });
    this.props.pollCreate(values);
  };
  render() {
    const {
      tags,
      handleSubmit,
      invalid,
      newPoll: { newPoll }
    } = this.props;
    const poll_ID = newPoll._id;
    return (
      <div>
        {!poll_ID ? (
          <ErrorBoundary>
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
                        placeholder="What is your favourite programming language?"
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
                  </div>
                </Col>
              </Row>
            </Grid>
          </ErrorBoundary>
        ) : (
          <ErrorBoundary>
            <Grid>
              <Row>
                <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
                  <NewPollLinkContainer>
                    <Title>Congratulations</Title>
                    <Message>Your poll has been posted to</Message>
                    <LinkContainer>
                      <a
                        href={`${window.location.protocol}//${
                          window.location.host
                        }/poll/${newPoll._id}`}
                        target="_blank"
                      >
                        {`${window.location.protocol}//${
                          window.location.host
                        }/poll/${newPoll._id}`}
                      </a>
                    </LinkContainer>
                  </NewPollLinkContainer>
                </Col>
              </Row>
            </Grid>
          </ErrorBoundary>
        )}
      </div>
    );
  }
}

const selector = formValueSelector("newPoll");

const mapStateToProps = state => ({
  newPoll: state.newPoll,
  tags: selector(state, "tags")
});

const connected = connect(mapStateToProps, { pollCreate, pollCreateReset })(
  NewPoll
);

const formed = reduxForm({
  form: "newPoll"
})(connected);

export default formed;
