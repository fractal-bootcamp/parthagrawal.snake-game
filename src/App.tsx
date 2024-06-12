import { useState } from 'react'
import './App.css'

type Cell = {
  display: string // snake | apple | X
}

// type Row = Cell[]

type Board = Cell[][]


// 5x5 boards
const initialBoard: Board = [
  [{ display: "h" }, { display: "h" }, { display: "h" }, { display: "h" }, { display: "h" },],
  [{ display: "h" }, { display: "h" }, { display: "h" }, { display: "h" }, { display: "h" },],
  [{ display: "h" }, { display: "h" }, { display: "h" }, { display: "h" }, { display: "h" },],
  [{ display: "h" }, { display: "h" }, { display: "h" }, { display: "h" }, { display: "h" },],
  [{ display: "h" }, { display: "h" }, { display: "h" }, { display: "h" }, { display: "h" },],
]
const Cell = ({ board, rowIdx, colIdx }: { board: Board, rowIdx: number, colIdx: number }) => {
  return (
    <div className='flex border border-5 flex-row h-10 w-10'>
      {board[rowIdx][colIdx].display}
    </div>


  )

}

const Row = ({ board, rowIdx }: { board: Board, rowIdx: number }) => {
  return (
    <>
      <div className="flex flex-row bg-green-200 border border-5">
        {board[rowIdx].map((element, idx) => {
          return (<Cell board={board} rowIdx={rowIdx} colIdx={idx} />)
        })}

      </div>
    </>
  )


}
const Board = () => {

  const [board, setBoard] = useState(structuredClone(initialBoard))
  console.log(board)
  return (
    <div>
      {board.map((element, index) => <Row board={board} rowIdx={index} />)}
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
