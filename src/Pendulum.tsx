import { createTextSpanFromBounds } from 'typescript'
import React, { useEffect, useRef } from 'react'
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

const Canvas = styled.canvas`
  background: #f8f1ff;
  border-radius: 5px;
`

const Pendulum = () => {
  const canvasRef = useRef(null)

  const draw = (ctx: any) => {
    ctx.fillStyle = '#0ac00a'
    ctx.fillRect(20, 50, 100, 100)
    ctx.fillRect(200, 100, 100, 100)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    //@ts-ignore
    const ctx = canvas.getContext('2d')
    draw(ctx)
  }, [draw])

  let r1 = 100
  let r2 = 100
  let m1 = 10
  let m2 = 10

  return (
    <Wrapper>
      <h1>Double pendulum</h1>
      <Canvas ref={canvasRef} width='600' height='600'></Canvas>
    </Wrapper>
  )
}

export default Pendulum
