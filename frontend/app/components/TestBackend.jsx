/**
 * @summary Throwaway test for the backend
 *
 * @file TestBackend.jsx
 * @author Svetozar Miucin (svetozar.miuchin@gmail.com)
 */
import React, { Component } from "react";

class TestBackend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: "not loaded yet",
    };
  }

  componentDidMount() {
    fetch("/api/test")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        this.setState(resp)
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.users}</h1>
      </div>
    );
  }
}

export default TestBackend;
