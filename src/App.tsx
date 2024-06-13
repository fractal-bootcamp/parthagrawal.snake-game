import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Movement, Position, Snake, calculateNextSnake } from './game'


/**
 * TODO: 
 * Add collision detection
 * need to add protection against head "turning back in on itself"
 * Remove restart button when the game isn't visible. or make it work 
 *  even if the game hasn't been won
 * Ensure apple does not spawn where the snake is
 * Randomize snake spawn point
 * 
 */

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
  moveDirection: Movement
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
    <div className='flex  bg-lime-300  flex-row h-10 w-10'>
      {value}
    </div>

  )
}


const getPaintedBoard = (game: Game): Board => {
  const { apple, snake, moveDirection } = game
  const paintedBoard = structuredClone(initialBoard)
  const head = snake[0]
  const moveDirectionToArrow: Record<Movement, '^' | 'v' | '>' | '<'> = {
    "ArrowDown": 'v',
    "ArrowUp": '^',
    "ArrowLeft": '<',
    "ArrowRight": ">"
  }
  paintedBoard[head] = moveDirectionToArrow[moveDirection]
  const body = snake.slice(1)
  body.forEach((position) => {
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
  const [moveDirection, setMoveDirection] = useState<Movement>('ArrowDown')
  const [step, setStep] = useState(0)

  const moveSnakeContinuously = () => {
    // debugger;
    const newSnake = calculateNextSnake(snake, moveDirection)
    if (newSnake != null) {
      // const newGame = { ...game, snake: newSnake }
      // debugger;
      if (newSnake[0] == apple) {
        setWin(true);
      }
      setSnake(newSnake) // new game is correct, but setGame isn't resetting state
      // setCounter(counter + 1)

    }
  }

  // move the snake continuously per setInterval.
  // keypress sets the new direction
  useEffect(() => {
    moveSnakeContinuously()
    setTimeout(() => setStep(step + 1), 2000);
    // return clearInterval(id)
  }, [step])


  // remove callback function 

  const handleUserKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
    console.log("new handle key press:", event)
    setMoveDirection(key as Movement)

  }

  // registers user keypress, if the game is still going
  useEffect(() => {
    if (!win) {
      document.addEventListener('keydown', handleUserKeyPress)
      return () => { document.removeEventListener('keydown', handleUserKeyPress) }
    }
    if (win) console.log('you win!')
  }, [handleUserKeyPress, win])

  const board = getPaintedBoard({ apple, snake, moveDirection })

  console.log("board repainted!:" + board)
  return (
    <div>
      {/* board is an array of cells */}
      {/* map over cells. draw the cells based on contents */}
      <div className="flex flex-row m-1 gap-1">
        {board.slice(0, 5).map((element, idx) => { return <Cell key={idx} value={element} /> })}
      </div>
      <div className="flex flex-row m-1 gap-1">
        {board.slice(5, 10).map((element, idx) => { return <Cell key={idx} value={element} /> })}
      </div>
      <div className="flex flex-row m-1 gap-1">
        {board.slice(10, 15).map((element, idx) => { return <Cell key={idx} value={element} /> })}
      </div>
      <div className="flex flex-row m-1 gap-1">
        {board.slice(15, 20).map((element, idx) => { return <Cell key={idx} value={element} /> })}
      </div>
      <div className="flex flex-row m-1 gap-1">
        {board.slice(20, 25).map((element, idx) => { return <Cell key={idx} value={element} /> })}
      </div>
      <div className='flex border-2 border-red-300'>
      </div>
      <button onClick={() => { setSnake(initialSnake); setApple(initialApple); setWin(false) }}>
        Reset
      </button>
      {win ? <div>You Win!</div> : <div>no win</div>}
    </div >
  )

}


function App() {

  return (
    <>
      <header className="text-xl font-bold">Snake Game</header>
      <div className="flex items-center h-lvh">
        <Board />

      </div>

    </>
  )
}

export default App
