import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import tags from "../Lib/tags";

class tagInput extends Component {
  state = {
    value: "",
    alltags: tags
  };
  render() {
    const { addTag } = this.props;
    return (
      <div className="taginput">
        <Autocomplete
          getItemValue={item => item}
          shouldItemRender={(item, value) =>
            item.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          menuStyle={{
            borderRadius: "3px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "2px 0",
            fontSize: "90%",
            overflow: "auto",
            maxHeight: "50%",
            zIndex: "1"
          }}
          items={tags}
          inputProps={{ placeholder: "Add a tag" }}
          renderItem={(item, isHighlighted) => (
            <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
              {item}
            </div>
          )}
          value={this.state.value}
          onChange={e => {
            this.setState({ value: e.target.value });
          }}
          onSelect={value => {
            addTag(value);
            this.setState({ value: "" });
          }}
        />
      </div>
    );
  }
}

export default tagInput;
