
type Cell = 'S' | 'A' | ''

// a number between 0 and 24
type Position = number

type Snake = Position[] // first cell in the array is the position of its head

type Movement = 'up' | 'down' | 'left' | 'right'

type Board = Cell[]

const initialBoard: Board = Array(25).fill('')

// given a moveDown command calculate the nextMove
// if moveDown returns null, the move was impossible (crashed into a wall)
function moveDown(position: Position): Position | null {
    if (position >= 20) return null
    return position + 5
}

function calculateNextSnake(snake: Snake, movement: Movement) {
    //1. add a new head
    // this is stupid, do a normal if statement
    const newHeadPosition: Position | null = movement == 'down' ? moveDown(snake[0]) : snake[0]
    //2. remove the old tail
    const withoutTail = snake.slice(0, -1)
    return [newHeadPosition, ...withoutTail]
}

// useState timer
// state hook calls calculateNextSnake()

// game.ts is a purely functional file

// swap to the next line every five cells
// 