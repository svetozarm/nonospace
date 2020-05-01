/**
 * @summary UI Elements for displaying the nonogram container
 *
 * @file NonoContainer.jsx
 * @author Svetozar Miuchin (svetozar.miuchin@gmail.com)
 */
import React, { Component } from 'react';
import nonoStore from '../state/NonoStore';
import { NonoRowHints, NonoColHints } from './NonoHints';
import NonoMatrix from './NonoMatrix';

/**
 * Component that renders the entire nonogram UI
 */
class NonogramContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: nonoStore.getMatrix(),
      rowHints: nonoStore.getRowHints(),
      colHints: nonoStore.getColHints(),
    };
  }

  /**
   * Subscribes to "change" events from the store
   */
  componentDidMount() {
    nonoStore.on('change', () => {
      this.setState({
        matrix: nonoStore.getMatrix(),
      });
    });
  }

  render() {
    const { colHints, rowHints, matrix } = this.state;
    return (
      <table>
        <tbody>
          <tr>
            <td />
            <td>
              <NonoColHints colHints={colHints} />
            </td>
          </tr>
          <tr>
            <td>
              <NonoRowHints rowHints={rowHints} />
            </td>
            <td>
              <NonoMatrix matrix={matrix} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default NonogramContainer;
