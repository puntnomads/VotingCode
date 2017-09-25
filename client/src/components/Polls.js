import React from "react";
import { Grid, Row, Col, Thumbnail, Glyphicon } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class Polls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: true,
      polls: [
        { title: "Story 1:Adding Headers", creator: "werwqer" },
        { title: "Story 1:Adding Headers", creator: "werwqer" },
        { title: "Story 1:Adding Headers", creator: "werwqer" },
        { title: "Story 1:Adding Headers", creator: "werwqer" },
        { title: "Story 1:Adding Headers", creator: "werwqer" }
      ],
      alltags: ["React", "Redux", "NodeJS", "Express", "MongoDB"],
      tags: []
    };
  }
  
  handleChanged = event => {
    if (this.state.alltags.indexOf(event.target.value) > -1) {
      const tags = this.state.tags.concat(event.target.value);
      event.target.value = "";
      this.setState({
        tags: tags
      });
    }
  };

  render() {
    const user = this.state.user;
    const thumbnails = this.state.polls;
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
              {this.state.tags.map((tag, i) =>
                <a className="tag" key={i}>
                  {tag} <Glyphicon glyph="remove" />
                </a>
              )}
              </div>
              <div className="taginput">
              <input
                type="text"
                list="data"
                onChange={this.handleChanged}
                placeholder="Add a tag"
              />
              </div>
              <datalist id="data">
                <select>
                {this.state.alltags.map((item, i) =>
                  <option key={i} value={item}>
                    {item}
                  </option>
                )}
              </select>
              </datalist>
              {user &&
                <Thumbnail className="nothumbnail">
                  <Grid>
                    <Row>
                      <Col xs={7} md={4}>
                        <p>No polls yet. Create a first one!</p>
                      </Col>
                      <Col xs={2} md={2}>
                        <LinkContainer to="/login">
                          <Glyphicon glyph="plus-sign" />
                        </LinkContainer>
                      </Col>
                    </Row>
                  </Grid>
                </Thumbnail>}
              {thumbnails.map((thumbnail, i) =>
                <Thumbnail className="thumbnail" key={i}>
                  <h3>
                    {thumbnail.title}
                  </h3>
                  <p>
                    created by {thumbnail.creator}
                  </p>
                </Thumbnail>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
