/**
 * @summary Main nonogram class
 *
 * @file Nonogram.js
 * @author Svetozar Miuchin(svetozar.miuchin@gmail.com)
 */

/**
 * 
 * Helper function to toggle a single value.
 * If input is 0, returns 1, and vice-versa.
 *
 * Contains no value checks!
 * 
 * @param {number} value The value to toggle.
 */
const toggleValue = (value) => (value === 0 ? 1 : 0);

/**
 * Compares two sets of hints. They can either be row or column hints.
 * Used by the {@link Nonogram} class
 * 
 * @param {Array<number>} solutionHints 
 * @param {Array<number>} currentHints 
 */
const compareHints = (solutionHints, currentHints) => {
  for (let set = 0; set < solutionHints.length; set += 1) {
    if (solutionHints[set].length !== currentHints[set].length) {
      return false;
    }
    for (let i = 0; i < solutionHints[set].length; i += 1) {
      if (solutionHints[set][i].number !== currentHints[set][i].number) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Extracts hints from the given array.
 *
 * @param {Array} arr The array of values
 * @return {Array} Array of nonogram hints for the input
 */
function extractArrayHints(arr) {
  let streak = 0;
  const retval = [];
  const endStreak = () => {
    if (streak > 0) {
      retval.push(streak); streak = 0;
    }
  };

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === 1) {
      streak += 1;
    } else {
      endStreak();
    }
  }
  endStreak();

  if (retval.length === 0) {
    retval.push(0);
  }
  return retval;
}

/**
 * Helper generator function to create a {@link Nonogram} object from the given
 * 2D matrix of 0/1 values.
 *
 * @public
 * @param {Array} mat A 2D array describing the puzzle
 * @return {Nonogram} The nonogram object
 */
export function nonogramFromMatrix(mat) {
  const rows = mat.length;
  const cols = mat[0].length;
  const rowHints = [];
  const colHints = [];

  for (let i = 0; i < rows; i += 1) {
    const rowHint = extractArrayHints(mat[i]).map(
      (n) => ({ number: n, satisfied: false }),
    );
    rowHints.push(rowHint);
  }
  for (let i = 0; i < cols; i += 1) {
    const column = [];
    for (let j = 0; j < rows; j += 1) {
      column.push(mat[j][i]);
    }
    const colHint = extractArrayHints(column).map(
      (n) => ({ number: n, satisfied: false }),
    );
    colHints.push(colHint);
  }
  return new Nonogram(rows, cols, rowHints, colHints);
}

/**
 * Representation of a nonogram puzzle
 *
 * @class
 */
class Nonogram {
  /**
   * Creates a puzzle given dimensions and hints.
   *
   * @public
   * @constructor
   * @param {int} rows Number of rows
   * @param {int} columns Number of columns
   * @param {Array} rowHints Array of arrays of row hints. External array
   * contains hints for rows, and each internal array contains specific hint
   * for that row.
   * @param {Array} colHints Same as {@link rowHints}, but for columns.
   */
  constructor(rows, columns, rowHints, colHints) {
    const matrix = (r, c) => [...Array(r)].map(() => Array(c).fill(0));
    this.rows = rows;
    this.columns = columns;
    this.matrix = matrix(rows, columns);
    this.rowHints = rowHints;
    this.colHints = colHints;
    this.totalCells = this.getTotalCells();

    this.currentCells = 0;
  }

  /**
   * Calculates the total number of populated cells in the puzzle from the
   * hints.
   *
   * @public
   * @return {int} Number of cells that are non-empty in this nonogram
   */
  getTotalCells() {
    const totalFromHints = (hints) => hints.map(
      (arr) => arr.reduce((acc, val) => (acc + val.number), 0),
    ).reduce(
      (acc, val) => (acc + val),
    );

    const rowTotal = totalFromHints(this.rowHints);

    // Do the same over columns, to double check that the numbers add up.
    // This is a fixed cost per game, so it doesn't matter.
    const columnTotal = totalFromHints(this.colHints);

    // TODO: make this an assert
    if (rowTotal !== columnTotal) {
      window.alert('Numbers not adding up!');
    }

    return rowTotal;
  }

  /**
   * Toggles a single cell
   *
   * @public
   * @param {int} row
   * @param {int} column
   */
  toggleCell(row, column) {
    const newValue = toggleValue(this.getCell(row, column));
    this.setCell(row, column, newValue);
  }

  /**
   * Checks whether the puzzle is complete.
   * Modifies the complete field.
   *
   * @public
   */
  checkComplete() {
    if (this.currentCells === this.totalCells) {
      const tempNono = nonogramFromMatrix(this.matrix);
      if (compareHints(this.rowHints, tempNono.rowHints)
                && compareHints(this.colHints, tempNono.colHints)) {
        this.complete = true;
      }
    }
  }

  /**
   * Sets the cell to the given value.
   * Also updates the count of filled cells, and calls completion check.
   *
   * @public
   * @param {int} row
   * @param {int} column
   * @param {int} value Can be 0 or 1, for now
   */
  setCell(row, column, value) {
    if (this.complete) {
      return;
    }
    if (this.matrix[row][column] !== value) {
      this.currentCells += (value === 1 ? 1 : -1);
    }
    this.matrix[row][column] = value;
    this.checkComplete();
  }

  /**
   * Gets the cell value.
   *
   * @public
   * @param {int} row
   * @param {int} column
   * @return {int} Value of the cell at {@link row}, {@link column}
   */
  getCell(row, column) {
    return this.matrix[row][column];
  }
}

export default Nonogram;
