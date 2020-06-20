import { jsx } from '@emotion/core';
import React from 'react';
import Fader from 'react-fader';
import { toast } from 'react-toastify';

import { buttonStyle } from '../app';
import { usePlayers, useSetPlayers } from '../context';
import { Layout } from '../layout';
import { theme } from '../styles/theme';
import { useStickyState } from '../use-sticky-state';
import { inputStyle } from './home';

/** @jsx jsx */

export const CurrentPlayerIndexKey = 'current-player-index'

export function ThreeZeroOne() {
  const players = usePlayers()
  const setPlayers = useSetPlayers()

  const [currentPlayerIndex, setCurrentPlayerIndex] = useStickyState(
    players.find((p) => p.index >= 0)?.index ?? 0,
    CurrentPlayerIndexKey
  )

  function resetGame() {
    const confirmation = window.confirm('Spiel wiederholen?')
    if (confirmation) {
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

  function onUpdatePoints(
    editableNumber: number,
    setEditableNumber: React.Dispatch<React.SetStateAction<number | undefined>>
  ) {
    if (editableNumber !== undefined && currentPlayer !== undefined) {
      const newPoints = currentPlayer.threeZeroOnePoints - editableNumber

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
          {players.map((player, i) => (
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
        value={editableNumber === undefined ? '' : String(editableNumber)}
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
