import React from 'react'
import { buttonStyle } from './app'
import { usePlayers, useSetPlayers } from './context'
import { Layout } from './layout'
import { inputStyle } from './pages/home'
import { theme } from './styles/theme'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useStickyState } from './use-sticky-state'
import { toast } from 'react-toastify'
import Fader from 'react-fader'

export const CurrentPlayerIdKey = 'current-player-id'

export function ThreeZeroOne() {
  const players = usePlayers()
  const setPlayers = useSetPlayers()

  const [currentPlayerId, setCurrentPlayerId] = useStickyState(
    players.sort((p1, p2) => p1.id - p2.id).find((p) => p.id >= 0)?.id ?? 0,
    CurrentPlayerIdKey
  )

  function resetGame() {
    const confirmation = window.confirm('Spiel wiederholen?')
    if (confirmation) {
      setCurrentPlayerId(
        players.sort((p1, p2) => p1.id - p2.id).find((p) => p.id >= 0)?.id ?? 0
      )
      setPlayers((previousPlayers) => {
        return previousPlayers.map((p) => ({
          ...p,
          threeZeroOnePoints: 301,
        }))
      })
    }
  }

  const currentPlayer = players
    .sort((p1, p2) => p1.id - p2.id)
    .find((p) => currentPlayerId === p.id)

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
      const nextPlayer = players
        .sort((p1, p2) => p1.id - p2.id)
        .find((p) => p.id > currentPlayerId)

      setCurrentPlayerId(
        nextPlayer?.id ??
          players.sort((p1, p2) => p1.id - p2.id).find((p) => p.id >= 0)?.id ??
          0
      )
    }
  }

  return (
    <Layout pageType="301" title="301" resetGame={resetGame}>
      <div css={{ flexGrow: 1 }}>
        <ul>
          {players
            .sort((p1, p2) => p1.id - p2.id)
            .map((player, i) => (
              <li key={player.id}>
                {player.name} {player.threeZeroOnePoints}
              </li>
            ))}
        </ul>
        <div css={{ marginTop: 30 }}>
          {currentPlayer && (
            <Fader>
              <h2 css={{ fontSize: 40, textAlign: 'center' }}>
                {currentPlayer.name}
              </h2>
              <p css={{ fontSize: 50, textAlign: 'center' }}>
                {currentPlayer.threeZeroOnePoints}
              </p>
            </Fader>
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
              toast('Das war wohl nix 🤪')
            } else {
              setEditableNumber(points)
            }
          } else {
            setEditableNumber(undefined)
          }
        }}
      />
      <button css={[buttonStyle(theme.dark, theme.white), { marginTop: 20 }]}>
        Weiter
      </button>
    </form>
  )
}
