import Carousel from 'react-multi-carousel'
import { BullsEyeIcon, HitIcon } from '../components/icons'
import { usePlayers, useSetPlayers } from '../context'
import { Layout } from '../layout'
import { Player } from '../model/player'
import { useThrowConfettiFor } from '../throw-confetti-provider'
import { useStickyState } from '../use-sticky-state'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const CricketNumbersInOrder = [
  ...Array.from({ length: 6 })
    .map((_, index) => index + 15)
    .reverse(),
  25,
]
export const createInitialCricketMap: () => Record<
  string,
  [true | false, true | false, true | false]
> = () =>
  Object.fromEntries(
    CricketNumbersInOrder.map((number) => [number, [false, false, false]])
  )

export default function Cricket() {
  const players = usePlayers()
  const setPlayers = useSetPlayers()
  const [isGameOver, setIsGameOver] = useStickyState(false, 'cricket-over')

  const throwConfetti = useThrowConfettiFor()

  function resetGame() {
    const confirmation = window.confirm('Spiel wiederholen?')
    if (confirmation) {
      setIsGameOver(false)
      setPlayers((previousPlayers) => {
        return previousPlayers.map((p) => ({
          ...p,
          cricketMap: createInitialCricketMap(),
        }))
      })
    }
  }

  function onClickHit(
    player: Player,
    hit: boolean,
    cricketNumber: number,
    index: number
  ) {
    const updatePlayer = players.find((p) => p.id === player.id)
    if (updatePlayer) {
      updatePlayer.cricketMap[cricketNumber][index] = !hit

      const finishedGame = Object.keys(updatePlayer.cricketMap).every(
        (cricketNumber) =>
          updatePlayer.cricketMap[cricketNumber].every((done) => done === true)
      )

      if (finishedGame && isGameOver === false) {
        setIsGameOver(true)
        throwConfetti()
      }

      setPlayers([...players.filter((p) => p.id !== player.id), updatePlayer])
    }
  }

  return (
    <Layout pageType="CRICKET" title="Cricket" resetGame={resetGame}>
      <div css={{ paddingBottom: 30 }}>
        <Carousel
          responsive={responsive}
          infinite
          showDots
          autoPlay={false}
          dotListClass="custom-dots"
        >
          {players.map((p) => (
            <GamePlayer
              key={`cricket-player-${p.id}`}
              player={p}
              onClickHit={onClickHit}
            />
          ))}
        </Carousel>
      </div>
    </Layout>
  )
}

function GamePlayer({
  player,
  onClickHit,
}: {
  player: Player
  onClickHit: (
    player: Player,
    hit: boolean,
    cricketNumber: number,
    index: number
  ) => void
}) {
  return (
    <div
      css={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
      }}
    >
      <h2
        css={{
          margin: 0,
          padding: 0,
          display: 'flex',
        }}
      >
        <span css={{ fontSize: 40, marginBottom: 30 }}>{player.name}</span>
      </h2>
      <div>
        {CricketNumbersInOrder.map((cricketNumber) => (
          <div
            css={{
              display: 'flex',
              marginTop: '10px',
              alignItems: 'center',
              marginLeft: '-35px',
            }}
            key={`cricket-number-${cricketNumber}`}
          >
            <span
              css={{
                flexBasis: '70px',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {cricketNumber === 25 ? (
                <BullsEyeIcon
                  css={{
                    width: '60px',
                  }}
                />
              ) : (
                cricketNumber
              )}
            </span>
            {player.cricketMap[cricketNumber].map((hit, index) => {
              return (
                <HitIcon
                  css={{
                    opacity: hit ? 1 : 0.2,
                    marginLeft: '3%',
                    width: '60px',
                    zIndex: 1,
                  }}
                  key={`${player.name}-hit-${index}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onClickHit(player, hit, cricketNumber, index)
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
