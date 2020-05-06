/**
 * @summary UI Elements for displaying the nonogram hints
 *
 * @file NonoHints.jsx
 * @author Svetozar Miuchin (svetozar.miuchin@gmail.com)
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes validator for hint values passed into components
 */
const hintValidator = PropTypes.shape({
  number: PropTypes.number.isRequired,
  satisfied: PropTypes.bool.isRequired,
});

function HintNumber(props) {
  const { hint } = props;
  const { number } = hint;

  if (number) {
    return <td className="hintNumber" align="center">{number}</td>;
  }
  return <td align="center" className="hintNumber" />;
}

HintNumber.propTypes = {
  hint: hintValidator.isRequired,
};

/**
 * Component to display a single row of hints
 * 
 * @param {Array<hintValidator>} props 
 */
function NonoRowHint(props) {
  const { hints } = props;
  return (
    <tr>
      {hints.map((hint, i) => <HintNumber hint={hint} key={i} type="row" />)}
    </tr>
  );
}

NonoRowHint.propTypes = {
  hints: PropTypes.arrayOf(hintValidator).isRequired,
};

/**
 * Component to display all hint rows
 * 
 * @param {Array<Array<hintValidator>>} props 
 */
export function NonoRowHints(props) {
  const { rowHints } = props;
  const maxRowLength = Math.max(...rowHints.map((row) => row.length));

  const paddings = rowHints.map(
    (row) => (
      (row.length < maxRowLength)
        ? Array(maxRowLength - row.length).fill({ number: 0, satisfied: false }) : []),
  );

  const padded = rowHints.map((row, i) => [...paddings[i], ...row]);

  return (
    <table>
      <tbody>
        {padded.map((obj, i) => <NonoRowHint row={i} key={i} hints={obj} />)}
      </tbody>
    </table>
  );
}

NonoRowHints.propTypes = {
  rowHints: PropTypes.arrayOf(
    PropTypes.arrayOf(hintValidator).isRequired,
  ).isRequired,
};

/**
 * Component to display a single column of hints
 * 
 * @param {Array<hintValidator>} props 
 */
function NonoColHint(props) {
  const { hints } = props;
  return (
    <td>
      <table>
        <tbody>
          {hints.map((hint, i) => <HintNumber hint={hint} satisfied={hint} key={i} type="col" />)}
        </tbody>
      </table>
    </td>
  );
}

NonoColHint.propTypes = {
  hints: PropTypes.arrayOf(hintValidator).isRequired,
};

/**
 * Component to display all hint columns
 * 
 * @param {Array<Array<hintValidator>>} props 
 */
export function NonoColHints(props) {
  const { colHints } = props;
  const maxColLength = Math.max(...colHints.map((col) => col.length));

  const paddings = colHints.map(
    (col) => ((col.length < maxColLength)
      ? Array(maxColLength - col.length).fill({ number: 0, satisfied: false }) : []),
  );

  const padded = colHints.map((col, i) => [...paddings[i], ...col]);

  const rowOrder = [];
  for (let i = 0; i < maxColLength; i += 1) {
    rowOrder.push(padded.map((col) => col[i]));
  }

  return (
    <table>
      <tbody>
        {rowOrder.map((obj, i) => <NonoRowHint col={i} key={i} hints={obj} />)}
      </tbody>
    </table>
  );
}

NonoColHints.propTypes = {
  colHints: PropTypes.arrayOf(
    PropTypes.arrayOf(hintValidator).isRequired,
  ).isRequired,
};
