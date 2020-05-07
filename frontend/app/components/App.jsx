/**
 * @summary UI entry point
 *
 * @file App.jsx
 * @author Svetozar Miuchin (svetozar.miuchin@gmail.com)
 */
import React, { Component } from 'react';
import NonogramContainer from './NonogramContainer';
import nonoStore from '../state/NonoStore';
import RandomButton from './RandomButton';

/**
 * Main App class
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
    };
  }

  /**
   * Subscribes to the "complete" event from the store, to update the UI if the
   * game is complete
   */
  componentDidMount() {
    nonoStore.on('complete', () => {
      this.setState({
        complete: true,
      });
    });
    fetch("/api/nonogram/random")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        nonoStore.newNonogram(resp.rows, resp.columns, resp.rowHints, resp.colHints);
      });
  }

  render() {
    const { complete } = this.state;
    return (
      <div>
        { complete ? <h1>Huzzah!</h1> : <h1>Welcome to nono</h1>}
        <NonogramContainer />
        <RandomButton />
      </div>
    );
  }
}


export default App;
