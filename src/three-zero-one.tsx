import React from 'react'
import InputNumber from 'react-input-number'
import { Player, buttonStyle } from './App'
import { usePlayers, useSetPlayers } from './context'
import { Layout } from './layout'
import { inputStyle } from './home'
import { theme } from './theme'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useStickyState } from './use-sticky-state'

export function ThreeZeroOne() {
  const players = usePlayers()
  const setPlayers = useSetPlayers()

  const [currentPlayerId, setCurrentPlayerId] = useStickyState(
    0,
    'current-player-id'
  )

  // React.useEffect(() => setCurrentPlayerId(0))

  function resetGame() {
    const confirmation = window.confirm('Spiel wiederholen?')
    if (confirmation) {
      setPlayers((previousPlayers) => {
        return previousPlayers.map((p) => ({
          ...p,
          threeZeroOnePoints: 301,
        }))
      })
    }
  }

  const currentPlayer = players.find((p) => currentPlayerId === p.id)

  function onUpdatePoints(
    editableNumber: number,
    setEditableNumber: React.Dispatch<React.SetStateAction<number | undefined>>
  ) {
    if (editableNumber !== undefined && currentPlayer !== undefined) {
      const newPoints = currentPlayer.threeZeroOnePoints - editableNumber

      setPlayers([
        ...players.filter((p) => p.id !== currentPlayer.id),
        { ...currentPlayer, threeZeroOnePoints: newPoints },
      ])
      setEditableNumber(undefined)
      setCurrentPlayerId((currentPlayerId + 1) % players.length)
    }
  }

  return (
    <Layout pageType="301" title="301" resetGame={resetGame}>
      <ul>
        {players
          .filter((p) => p.stillInGame)
          .sort((p1, p2) => p1.id - p2.id)
          .map((player, i) => (
            <li key={player.id}>
              {player.name} {player.threeZeroOnePoints}
            </li>
          ))}
      </ul>
      <div css={{ marginTop: 30 }}>
        {currentPlayer && (
          <React.Fragment>
            <h2 css={{ fontSize: 40, textAlign: 'center' }}>
              {currentPlayer.name}
            </h2>
            <p css={{ fontSize: 50, textAlign: 'center' }}>
              {currentPlayer.threeZeroOnePoints}
            </p>
          </React.Fragment>
        )}
        {currentPlayer && <RemovePoints onEnterPoints={onUpdatePoints} />}
      </div>
    </Layout>
  )
}
function RemovePoints({
  onEnterPoints,
}: {
  onEnterPoints: (...props: any) => void
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
        css={{
          ...inputStyle,
          width: '70px',
        }}
        pattern="\d*"
        required
        autoFocus
        id="newPlayerNumber"
        value={editableNumber === undefined ? '' : editableNumber}
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
      {/* <InputNumber
        ref={x}
        min={1}
        max={180}
        step={1}
        css={{
          ...inputStyle,
          width: '70px',
        }}
        required
        id="newPlayerNumber"
        value={editableNumber === undefined ? '' : editableNumber}
        onChange={(x: number) => {
          setEditableNumber(x)
        }}
        enableMobileNumericKeyboard
      /> */}
      <button css={[buttonStyle(theme.dark, theme.white), { marginTop: 20 }]}>
        Weiter
      </button>
    </form>
  )
}
