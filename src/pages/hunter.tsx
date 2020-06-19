import React from 'react'
import { useHistory } from 'react-router-dom'
import { Player } from '../app'
import { usePlayers, useSetPlayers } from '../context'
import { HitIcon, LifeIcon } from '../components/icons'
import { Layout } from '../layout'
import { theme } from '../styles/theme'
import { useStickyState } from '../use-sticky-state'

export const BonusAvailableKey = 'bonus-available'

export function Hunter() {
  const setPlayers = useSetPlayers()
  const players = usePlayers()
  const history = useHistory()

  const [bonusAvailable, setBonusAvailble] = useStickyState<boolean>(
    true,
    BonusAvailableKey
  )

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
    let wasPlayerRemoved = false
    if (updatePlayer !== undefined) {
      updatePlayer.lives[index] = !alive

      if (updatePlayer?.lives.every((live) => !live)) {
        if (bonusAvailable) {
          alert('Es gibt ja noch den Bonus ☘️ Glück gehabt!')
          updatePlayer.lives[1] = true
          setPlayers([
            ...players.filter((p) => p.name !== player.name),
            updatePlayer,
          ])
          setBonusAvailble(false)
        } else {
          wasPlayerRemoved = true
          updatePlayer.stillInGame = false
          setPlayers([
            ...players.filter((p) => p.name !== player.name),
            updatePlayer,
          ])
        }
      }
      setPlayers([
        ...players.filter((p) => p.name !== player.name),
        updatePlayer,
      ])

      const restPlayers = players.filter((p) => p.stillInGame)
      if (restPlayers.length === 1) {
        resetGame(true)
        const confirmation = window.confirm(
          `Glückwunsch ${restPlayers[0].name}🎊🍻🥳\n Nochmal spielen? 🤓`
        )
        if (!confirmation) {
          history.push('home')
        }
      } else if (wasPlayerRemoved) {
        alert(
          `${updatePlayer.name} fliegt als ${
            players.filter((p) => !p.stillInGame).length
          }. aus dem Spiel ✌️`
        )
      }
    }
  }

  const RightIcon = (
    <LifeIcon
      style={{
        opacity: bonusAvailable ? 1 : 0.3,
        width: 40,
        height: 40,
      }}
      fillPrimary={theme.dark}
      fillSecondary={theme.dark}
    />
  )

  function resetGame(alreadyConfirmed?: boolean) {
    const confirmation =
      alreadyConfirmed || window.confirm('Spiel wiederholen?')
    if (confirmation) {
      setPlayers((previousPlayers) => {
        return previousPlayers.map((p) => ({
          ...p,
          hits: [false, false, false],
          lives: [true, true, true],
          stillInGame: true,
        }))
      })
      setBonusAvailble(true)
    }
  }

  return (
    <Layout
      pageType="HUNTER"
      title="Hunter"
      rightIcon={RightIcon}
      resetGame={() => resetGame(false)}
    >
      <div>
        <ul style={{ listStyle: 'none' }}>
          {players
            .filter((p) => p.stillInGame)
            .sort((p1, p2) => p1.id - p2.id)
            .map((player, i) => (
              <GamePlayer
                key={player.name}
                player={player}
                onClickHit={onClickHit}
                onClickLive={onClickLive}
                isLastPlayer={
                  players.filter((p) => p.stillInGame).length === i + 1
                }
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
                  opacity: alive ? 1 : 0.2,
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
