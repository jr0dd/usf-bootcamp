import React, { useState } from 'react'
import Cell from './Cell'
import './Board.css'

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

const Board = ({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) => {
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  const createBoard = () => {
    // TODO: create array-of-arrays of true/false values
    return Array.from({ length: nrows }).map(
      row => Array.from({ length: ncols }).map(
          col => Math.random() < chanceLightStartsOn
      )
    )
  }

  const [board, setBoard] = useState(createBoard())

  const hasWon = () => {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell))
  }

  const flipCellsAround = (coord) => {
    setBoard(oldBoard => {
      const [y, x] = coord.split('-').map(Number)

      const flipCell = (y, x, newBoard) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          newBoard[y][x] = !newBoard[y][x]
        }
      }

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => [...row])

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard)
      flipCell(y, x-1, newBoard)
      flipCell(y, x+1, newBoard)
      flipCell(y-1, x, newBoard)
      flipCell(y+1, x, newBoard)

      // TODO: return the copy
      return newBoard
    })
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <span>Congrats! You Won!</span>
  }

  // TODO: make table board
  let tBoard = []
  for (let y = 0; y < nrows; y++) {
    const row = []
    for (let x = 0; x < ncols; x++) {
      const coord = `${y}-${x}`
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={evt => flipCellsAround(coord)}
        />
      )
    }
    tBoard.push(<tr key={y}>{row}</tr>)
  }

  // TODO: return table board
  return (
    <table className='Board'>
      <tbody>{tBoard}</tbody>
    </table>
  )
}

export default Board
