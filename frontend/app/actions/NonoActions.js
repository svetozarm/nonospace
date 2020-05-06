import dispatcher from '../dispatcher/Dispatcher';

export function toggleCell(row, column) {
  dispatcher.dispatch({
    action: 'TOGGLE_CELL',
    row,
    column,
  });
}

export function startDrag(row, column) {
  dispatcher.dispatch({
    action: 'START_DRAG',
    row,
    column,
  });
}

export function endDrag() {
  dispatcher.dispatch({
    action: 'END_DRAG',
  });
}

export function dragOver(row, column) {
  dispatcher.dispatch({
    action: 'DRAG_OVER',
    row,
    column,
  });
}

export function setComplete() {
  dispatcher.dispatch({
    action: 'COMPLETE',
  });
}
