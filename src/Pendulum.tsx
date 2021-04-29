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

type CanvasCtx = CanvasRenderingContext2D | null | undefined
type Props = { draw: (ctx: any) => void }

const Pendulum = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx: CanvasCtx = canvas?.getContext('2d')
    let frameCount = 0
    let animationFrameId: number

    const render = () => {
      frameCount++
      props.draw(ctx)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [props.draw])

  return <Canvas ref={canvasRef} width='600' height='600' />
}

export default Pendulum
