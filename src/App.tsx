import './App.css'
import Pendulum from './Pendulum'
import React from 'react'

const App = () => {
  let r1 = 100
  let r2 = 100
  let m1 = 20
  let m2 = 20
  let a1 = 1
  let a2 = 1
  let x0 = 300
  let y0 = 0
  let x1 = r1 * Math.sin(a1)
  let y1 = r1 * Math.cos(a1)
  let x2 = r2 * Math.sin(a2)
  let y2 = r2 * Math.cos(a2)
  let xc1 = x1 - m1 / 2
  let yc1 = y1 - m1 / 2
  let xc2 = x1 + x2 - m2 / 2
  let yc2 = y1 + y2 - m2 / 2

  const draw = (ctx: any, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#b62020'
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.fillRect(xc1, yc1, m1, m1)
    ctx.lineTo(x1 + x2, y1 + y2)
    ctx.fillRect(xc2, yc2, m2, m2)
    //ctx.ellipse(x1, y1, m1, m1)
    ctx.stroke()
  }
  return <Pendulum draw={draw} />
}

export default App
