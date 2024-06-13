
type Cell = 'S' | 'A' | ''

// a number between 0 and 24
export type Position = number

export type Snake = Position[] // first cell in the array is the position of its head

export type Movement = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

export type Board = Cell[]

const initialBoard: Board = Array(25).fill('')

// given a moveDown command calculate the nextMove
// if moveDown returns null, the move was impossible (crashed into a wall)
function moveDown(position: Position): Position | null {
    if (position >= 20) return null
    return position + 5
}
function moveUp(position: Position): Position | null {
    if (position <= 5) return null
    return position - 5
}
function moveRight(position: Position): Position | null {
    if ((position + 1) % 5 == 0) return null;
    return position + 1
}
function moveLeft(position: Position): Position | null {
    if (position % 5 == 0) return null;
    return position - 1
}


export function calculateNextSnake(snake: Snake, movement: Movement) {
    let newHeadPosition: Position | null = null;

    //1. add a new head
    if (movement == 'ArrowDown') {
        newHeadPosition = moveDown(snake[0])
    }
    else if (movement == 'ArrowUp') {
        newHeadPosition = moveUp(snake[0])
    }
    else if (movement == 'ArrowRight') {
        newHeadPosition = moveRight(snake[0])
    }
    else if (movement == 'ArrowLeft') {
        newHeadPosition = moveLeft(snake[0])
    }

    //2. remove the old tail
    const withoutTail = snake.slice(0, -1)
    return [newHeadPosition, ...withoutTail]
}

// useState timer
// state hook calls calculateNextSnake()

// game.ts is a purely functional file

// swap to the next line every five cells
// 