import React from 'react'
import { useHistory } from 'react-router-dom'
import { Player } from './App'
import { usePlayers, useSetPlayers } from './context'
import { HitIcon, LifeIcon } from './icons'
import { Layout } from './layout'
import { theme } from './theme'

export function Hunter() {
  const setPlayers = useSetPlayers()
  const players = usePlayers()

  function onClickHit(player: Player, hit: boolean, index: number) {
    const updatePlayer = players.find((p) => p.name === player.name)
    if (updatePlayer) {
      updatePlayer.hits[index] = !hit
      setPlayers([
        ...players.filter((p) => p.name !== player.name),
        updatePlayer,
      ])
    }
  }

  function onClickLive(player: Player, alive: boolean, index: number) {
    const updatePlayer = players.find((p) => p.name === player.name)
    if (updatePlayer) {
      updatePlayer.lives[index] = !alive
      setPlayers([
        ...players.filter((p) => p.name !== player.name),
        updatePlayer,
      ])
    }
  }

  return (
    <Layout pageType="HUNTER" title="Hunter">
      <div>
        <ul style={{ listStyle: 'none' }}>
          {players
            .sort((p1, p2) => p1.id - p2.id)
            .map((player, i) => (
              <GamePlayer
                key={player.name}
                player={player}
                onClickHit={onClickHit}
                onClickLive={onClickLive}
                isLastPlayer={players.length === i + 1}
              />
            ))}
        </ul>
      </div>
    </Layout>
  )
}

function GamePlayer({
  player,
  onClickLive,
  onClickHit,
  isLastPlayer,
}: {
  player: Player
  onClickLive: (player: Player, alive: boolean, index: number) => void
  onClickHit: (player: Player, hit: boolean, index: number) => void
  isLastPlayer: boolean
}) {
  const history = useHistory()
  return (
    <li
      onClick={() => history.push(`edit-player/${player.id}`)}
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
          {player.number}
        </span>
      </h2>
      <div style={{ display: 'flex' }}>
        <div style={{ flexBasis: '50%' }}>
          <div style={{ marginTop: 30, marginBottom: 10 }}>Treffer</div>
          {player.hits.map((hit, index) => {
            return (
              <HitIcon
                style={{
                  opacity: hit ? 1 : 0.2,
                  marginLeft: '3%',
                  width: '30%',
                  zIndex: 1,
                }}
                key={`${player.name}-hit-${index}`}
                onClick={(e: any) => {
                  e.stopPropagation()
                  onClickHit(player, hit, index)
                }}
              />
            )
          })}
        </div>
        <div style={{ marginLeft: 20, flexBasis: '50%' }}>
          <div style={{ marginTop: 30, marginBottom: 10 }}>Leben</div>
          {player.lives.map((alive, index) => {
            return (
              <LifeIcon
                fillPrimary={theme.white}
                fillSecondary={theme.signalGreen}
                style={{
                  opacity: alive ? 0.2 : 1,
                  marginLeft: '3%',
                  width: '30%',
                  zIndex: 1,
                }}
                key={`${player.name}-live-${index}`}
                onClick={(e: any) => {
                  e.stopPropagation()
                  onClickLive(player, alive, index)
                }}
              />
            )
          })}
        </div>
      </div>
    </li>
  )
}
