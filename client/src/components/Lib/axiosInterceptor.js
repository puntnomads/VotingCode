import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class axiosInterceptor extends Component {
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      axios.interceptors.request.use(config => {
        config.headers.Authorization = user.token;
        return config;
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user.token !== prevProps.user.token) {
      const user = this.props.user;
      localStorage.setItem("user", JSON.stringify(user));
      axios.interceptors.request.use(config => {
        config.headers.Authorization = user.token;
        return config;
      });
    }
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const connected = connect(mapStateToProps, {})(axiosInterceptor);

export default connected;
