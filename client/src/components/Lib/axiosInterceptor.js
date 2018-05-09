import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class axiosInterceptor extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      axios.interceptors.request.use(config => {
        config.headers.Authorization = token;
        return config;
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user.token !== prevProps.user.token) {
      const token = this.props.user.token;
      console.log("token", token);
      localStorage.setItem("token", token);
      axios.interceptors.request.use(config => {
        config.headers.Authorization = token;
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

// https://github.com/axios/axios/issues/108
// https://coursework.vschool.io/react-token-authentication-pt-2/
