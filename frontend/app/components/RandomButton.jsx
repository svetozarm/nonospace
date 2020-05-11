/**
 * @summary Button component that loads a random nonogram from the backend on
 * click
 *
 * @file RandomButton.jsx
 * @author Svetozar Miucin (svetozar.miuchin@gmail.com)
 */
import React, { Component } from "react";
import * as NonoActions from "../actions/NonoActions";

const RandomButton = (props) => {
  const clickHandler = () => {
    NonoActions.loadNewNonogram(4, 4);
  };
  return <button onClick={clickHandler}>Random</button>;
};

export default RandomButton;