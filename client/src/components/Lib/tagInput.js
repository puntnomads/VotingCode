import React, { Component } from "react";
import Autocomplete from "react-autocomplete";

class tagInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      alltags: ["React", "Redux", "NodeJS", "Express", "MongoDB"]
    };
  }
  render() {
    const { input, type, list, addTag, tags } = this.props;
    console.log(this.state.alltags);
    const items = this.state.alltags.map(function(tag) {
      var Obj = {};
      Obj["label"] = tag;
      return Obj;
    });
    console.log(items);
    return (
      <div className="taginput">
        <Autocomplete
          getItemValue={item => item.label}
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
          items={items}
          inputProps={{ placeholder: "Add a tag" }}
          renderItem={(item, isHighlighted) => (
            <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
              {item.label}
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
