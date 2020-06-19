import React from 'react'
import { HitIcon } from '../components/icons'
import { usePlayers, useSetPlayers } from '../context'
import { Layout } from '../layout'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Player } from '../app'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

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

export function Cricket() {
  const players = usePlayers()
  const setPlayers = useSetPlayers()

  function onClickHit(
    player: Player,
    hit: boolean,
    cricketNumber: string,
    index: number
  ) {
    const updatePlayer = players.find((p) => p.id === player.id)
    if (updatePlayer) {
      updatePlayer.cricketMap[cricketNumber][index] = !hit
      setPlayers([...players.filter((p) => p.id !== player.id), updatePlayer])
    }
  }

  return (
    <Layout pageType="CRICKET" title="Cricket">
      <Carousel
        responsive={responsive}
        showDots
        infinite
        arrows={false}
        keyBoardControl
      >
        {players
          .sort((p1, p2) => p1.id - p2.id)
          .map((p) => (
            <GamePlayer player={p} onClickHit={onClickHit} />
          ))}
      </Carousel>
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
    cricketNumber: string,
    index: number
  ) => void
}) {
  return (
    <div
      style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
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
        <span style={{ fontSize: 40, marginBottom: 30 }}>{player.name}</span>{' '}
        <span style={{ fontSize: 45, fontWeight: 600, marginLeft: 20 }}>
          {player.number}
        </span>
      </h2>
      <div>
        {Object.keys(player.cricketMap).map((cricketNumber) => (
          <div
            css={{ display: 'flex', marginTop: '10px', alignItems: 'center' }}
          >
            <span css={{ flexBasis: '40px', fontSize: '20px' }}>
              {cricketNumber}
            </span>
            {player.cricketMap[cricketNumber].map((hit, index) => {
              return (
                <HitIcon
                  style={{
                    opacity: hit ? 1 : 0.2,
                    marginLeft: '3%',
                    width: '60px',
                    zIndex: 1,
                  }}
                  key={`${player.name}-hit-${index}`}
                  onClick={(e: any) => {
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
