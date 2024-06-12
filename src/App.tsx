import { useState } from 'react'
import './App.css'

type Cell = {
  display: string // snake | apple | X
}

// type Row = Cell[]

type Board = Cell[][]


// 5x5 boards
const initialBoard: Board = [
  [{ display: "h" }], [{ display: "h" }], [{ display: "" }], [{ display: "" }], [{ display: "" }],
  [{ display: "" }], [{ display: "" }], [{ display: "" }], [{ display: "" }], [{ display: "" }],
  [{ display: "" }], [{ display: "" }], [{ display: "" }], [{ display: "" }], [{ display: "" }],
  [{ display: "" }], [{ display: "" }], [{ display: "" }], [{ display: "" }], [{ display: "" }],
  [{ display: "" }], [{ display: "" }], [{ display: "" }], [{ display: "" }], [{ display: "" }],
]

const Cell = ({ board, rowIdx, colIdx }: { board: Board, rowIdx: number, colIdx: number }) => {
  return (
    <div>
      test
      {/* {board[rowIdx][colIdx]} */}
    </div>


  )

}

const Row = ({ board }: { board: Board }) => {
  return (
    <div>
      This is a row
    </div>
  )
}
const Board = () => {

  const [board, setBoard] = useState(structuredClone(initialBoard))
  console.log(board)
  return (
    <div>
      {board.map(() => <Row board={board} />)}
    </div>
  )

}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      Snake Game here
      <Board />
    </>
  )
}

export default App
