import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Thumbnail, Glyphicon } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { userPollsGet, userPollDelete } from "./actions";
import allTags from "../Lib/tags";
import ErrorBoundary from "../Lib/ErrorBoundary";

class UserPolls extends Component {
  user = JSON.parse(localStorage.getItem("user"));
  state = {
    allTags: allTags,
    tags: []
  };
  componentDidMount() {
    this.props.userPollsGet(this.user.name);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userPolls.deletedPoll !== this.props.userPolls.deletedPoll) {
      this.props.userPollsGet(this.user.name);
    }
  }
  addTag = event => {
    const tagsArray = this.state.tags ? this.state.tags : [];
    const value = event.target.value;
    if (tagsArray.indexOf(value) !== -1) {
      return null;
    }
    if (this.state.allTags.indexOf(value) > -1) {
      const newtags = tagsArray.concat(event.target.value);
      event.target.value = "";
      this.setState({
        tags: newtags
      });
    }
  };
  deleteTag = tag => {
    const newtags = this.state.tags.filter(item => item !== tag);
    this.setState({
      tags: newtags
    });
  };
  deleteUserPoll = userPoll => {
    this.props.userPollDelete(userPoll._id);
  };
  render() {
    let polls = this.props.userPolls.userPolls;
    const filteredArray = [];
    if (this.state.tags.length > 0) {
      const tags = this.state.tags;
      polls.forEach(function(poll) {
        poll.tags.forEach(function(tag) {
          if (tags.indexOf(tag) > -1) {
            if (filteredArray.indexOf(poll) === -1) {
              filteredArray.push(poll);
            }
          }
        });
      });
      polls = filteredArray;
    }
    return (
      <ErrorBoundary>
        <div className="polls">
          <h1>User Polls</h1>
          <Grid>
            <Row>
              <Col
                xs={10}
                xsOffset={1}
                md={6}
                mdOffset={3}
                className="thumbnails"
              >
                <div className="displaytags">
                  {this.state.tags.map((tag, i) => (
                    <a
                      className="tag"
                      key={i}
                      value={tag}
                      onClick={() => this.deleteTag(tag)}
                    >
                      {tag} <Glyphicon glyph="remove" />
                    </a>
                  ))}
                </div>
                <div className="taginput">
                  <input
                    type="text"
                    list="data"
                    onChange={this.addTag}
                    placeholder="Filter list by tags"
                  />
                </div>
                <datalist id="data">
                  <select>
                    {this.state.allTags.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </datalist>
                {polls &&
                  polls.length < 1 && (
                    <Thumbnail className="nothumbnail">
                      <Grid>
                        <Row>
                          <Col xs={7} md={4}>
                            <p>No polls yet. Create a first one!</p>
                          </Col>
                          <Col xs={2} md={2}>
                            <LinkContainer to="/newpoll">
                              <Glyphicon glyph="plus-sign" />
                            </LinkContainer>
                          </Col>
                        </Row>
                      </Grid>
                    </Thumbnail>
                  )}
                {polls &&
                  polls.map((poll, i) => (
                    <Thumbnail className="thumbnail" key={i}>
                      <Grid>
                        <Row>
                          <Link key={i} to={"/poll/" + poll._id}>
                            <Col xs={7} md={4}>
                              <h3>{poll.title}</h3>
                              <p>created by {poll.name}</p>
                            </Col>
                          </Link>
                          <Col xs={2} md={2} className="trash">
                            <Glyphicon
                              glyph="trash"
                              onClick={() => this.deleteUserPoll(poll)}
                            />
                          </Col>
                        </Row>
                      </Grid>
                    </Thumbnail>
                  ))}
              </Col>
            </Row>
          </Grid>
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  userPolls: state.userPolls
});

const connected = connect(mapStateToProps, { userPollsGet, userPollDelete })(
  UserPolls
);

export default connected;
