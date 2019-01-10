import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';
import { randomBytes } from 'crypto';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  constructor(props) {
    super(props);
    // this.createBoard = this.createBoard.bind(this);
    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for (let x = 0; x < this.props.nrows; x++) {
      let row = [];
      board.push(row);
      for (let y = 0; y < this.props.ncols; y++) {
        row.push([true, false][Math.floor(Math.random() * 2)]);
      }
    }
    // TODO: create array-of-arrays of true/false values
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAroundMe = coord => {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(num => +num);
    console.log(this.state.board[x][y]);
    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);

    this.setState({ board });

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    if (this.state.hasWon) {
      this.setState({ board: this.createBoard(), hasWon: false });
    }
  };

  /** Render game board or winning message. */

  render() {
    console.log(this.state.board);
    return (
      <div>
        <table>
          {this.state.board.map((row, x) => (
            <tr>
              {row.map((col, y) => (
                <Cell
                  isLit={this.state.board[x][y]}
                  value={x + '-' + y}
                  flipCellsAroundMe={this.flipCellsAroundMe}
                />
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
    // if the game is won, just show a winning msg & render nothing else
    // if this.hasWon
    // TODO

    // make table board
    // insert all cells
  }
}
export default Board;
