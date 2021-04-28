import './App.css'
import Pendulum from './Pendulum'
import React from 'react'

function App() {
  const draw = (ctx: any, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#b62020'
    ctx.beginPath()
    ctx.arc(50, 100, 20 * Math.abs(Math.sin(frameCount * 0.05)), 0, 2 * Math.PI)
    ctx.fill()
  }
  return <Pendulum draw={draw} />
}

export default App
