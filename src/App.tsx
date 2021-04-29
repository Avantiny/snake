import './App.css'
import Pendulum from './Pendulum'
import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: #534d56;
  color: #f8f1ff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: 10px;
`

const ButtonPlus = styled.button`
  height: 20px;
  display: flex;
  flex-direction: row;
  font-size: 10px;
  background-color: green;
`
const ButtonMinus = styled.button`
  height: 20px;
  display: flex;
  flex-direction: row;
  font-size: 10px;
  background-color: red;
`

const App = () => {
  const [r1, setr1] = useState(100)
  const [r2, setr2] = useState(100)
  const [m1, setm1] = useState(20)
  const [m2, setm2] = useState(20)
  const [as1, setas1] = useState(2.5)
  const [as2, setas2] = useState(-2)
  const x0 = 300
  const y0 = 250
  const fps = 60
  let a1 = as1
  let a2 = as2
  let a1_v = 0
  let a2_v = 0
  let g = 9.81 / fps
  let num1: number, num2: number, num3: number, num4: number, den: number
  let a1_a = 0
  let num01: number, num02: number, num03: number, num04: number, den0: number
  let a2_a = 0
  let x1 = r1 * Math.sin(a1) + x0
  let y1 = r1 * Math.cos(a1) + y0
  let x2 = x1 + r2 * Math.sin(a2)
  let y2 = y1 + r2 * Math.cos(a2)
  let xc1 = x1 - m1 / 2
  let yc1 = y1 - m1 / 2
  let xc2 = x2 - m2 / 2
  let yc2 = y2 - m2 / 2

  const draw = (ctx: any) => {
    num1 = -g * (2 * m1 + m2) * Math.sin(a1)
    num2 = -m2 * g * Math.sin(a1 - 2 * a2)
    num3 = -2 * Math.sin(a1 - a2) * m2
    num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2)
    den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2))
    a1_a = (num1 + num2 + num3 * num4) / den
    num01 = 2 * Math.sin(a1 - a2)
    num02 = a1_v * a1_v * r1 * (m1 + m2)
    num03 = g * (m1 + m2) * Math.cos(a1)
    num04 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2)
    den0 = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2))
    a2_a = (num01 * (num02 + num03 + num04)) / den0
    x1 = r1 * Math.sin(a1) + x0
    y1 = r1 * Math.cos(a1) + y0
    x2 = x1 + r2 * Math.sin(a2)
    y2 = y1 + r2 * Math.cos(a2)
    xc1 = x1 - m1 / 2
    yc1 = y1 - m1 / 2
    xc2 = x2 - m2 / 2
    yc2 = y2 - m2 / 2

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#b62020'
    ctx.beginPath()

    a1_v += a1_a
    a2_v += a2_a
    a1 += a1_v
    a2 += a2_v

    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.fillRect(xc1, yc1, m1, m1)
    ctx.lineTo(x2, y2)
    ctx.fillRect(xc2, yc2, m2, m2)
    ctx.lineTo(x2 - 1, y2 - 1)
    ctx.lineTo(x2, y2)
    ctx.strokeText(`x1: ${(x1 - x0).toFixed(0)}`, 10, 10)
    ctx.strokeText(`y1: ${(-y1 + y0).toFixed(0)}`, 10, 20)
    ctx.strokeText(`x2: ${(x2 - x0).toFixed(0)}`, 10, 30)
    ctx.strokeText(`y2: ${(-y2 + y0).toFixed(0)}`, 10, 40)
    ctx.stroke()
  }

  return (
    <Wrapper>
      <h1>Double pendulum</h1>
      <RowWrapper>
        <RowWrapper>
          <RowWrapper>
            <ButtonMinus onClick={() => setr1(r1 - 10)}>-10</ButtonMinus>
            <p>r1: {r1}m</p>
            <ButtonPlus onClick={() => setr1(r1 + 10)}>+10</ButtonPlus>
          </RowWrapper>
          <RowWrapper>
            <ButtonMinus onClick={() => setr2(r2 - 10)}>-10</ButtonMinus>
            <p>r2: {r2}m</p>
            <ButtonPlus onClick={() => setr2(r2 + 10)}>+10</ButtonPlus>
          </RowWrapper>
        </RowWrapper>
        <RowWrapper>
          <RowWrapper>
            <ButtonMinus onClick={() => setm1(m1 - 10)}>-10</ButtonMinus>
            <p>m1: {m1}kg</p>
            <ButtonPlus onClick={() => setm1(m1 + 10)}>+10</ButtonPlus>
          </RowWrapper>
          <RowWrapper>
            <ButtonMinus onClick={() => setm2(m2 - 10)}>-10</ButtonMinus>
            <p>m2: {m2}kg</p>
            <ButtonPlus onClick={() => setm2(m2 + 10)}>+10</ButtonPlus>
          </RowWrapper>
          <RowWrapper>
            <ButtonMinus onClick={() => setas1(as1 - 0.1)}>-0.1</ButtonMinus>
            <p>as1: {as1.toFixed(1)}rad</p>
            <ButtonPlus onClick={() => setas1(as1 + 0.1)}>+0.1</ButtonPlus>
          </RowWrapper>
          <RowWrapper>
            <ButtonMinus onClick={() => setas2(as2 - 0.1)}>-0.1</ButtonMinus>
            <p>as2: {as2.toFixed(1)}rad</p>
            <ButtonPlus onClick={() => setas2(as2 + 0.1)}>+0.1</ButtonPlus>
          </RowWrapper>
        </RowWrapper>
      </RowWrapper>
      <div>
        <Pendulum draw={draw} />
      </div>
    </Wrapper>
  )
}

export default App
