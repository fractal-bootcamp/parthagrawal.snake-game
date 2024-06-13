import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Movement, Position, Snake, calculateNextSnake } from './game'


const BOARD_SIZE = 25
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

type Cell = 'S' | 'A' | ''

type Board = Cell[]


type Game = {
  snake: Snake,
  apple: Position,
}

// const initialBoard: Board = Array(25).fill('')
// const initialBoard: Board = [{display: 'S'}, 'S', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
const initialBoard = Array(BOARD_SIZE).fill('')



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

const Cell = ({ value }: { value: string }) => {
  return (
    <div className='flex border bg-green-400 border-5 flex-row h-10 w-10'>
      {value}
    </div>

  )
}


const getPaintedBoard = (game: Game): Board => {
  const { apple, snake } = game
  const paintedBoard = structuredClone(initialBoard)
  snake.forEach((position) => {
    paintedBoard[position] = 'S'
  })
  paintedBoard[apple] = 'A'
  return paintedBoard
}

const initialSnake: Snake = [2, 3, 4]
const initialApple = Math.floor(Math.random() * 25 + 1)

const Board = () => {
  // const [board, setBoard] = useState(structuredClone(initialBoard))
  // const [game, setGame] = useState(structuredClone({ snake: initialSnake, apple: initialApple }))
  const [snake, setSnake] = useState(initialSnake)
  const [apple, setApple] = useState(initialApple)
  const [win, setWin] = useState(false)

  const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    console.log("new handle key press:", event)

    const newSnake = calculateNextSnake(snake, key as Movement)
    if (newSnake != null) {
      // const newGame = { ...game, snake: newSnake }
      // debugger;
      if (newSnake[0] == apple) {
        setWin(true);
      }
      setSnake(newSnake) // new game is correct, but setGame isn't resetting state
      // setCounter(counter + 1)

    }

  }, [setSnake, snake])

  useEffect(() => {
    if (!win) {
      document.addEventListener('keydown', handleUserKeyPress)
      return () => { document.removeEventListener('keydown', handleUserKeyPress) }
    }
  }, [handleUserKeyPress, win])

  useEffect(() => {

    console.log('you win!')

  }, [win])


  const board = getPaintedBoard({ apple, snake })

  console.log("board repainted!:" + board)
  return (
    <div>
      {/* board is an array of cells */}
      {/* map over cells. draw the cells based on contents */}
      <div className="flex flex-row">
        {board.slice(0, 5).map((element) => { return <Cell value={element} /> })}
      </div>
      <div className="flex flex-row">
        {board.slice(5, 10).map((element) => { return <Cell value={element} /> })}
      </div>
      <div className="flex flex-row">
        {board.slice(10, 15).map((element) => { return <Cell value={element} /> })}
      </div>
      <div className="flex flex-row">
        {board.slice(15, 20).map((element) => { return <Cell value={element} /> })}
      </div>
      <div className="flex flex-row">
        {board.slice(20, 25).map((element) => { return <Cell value={element} /> })}
      </div>
      {/* {board.map((element, index) => <Row board={board} rowIdx={index} />)} */}
      <button onClick={() => { setSnake(initialSnake); setApple(initialApple); setWin(false) }}>
        Reset
      </button>
      {win ? <div>You Win!</div> : <></>}
    </div >
  )

}


function App() {

  return (
    <>
      Snake Game here
      <Board />
    </>
  )
}

export default App
