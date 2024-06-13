

// a number between 0 and 24
export type Position = number

export type Snake = Position[] // first cell in the array is the position of its head

export type Movement = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'



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

    //1. add a new head
    function calculateMove(movement: Movement) {

        if (movement == 'ArrowDown') {
            return moveDown(snake[0])
        }
        else if (movement == 'ArrowUp') {
            return moveUp(snake[0])
        }
        else if (movement == 'ArrowRight') {
            return moveRight(snake[0])
        }
        else if (movement == 'ArrowLeft') {
            return moveLeft(snake[0])
        }
        else {
            return null;
        }
    }
    const newMove = calculateMove(movement)
    if (newMove === null) return null

    //2. remove the old tail
    const withoutTail = snake.slice(0, -1)
    return [newMove, ...withoutTail]
}

// useState timer
// state hook calls calculateNextSnake()

// game.ts is a purely functional file

// swap to the next line every five cells
// 