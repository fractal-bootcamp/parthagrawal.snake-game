import { ReactNode, useEffect, useState } from 'react'
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
//       <div className="flex flex-row bg-red-200 border border-5">
//         {board[rowIdx].map((element, idx) => {
//           return (<Cell board={board} rowIdx={rowIdx} colIdx={idx} />)
//         })}

//       </div>
//     </>
//   )


// }



const getPaintedBoard = (game: Game): Board => {
  const { apple, snake, moveDirection } = game
  const paintedBoard = structuredClone(initialBoard)
  const head = snake[0]
  const moveDirectionToArrow: Record<Movement, '👆' | '👇' | '👉' | '👈'> = {
    "ArrowDown": '👇',
    "ArrowUp": '👆',
    "ArrowLeft": '👈',
    "ArrowRight": "👉"
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

type WinState = 'WIN' | 'LOSE' | null
const Board = () => {
  // const [board, setBoard] = useState(structuredClone(initialBoard))
  // const [game, setGame] = useState(structuredClone({ snake: initialSnake, apple: initialApple }))
  const [snake, setSnake] = useState(initialSnake)
  const [apple, setApple] = useState(initialApple)
  const [win, setWin] = useState<WinState>(null)
  const [moveDirection, setMoveDirection] = useState<Movement>('ArrowDown')
  const [step, setStep] = useState(0)

  const moveSnakeContinuously = () => {
    // debugger;
    const newSnake = calculateNextSnake(snake, moveDirection)
    if (newSnake == null) {
      setWin('LOSE')

    }
    if (newSnake != null) {
      // const newGame = { ...game, snake: newSnake }
      // debugger;
      if (newSnake[0] == apple) {
        setWin('WIN');
      }
      setSnake(newSnake) // new game is correct, but setGame isn't resetting state
      // setCounter(counter + 1)

    }
  }

  // move the snake continuously per setInterval.
  // keypress sets the new direction
  useEffect(() => {
    if (win === null) moveSnakeContinuously()
    setTimeout(() => setStep(step + 1), 1000);
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
    if (win === null) {
      document.addEventListener('keydown', handleUserKeyPress)
      return () => { document.removeEventListener('keydown', handleUserKeyPress) }
    }
    if (win === null) console.log('you win!')
  }, [handleUserKeyPress, win])

  const board = getPaintedBoard({ apple, snake, moveDirection })

  console.log("board repainted!:" + board)
  return (
    <div>
      <div className='border-2 border-red-300'>
        {/* board is an array of cells */}
        {/* map over cells. draw the cells based on contents */}
        <div className="flex flex-row m-1 gap-1">
          {board.slice(0, 5).map((element, idx) => { return <Cell key={idx} value={element} snake={snake} /> })}
        </div>
        <div className="flex flex-row m-1 gap-1">
          {board.slice(5, 10).map((element, idx) => { return <Cell key={idx} value={element} snake={snake} /> })}
        </div>
        <div className="flex flex-row m-1 gap-1">
          {board.slice(10, 15).map((element, idx) => { return <Cell key={idx} value={element} snake={snake} /> })}
        </div>
        <div className="flex flex-row m-1 gap-1">
          {board.slice(15, 20).map((element, idx) => { return <Cell key={idx} value={element} snake={snake} /> })}
        </div>
        <div className="flex flex-row m-1 gap-1">
          {board.slice(20, 25).map((element, idx) => { return <Cell key={idx} value={element} snake={snake} /> })}
        </div>
      </div>
      <button onClick={() => { setSnake(initialSnake); setApple(initialApple); setWin(null) }}>
        Reset
      </button>
      <WinLabel win={win} />

    </div >
  )

}

const WinLabel = ({ win }: { win: WinState }) => {
  if (win === 'WIN') {
    return (<div className='bg-green-300'>You Win!</div>)
  }
  else if (win === 'LOSE') {
    return (<div className='bg-red-300'>You Lose!</div>)
  }
  else {
    return (<div>keep playing...</div>)
  }
}

const Cell = ({ value, snake }: { value: string, snake: Snake }) => {
  return (
    <div className='flex bg-lime-300 text-4xl h-10 w-10'>
      {/* {value} */}
      {checkRenderedImage(value, snake)}

    </div>

  )
}

function checkRenderedImage(value: string, snake: Snake): ReactNode {
  if (value === 'A') {
    return <img src="god2.jpg" />
  }
  else if (value === 'S') {
    if (snake.length)
      return <img src="laurel.png" />
  }
  return (value)

}


function App() {

  return (
    <>
      <div className="flex flex-col justify-center gap-10 h-lvh">
        <header className="text-xl font-bold">Touch God</header>

        <Board />

      </div>

    </>
  )
}

export default App
