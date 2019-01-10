import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  render() {
    return <Board ncols={5} nrows={5} />;
  }
}

export default Game;
