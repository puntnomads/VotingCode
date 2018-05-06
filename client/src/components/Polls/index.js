import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Thumbnail, Glyphicon } from "react-bootstrap";
import { pollsGet } from "./actions";
import alltags from "../Lib/tags";

class Polls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alltags: alltags,
      tags: []
    };
  }

  componentDidMount() {
    this.props.pollsGet();
  }

  addTag = event => {
    const tagsArray = this.state.tags ? this.state.tags : [];
    const value = event.target.value;
    if (tagsArray.indexOf(value) !== -1) {
      return null;
    }
    if (this.state.alltags.indexOf(value) > -1) {
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

  render() {
    let polls = this.props.polls.polls;
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
      <div className="polls">
        <h1>Polls</h1>
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
                  {this.state.alltags.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </datalist>
              {polls.map((poll, i) => (
                <Thumbnail key={i} className="thumbnail">
                  <Link to={"/poll/" + poll._id}>
                    <h3>{poll.title}</h3>
                    <p>created by {poll.name}</p>
                  </Link>
                </Thumbnail>
              ))}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  polls: state.polls
});

const connected = connect(mapStateToProps, { pollsGet })(Polls);

export default connected;
