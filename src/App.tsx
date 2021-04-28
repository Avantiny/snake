import './App.css'
import Pendulum from './Pendulum'
import React from 'react'

const App = () => {
  let r1 = 100
  let r2 = 100
  let m1 = 20
  let m2 = 20
  let a1 = 0.01
  let a2 = 0.01
  let x0 = 300
  let y0 = 250
  let a1_v = 0
  let a2_v = 0
  let g = 1

  const draw = async (ctx: any, frameCount: number) => {
    let num1 = -g * (2 * m1 + m2) * Math.sin(a1)
    let num2 = -m2 * g * Math.sin(a1 - 2 * a2)
    let num3 = -2 * Math.sin(a1 - a2) * m2
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2)
    let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2))
    let a1_a = (num1 + num2 + num3 * num4) / den

    num1 = 2 * Math.sin(a1 - a2)
    num2 = a1_v * a1_v * r1 * (m1 + m2)
    num3 = g * (m1 + m2) * Math.cos(a1)
    num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2)
    den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2))
    let a2_a = (num1 * (num2 + num3 + num4)) / den
    let x1 = r1 * Math.sin(a1) + x0
    let y1 = r1 * Math.cos(a1) + y0
    let x2 = x1 + r2 * Math.sin(a2)
    let y2 = y1 + r2 * Math.cos(a2)
    let xc1 = x1 - m1 / 2
    let yc1 = y1 - m1 / 2
    let xc2 = x2 - m2 / 2
    let yc2 = y2 - m2 / 2
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#b62020'
    ctx.beginPath()
    // console.log(frameCount)
    // console.log(a1_a)
    a1 += a1_v
    a2 += a2_v
    a1_v += a1_a
    a2_v += a2_a
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.fillRect(xc1, yc1, m1, m1)
    ctx.lineTo(x2, y2)
    ctx.fillRect(xc2, yc2, m2, m2)
    ctx.stroke()
    ctx.closePath()
    // ctx.beginPath()
    // ctx.moveTo(300, 450)
    // ctx.fillRect(x1 + x2, y1 + y2, 10, 10)
    // ctx.stroke()
  }
  return <Pendulum draw={draw} />
}

export default App
