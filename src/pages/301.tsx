import React from 'react'
import { usePlayers, useSetPlayers } from '../context'
import { Layout } from '../layout'
import { buttonStyle } from '../styles/button-style'
import { theme } from '../styles/theme'
import { useThrowConfettiFor } from '../throw-confetti-provider'
import { useStickyState } from '../use-sticky-state'
import { inputStyle } from './home'

export const CurrentPlayerIndexKey = 'current-player-index'

export default function ThreeZeroOne() {
  const players = usePlayers()
  const setPlayers = useSetPlayers()
  const [isGameOver, setIsGameOver] = useStickyState(false, '301-over')

  const throwConfetti = useThrowConfettiFor()

  const [currentPlayerIndex, setCurrentPlayerIndex] = useStickyState(
    players.find((p) => p.index >= 0)?.index ?? 0,
    CurrentPlayerIndexKey
  )

  function resetGame() {
    const confirmation = window.confirm('Spiel wiederholen?')
    if (confirmation) {
      setIsGameOver(false)
      setCurrentPlayerIndex(players.find((p) => p.index >= 0)?.index ?? 0)
      setPlayers((previousPlayers) => {
        return previousPlayers.map((p) => ({
          ...p,
          threeZeroOnePoints: 301,
        }))
      })
    }
  }

  const currentPlayer = players.find((p) => currentPlayerIndex === p.index)

  async function onUpdatePoints(
    editableNumber: number | undefined,
    setEditableNumber: React.Dispatch<React.SetStateAction<number | undefined>>
  ) {
    if (editableNumber !== undefined && currentPlayer !== undefined) {
      const newPoints = currentPlayer.threeZeroOnePoints - editableNumber
      if (newPoints === 0 && isGameOver === false) {
        setIsGameOver(true)
        throwConfetti()
      }

      setPlayers([
        ...players.filter((p) => p.index !== currentPlayer.index),
        { ...currentPlayer, threeZeroOnePoints: newPoints },
      ])
      setEditableNumber(undefined)
      const nextPlayer = players.find((p) => p.index > currentPlayerIndex)

      setCurrentPlayerIndex(
        nextPlayer?.index ?? players.find((p) => p.index >= 0)?.index ?? 0
      )
    }
  }

  return (
    <Layout pageType="301" title="301" resetGame={resetGame}>
      <div css={{ flexGrow: 1 }}>
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              {player.name} {player.threeZeroOnePoints}
            </li>
          ))}
        </ul>
        <div css={{ marginTop: 30 }}>
          {currentPlayer && (
            <div>
              <h2 css={{ fontSize: 40, textAlign: 'center' }}>
                {currentPlayer.name}
              </h2>
              <p css={{ fontSize: 50, textAlign: 'center' }}>
                {currentPlayer.threeZeroOnePoints}
              </p>
            </div>
          )}
          {currentPlayer && <RemovePoints onEnterPoints={onUpdatePoints} />}
        </div>
      </div>
    </Layout>
  )
}
function RemovePoints({
  onEnterPoints,
}: {
  onEnterPoints: (
    editableNumber: number | undefined,
    setEditableNumber: React.Dispatch<React.SetStateAction<number | undefined>>
  ) => Promise<void>
}) {
  const x = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (x.current) {
      x.current.focus()
    }
  })
  const [editableNumber, setEditableNumber] = React.useState<
    number | undefined
  >(undefined)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onEnterPoints(editableNumber, setEditableNumber)
        x.current?.setAttribute('autofocus', 'true')
        x.current?.focus()
      }}
    >
      <input
        ref={x}
        min={0}
        max={180}
        step={1}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        css={{
          ...inputStyle,
          width: '70px',
        }}
        pattern="\d*"
        required
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        id="newPlayerNumber"
        value={editableNumber === undefined ? '' : String(editableNumber)}
        onChange={(event) => {
          event.preventDefault()
          const points = Number(event.target.value)
          if (typeof points === 'number') {
            if (points === 0) {
              onEnterPoints(0, setEditableNumber)
              x.current?.setAttribute('autofocus', 'true')
              x.current?.focus()
            } else {
              setEditableNumber(points)
            }
          } else {
            setEditableNumber(undefined)
          }
        }}
      />
      <button css={[buttonStyle(theme.white, theme.white), { marginTop: 20 }]}>
        Weiter
      </button>
    </form>
  )
}
