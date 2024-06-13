import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Movement, Snake, calculateNextSnake } from './game'

// type Cell = {
//   display: string // snake | apple | X
// }



// type Row = Cell[]



// 5x5 boards
// const initialBoard: Board = [
//   [{ display: "" }, { display: "" }, { display: "" }, { display: "" }, { display: "" },],
//   [{ display: "" }, { display: "" }, { display: "S" }, { display: "" }, { display: "" },],
//   [{ display: "" }, { display: "" }, { display: "" }, { display: "" }, { display: "" },],
//   [{ display: "" }, { display: "" }, { display: "" }, { display: "" }, { display: "" },],
//   [{ display: "" }, { display: "" }, { display: "" }, { display: "" }, { display: "" },],
// ]

type Cell = {
  display: 'S' | 'A' | ''
}

type Board = Cell[]

// const initialBoard: Board = Array(25).fill('')
const initialBoard: Board = ['S', 'S', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',]




// const Row = ({ board, rowIdx }: { board: Board, rowIdx: number }) => {
//   return (
//     <>
//       <div className="flex flex-row bg-green-200 border border-5">
//         {board[rowIdx].map((element, idx) => {
//           return (<Cell board={board} rowIdx={rowIdx} colIdx={idx} />)
//         })}

//       </div>
//     </>
//   )


// }

const Cell = ({ display }: Cell) => {
  return (
    <div className='flex border bg-green-400 border-5 flex-row h-10 w-10'>
      {display}
    </div>

  )
}

const initialSnake: Snake = [0, 1, 2]

const Board = () => {
  const [board, setBoard] = useState(structuredClone(initialBoard))
  const [snake, setSnake] = useState(structuredClone(initialSnake))
  console.log("snake" + snake)


  const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    console.log("new handle key press:", event)

    setSnake(calculateNextSnake(snake, key as Movement))

  }, [setSnake])


  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      console.log(`Key: ${event.key}`)
      handleUserKeyPress(event)
    })
  }, [handleUserKeyPress])


  console.log(board)
  return (
    <div>
      {/* board is an array of cells */}
      {/* map over cells. draw the cells based on contents */}
      {board.map((element, index) => { return <Cell display={element.display} /> })}
      {/* {board.map((element, index) => <Row board={board} rowIdx={index} />)} */}
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
