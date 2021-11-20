import { useRouter } from 'next/dist/client/router'
import { HitIcon, LifeIcon } from '../components/icons'
import { usePlayers, useSetPlayers } from '../context'
import { Layout } from '../layout'
import { Player } from '../model/player'
import { useThrowConfettiFor } from '../throw-confetti-provider'
import { useStickyState } from '../use-sticky-state'

export const BonusAvailableKey = 'bonus-available'

export default function Hunter() {
  const setPlayers = useSetPlayers()
  const players = usePlayers()
  const throwConfetti = useThrowConfettiFor()
  const [isGameOver, setIsGameOver] = useStickyState(false, 'hunter-over')

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

  async function onClickLive(player: Player, alive: boolean, index: number) {
    const updatePlayer = players.find((p) => p.name === player.name)
    let wasPlayerRemoved = false
    if (updatePlayer !== undefined) {
      updatePlayer.lives[index] = !alive

      if (updatePlayer?.lives.every((live) => !live)) {
        if (bonusAvailable) {
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
      if (restPlayers.length === 1 && isGameOver === false) {
        setIsGameOver(true)
        const promise = throwConfetti()
        await promise
        resetGame(true)
      } else if (wasPlayerRemoved) {
        // `${updatePlayer.name} fliegt als ${
        //   players.filter((p) => !p.stillInGame).length
        // }. aus dem Spiel ✌️`
      }
    }
  }

  const RightIcon = (
    <LifeIcon
      css={{
        opacity: bonusAvailable ? 1 : 0.3,
        width: 40,
        height: 40,
      }}
    />
  )

  function resetGame(alreadyConfirmed?: boolean) {
    const confirmation =
      alreadyConfirmed || window.confirm('Spiel wiederholen?')
    if (confirmation) {
      setIsGameOver(false)
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
      title="hunter"
      rightIcon={RightIcon}
      resetGame={() => resetGame(false)}
    >
      <div>
        <ul css={{ listStyle: 'none' }}>
          {players
            .filter((p) => p.stillInGame)
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
  const { push } = useRouter()
  return (
    <li
      onClick={() => push(`edit-player/${player.id}`)}
      css={{
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
        css={{
          margin: 0,
          padding: 0,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span css={{ fontSize: 40 }}>{player.name}</span>{' '}
        <span css={{ fontSize: 45, fontWeight: 600, marginLeft: 20 }}>
          {player.number}
        </span>
      </h2>
      <div css={{ display: 'flex' }}>
        <div css={{ flexBasis: '50%' }}>
          <div css={{ marginTop: 30, marginBottom: 10 }}>Treffer</div>
          {player.hits.map((hit, index) => {
            return (
              <HitIcon
                css={{
                  opacity: hit ? 1 : 0.2,
                  marginLeft: '3%',
                  width: '30%',
                  zIndex: 1,
                }}
                key={`${player.name}-hit-${index}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onClickHit(player, hit, index)
                }}
              />
            )
          })}
        </div>
        <div css={{ marginLeft: 20, flexBasis: '50%' }}>
          <div css={{ marginTop: 30, marginBottom: 10 }}>Leben</div>
          {player.lives.map((alive, index) => {
            return (
              <LifeIcon
                css={{
                  opacity: alive ? 1 : 0.2,
                  marginLeft: '3%',
                  width: '30%',
                  zIndex: 1,
                }}
                key={`${player.name}-live-${index}`}
                onClick={(e) => {
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
