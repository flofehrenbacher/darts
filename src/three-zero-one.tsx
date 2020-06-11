import React from 'react'
import InputNumber from 'react-input-number'
import { Player, buttonStyle } from './App'
import { usePlayers, useSetPlayers } from './context'
import { Layout } from './layout'
import { inputStyle } from './home'
import { theme } from './theme'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export function ThreeZeroOne() {
  const players = usePlayers()
  const setPlayers = useSetPlayers()

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

  return (
    <Layout pageType="301" title="301" resetGame={resetGame}>
      <ul style={{ listStyle: 'none' }}>
        {players
          .filter((p) => p.stillInGame)
          .sort((p1, p2) => p1.id - p2.id)
          .map((player, i) => (
            <GamePlayer
              key={player.name}
              player={player}
              isLastPlayer={players.length === i + 1}
            />
          ))}
      </ul>
    </Layout>
  )
}

function GamePlayer({
  player,
  isLastPlayer,
}: {
  player: Player
  isLastPlayer: boolean
}) {
  return (
    <li
      style={{
        borderBottom: isLastPlayer ? 'solid 2px transparent' : 'solid 2px grey',
        padding: 20,
        height: '30vh',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h2
        style={{
          margin: 0,
          padding: 0,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 40 }}>{player.name}</span>{' '}
        <span style={{ fontSize: 45, fontWeight: 600, marginLeft: 20 }}>
          {player.threeZeroOnePoints}
        </span>
      </h2>
      <RemovePoints player={player} />
    </li>
  )
}

function RemovePoints({ player }: { player: Player }) {
  const [editableNumber, setEditableNumber] = React.useState<
    number | undefined
  >(undefined)
  const players = usePlayers()
  const setPlayers = useSetPlayers()

  function onUpdatePoints() {
    if (editableNumber !== undefined) {
      const newPoints = player.threeZeroOnePoints - editableNumber

      setPlayers([
        ...players.filter((p) => p.id !== player.id),
        { ...player, threeZeroOnePoints: newPoints },
      ])
      setEditableNumber(undefined)
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onUpdatePoints()
      }}
    >
      <InputNumber
        min={1}
        max={180}
        step={1}
        css={{
          ...inputStyle,
          width: '50px',
        }}
        required
        id="newPlayerNumber"
        value={editableNumber === undefined ? '' : editableNumber}
        onChange={(x: number) => {
          setEditableNumber(x)
        }}
        enableMobileNumericKeyboard
      />
      <button css={[buttonStyle(theme.dark, theme.white), { marginTop: 20 }]}>
        Abziehen
      </button>
    </form>
  )
}
