import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, change, formValueSelector } from "redux-form";
import { Grid, Row, Col, Button, FormControl } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { pollGet, pollUpdate } from "./actions";
import simpleInput from "../Lib/simpleInput";

class Poll extends Component {
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.pollGet(params.poll_id);
  }
  selectOption = event => {
    const value = event.target.value;
    this.props.dispatch(change("poll", "selectedOption", value));
  };
  submit = values => {
    const token = this.props.user.token;
    const id = this.props.poll.poll._id;
    const newOption = values.newOption ? values.newOption : undefined;
    const selectedOption = values.selectedOption
      ? values.selectedOption
      : undefined;
    const options = this.props.poll.poll.options;
    if (selectedOption) {
      options.map(function(option) {
        if (option[0] === selectedOption) {
          option[1] = option[1] + 1;
          return option;
        } else {
          return option;
        }
      });
    }
    if (newOption) {
      options.push([newOption, 1]);
    }
    this.props.pollUpdate({ token: token, options: options, id: id });
  };

  render() {
    const {
      newOption,
      selectedOption,
      handleSubmit,
      poll: { poll }
    } = this.props;
    const title = poll.title;
    const initialData = [["Title", "Option"]];
    const options = poll.options ? poll.options : [];
    const data = initialData.concat(options);
    const tags = poll.tags ? poll.tags : [];
    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <div className="page">
              <h1>{title}</h1>
              <form onSubmit={handleSubmit(this.submit)}>
                <Row className="home">
                  <Col xs={12} md={this.props.user.token ? 5 : 12}>
                    <FormControl
                      componentClass="select"
                      disabled={newOption ? "disabled" : ""}
                      onChange={this.selectOption}
                    >
                      <option key={0} value={""}>
                        Choose an option
                      </option>
                      {data.map((item, i) => {
                        if (i > 0) {
                          return (
                            <option key={i + 1} value={item[0]}>
                              {item[0]}
                            </option>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </FormControl>
                  </Col>
                  {this.props.user.token && (
                    <Col xs={12} md={2}>
                      <p>or vote with</p>
                    </Col>
                  )}
                  {this.props.user.token && (
                    <Col xs={12} md={5}>
                      <Field
                        name="newOption"
                        selectedOption={selectedOption}
                        component={simpleInput}
                      />
                    </Col>
                  )}
                </Row>
                <Button block bsSize="large" type="submit" className="vote">
                  Vote
                </Button>
                <div className="displaytags">
                  {tags.map((tag, i) => (
                    <a className="tag" key={i}>
                      {tag}
                    </a>
                  ))}
                </div>
                <div>
                  <Chart
                    chartType="PieChart"
                    width="100%"
                    data={data}
                    options={{ is3D: true }}
                  />
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const selector = formValueSelector("poll");

const mapStateToProps = state => ({
  user: state.user,
  poll: state.poll,
  selectedOption: selector(state, "selectedOption"),
  newOption: selector(state, "newOption")
});

const connected = connect(mapStateToProps, { pollGet, pollUpdate })(Poll);

const formed = reduxForm({
  form: "poll"
})(connected);

export default formed;
