import styled from 'styled-components'

const Li_Custom = styled.li`
  list-style-type: none;
`

const Img_Custom = styled.img`
  height: 2rem;
  width: 2rem;
  margin-left: 2px;
`
type Props = {
  board: any[][]
  evaluatePosition: (position: string) => string
}

const ShowBoard = ({ board, evaluatePosition }: Props) => {
  return (
    <>
      {board.map(row => (
        <Li_Custom>
          {row.map(pos => {
            return <Img_Custom src={evaluatePosition(pos)} />
          })}
        </Li_Custom>
      ))}
    </>
  )
}

export default ShowBoard
