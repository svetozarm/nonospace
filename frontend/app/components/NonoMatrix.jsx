/**
 * @summary UI Elements for displaying the nonogram matrix
 *
 * @file NonoMatrix.jsx
 * @author Svetozar Miuchin (svetozar.miuchin@gmail.com)
 */
import React from "react";
import PropTypes from "prop-types";
import * as NonoActions from "../actions/NonoActions";
import { getValueBit, getLockBit } from "nonogram";

/**
 * Component for displaying a single row of cells
 *
 * @param {Array} props
 */
const NonoRow = (props) => {
  const { values } = props;
  return (
    <tr>
      {values.map((value, i) => (
        <NonoCell key={i} row={props.row} column={i} value={value} />
      ))}
    </tr>
  );
};

NonoRow.propTypes = {
  row: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

/**
 * Component for displaying a single cell
 *
 * @param {Object} props Contains row, column, value fields
 */
const NonoCell = (props) => {
  const { row, column, value } = props;
  const dragStartHandler = () => {
    NonoActions.startDrag(row, column);
  };

  const dragEndHandler = () => {
    NonoActions.endDrag();
  };

  const dragEnterHandler = () => {
    NonoActions.dragOver(row, column);
  };

  const clickHandler = (e) => {
    NonoActions.toggleCell(row, column);
  };

  const rightClickHandler = (e) => {
    e.preventDefault();
    NonoActions.toggleLockCell(row, column);
  };
  
  const cellValue = getValueBit(value);
  const cellLock = getLockBit(value);
  let className = "cell";
  className += ` ${cellValue === 0 ? "inactive" : "active"}`;
  className += ` ${cellLock === 0 ? "" : "locked"}`;

  return (
    <td
      className={className}
      onDragEnd={dragEndHandler}
      onDragStart={dragStartHandler}
      onDragEnter={dragEnterHandler}
      row={row}
      onClick={clickHandler}
      onContextMenu={rightClickHandler}
    />
  );
};

NonoCell.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

/**
 * Component for displaying the entire matrix
 *
 * @param {Array} props
 */
const NonoMatrix = (props) => {
  const { matrix } = props;
  return (
    <table>
      <tbody>
        {matrix.map((values, i) => (
          <NonoRow row={i} key={i} values={values} />
        ))}
      </tbody>
    </table>
  );
};

NonoMatrix.propTypes = {
  matrix: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired,
};

export default NonoMatrix;
