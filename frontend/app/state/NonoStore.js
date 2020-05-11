/**
 * @summary Data store class for nonograms
 *
 * @file NonoStore.js
 * @author Svetozar Miuchin (svetozar.miuchin@gmail.com)
 */

import Nonogram, { nonogramFromMatrix } from "nonogram";
import EventEmitter from "events";
import dispatcher from "../dispatcher/Dispatcher";

/**
 * Main nonogram store class
 */
class NonoStore extends EventEmitter {
  constructor() {
    super();
    this.nonogram = nonogramFromMatrix([
      [0, 1, 1],
      [1, 0, 1],
      [1, 0, 0],
    ]);
    // XXX: This is here for debugging purposes for now
    // this.nonogram = nonogramFromMatrix([
    //   [0, 1, 1, 1, 1, 1, 1],
    //   [1, 0, 1, 1, 1, 0, 0],
    //   [1, 0, 0, 1, 1, 1, 1],
    //   [0, 0, 1, 1, 0, 0, 1],
    //   [0, 0, 1, 1, 1, 1, 0],
    //   [0, 0, 1, 1, 1, 1, 1],
    //   [0, 0, 1, 0, 1, 0, 1],
    //   [0, 0, 1, 1, 0, 0, 1],
    //   [0, 0, 1, 1, 1, 1, 0],
    // ]);
    this.dragging = false;
    this.dragValue = 0;
  }

  setNonogram(nonogram) {
    this.nonogram = nonogram;
    this.emit("load");
  }

  loadNewNonogram(rows, columns) {
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
  }

  newNonogram(rows, columns, rowHints, colHints) {
    this.setNonogram(new Nonogram(rows, columns, rowHints, colHints));
  }

  getNonogram() {
    return this.nonogram;
  }

  getMatrix() {
    return this.nonogram.matrix;
  }

  getRowHints() {
    return this.nonogram.rowHints;
  }

  getColHints() {
    return this.nonogram.colHints;
  }

  isComplete() {
    return this.nonogram.complete;
  }

  /**
   * Emits the "complete" event if the nonogram is done
   */
  _testCompletion() {
    if (this.isComplete()) {
      this.emit("complete");
    }
  }

  /**
   * Toggles the indicated cell's value.
   * Emits "change" event, and tests for completion.
   *
   * @param {number} row
   * @param {number} column
   */
  toggleCell(row, column) {
    this.nonogram.toggleCell(row, column);
    this.emit("change");
    this._testCompletion();
  }

  toggleCellLock(row, column) {
    this.nonogram.toggleCellLock(row, column);
    this.emit("change");
  }

  /**
   * Toggles the indicated cell's value.
   * Emits "change" event, and tests for completion.
   *
   * @param {number} row
   * @param {number} column
   */
  setCell(row, column, value) {
    this.nonogram.setCellValue(row, column, value);
    // TODO: don't emit change indiscriminately
    this.emit("change");
    this._testCompletion();
  }

  /**
   * Start the dragging action, set appropriate flags and grab the value from
   * cell indicated by row and column params.
   *
   * @param {number} row
   * @param {number} column
   */
  startDrag(row, column) {
    if (this.nonogram.getCellLock(row, column)) {
      // Don't initiate drag action if we start from a locked cell
      return;
    }
    this.nonogram.toggleCell(row, column);
    this.dragging = true;
    this.dragValue = this.nonogram.getCell(row, column);
  }

  /**
   * Fill the indicated cell with the saved value from when we started
   * dragging
   *
   * @param {number} row
   * @param {number} column
   */
  dragOver(row, column) {
    // TODO: assert that we're dragging here.
    this.setCell(row, column, this.dragValue);
  }

  /**
   * Finish the dragging action, reset flags.
   *
   * @param {number} row
   * @param {number} column
   */
  endDrag(row, column) {
    this.dragging = false;
  }

  handleAction(action) {
    switch (action.action) {
      case "TOGGLE_CELL":
        this.toggleCell(action.row, action.column);
        break;
      case "TOGGLE_CELL_LOCK":
        this.toggleCellLock(action.row, action.column);
        break;
      case "START_DRAG":
        this.startDrag(action.row, action.column);
        break;
      case "END_DRAG":
        this.endDrag();
        break;
      case "DRAG_OVER":
        this.dragOver(action.row, action.column);
        break;
      case "COMPLETE":
        this.setComplete();
        break;
      case "LOAD_NEW":
        this.loadNewNonogram(action.rows, action.columns);
    }
  }
}

const nonoStore = new NonoStore();
dispatcher.register(nonoStore.handleAction.bind(nonoStore));

export default nonoStore;
