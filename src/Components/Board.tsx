import { useState, useEffect, useRef, KeyboardEvent, useCallback } from 'react'
import Empty from '../Assets/empty.png'
import Snake from '../Assets/snake.png'
import Food from '../Assets/food.png'
import styled from 'styled-components'
import ShowBoard from './ShowBoard'

const width = 10
const height = 10

const Div_Custom = styled.div`
  background-color: black;
  display: grid;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
  align-items: center;
  align-content: center;
  overflow: hidden;
  margin: 0;
  padding: 0;
`

type Field = {
  x: number
  y: number
}

type Direction = 'left' | 'right' | 'up' | 'down'

const defaultDirection = 'right' as Direction

const initSnake = [
  { x: 4, y: 4 },
  { x: 5, y: 4 },
]

const initFood = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) }

const initialBoard = Array.from(Array(10), () => Array(10).fill('empty')) as string[][]

const randomPosition = (snake: Field[]) => {
  const generatePosition = () => {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    }
  }

  let position = generatePosition()
  snake.map(sn => {
    if (sn.x === position.x && sn.y === position.y) {
      position = randomPosition(snake)
    }
  })
  return position
}

const evaluatePosition = (position: string) => {
  switch (position) {
    case 'empty':
      return Empty
    case 'snake':
      return Snake
    case 'food':
      return Food
    default:
      return Empty
  }
}
const Board = () => {
  const [board, setBoard] = useState(initialBoard)
  const [snake, setSnake] = useState(initSnake)
  const [food, setFood] = useState(initFood)
  const [direction, setDirection] = useState(defaultDirection)

  const changeDirection = useCallback(
    e => {
      const { key } = e
      console.log(key)
      switch (key) {
        case 'ArrowLeft':
          if (direction !== 'right') setDirection('left')
          break
        case 'ArrowUp':
          if (direction !== 'down') setDirection('up')
          break
        case 'ArrowRight':
          if (direction !== 'left') setDirection('right')
          break
        case 'ArrowDown':
          if (direction !== 'up') setDirection('down')
          break
        default:
          break
      }
    },
    [direction]
  )

  useEffect(() => {
    window.addEventListener('keydown', changeDirection)
    return () => {
      window.removeEventListener('keydown', changeDirection)
    }
  }, [changeDirection])

  const useInterval = (callback: any, delay: any) => {
    const savedCallback = useRef()

    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    useEffect(() => {
      const tick = () => {
        //@ts-ignore
        savedCallback.current()
      }
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }, [delay])
  }

  const moveSnake = () => {
    //@ts-ignore
    const newSnake = [] as Field[]

    switch (direction) {
      case 'right':
        newSnake.push({ x: snake[0].x, y: (snake[0].y + 1) % 10 })
        break
      case 'left':
        newSnake.push({ x: snake[0].x, y: (snake[0].y - 1 + 10) % 10 })
        break
      case 'up':
        newSnake.push({ x: (snake[0].x - 1 + 10) % 10, y: snake[0].y })
        break
      case 'down':
        newSnake.push({ x: (snake[0].x + 1) % 10, y: snake[0].y })
        break
    }

    if (snake.length !== 1) {
      snake.forEach(cell => {
        newSnake.push(cell)
      })
    }

    if (newSnake[0].x === food.x && newSnake[0].y === food.y) setFood(randomPosition(snake))
    else {
      newSnake.pop()
    }

    let shouldRestart = false

    newSnake.slice(1).map(ns => {
      if (ns.x === newSnake[0].x && ns.y === newSnake[0].y && newSnake.length > 4)
        shouldRestart = true
    })

    shouldRestart ? setSnake(initSnake) : setSnake(newSnake)

    setBoard(handleNotEmpty(board, newSnake, food))
  }

  useInterval(moveSnake, 200)

  const handleNotEmpty = (board: string[][], snake: Field[], food: Field) => {
    const res = board.map((row, rowIndex) =>
      row.map((pos, posIndex) => {
        let shouldBeEmpty = false
        snake.map(pix => {
          if (pix.x === rowIndex && pix.y === posIndex) {
            row[posIndex] = 'snake'
            shouldBeEmpty = true
          }
        })
        if (food.x === rowIndex && food.y === posIndex) {
          row[posIndex] = 'food'
          shouldBeEmpty = true
        }
        if (!shouldBeEmpty) row[posIndex] = 'empty'
        return pos
      })
    )
    return res
  }

  return (
    <Div_Custom>
      <ShowBoard board={handleNotEmpty(board, snake, food)} evaluatePosition={evaluatePosition} />
    </Div_Custom>
  )
}

export default Board
