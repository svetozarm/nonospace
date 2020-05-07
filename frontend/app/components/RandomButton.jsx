/**
 * @summary Button component that loads a random nonogram from the backend on
 * click
 *
 * @file RandomButton.jsx
 * @author Svetozar Miucin (svetozar.miuchin@gmail.com)
 */
import React, { Component } from "react";
import nonoStore from "../state/NonoStore";

const RandomButton = (props) => {
  const clickHandler = () => {
    fetch("/api/nonogram/random")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        nonoStore.newNonogram(
          resp.rows,
          resp.columns,
          resp.rowHints,
          resp.colHints
        );
      });
  };
  return <button onClick={clickHandler}>Random</button>;
};

export default RandomButton;
