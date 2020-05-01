/**
 * @summary UI entry point
 *
 * @file App.jsx
 * @author Svetozar Miuchin (svetozar.miuchin@gmail.com)
 */
import React, { Component } from 'react';
import NonogramContainer from './NonogramContainer';
import nonoStore from '../state/NonoStore';

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
  }

  render() {
    const { complete } = this.state;
    return (
      <div>
        { complete ? <h1>Huzzah!</h1> : <h1>Welcome to nono</h1>}
        <NonogramContainer />
      </div>
    );
  }
}


export default App;
