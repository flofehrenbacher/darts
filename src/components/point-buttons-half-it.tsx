import React from 'react'
import { buttonStyle } from '../app'
import { usePlayers, useSetPlayers } from '../context'
import { Player } from '../model/player'
import { theme } from '../styles/theme'
import { jsx } from '@emotion/react'

/** @jsxRuntime classic */
/** @jsx jsx */

interface PointButtonsHalfItProps {
  currentPlayer: Player
  currentPlayerIndex: number
  value: number
}
export function PointButtonsHalfIt({
  currentPlayer,
  currentPlayerIndex,
  value,
  ...props
}: PointButtonsHalfItProps) {
  const players = usePlayers()
  const setPlayers = useSetPlayers()
  return (
    <div css={{ display: 'flex' }} {...props}>
      <button
        css={[
          buttonStyle(theme.signalGreen, theme.signalGreen, theme.white),
          { marginTop: 20 },
        ]}
        onClick={() => {
          const updatePlayer = {
            ...currentPlayer,
            halfItPoints: (currentPlayer?.halfItPoints ?? 0) + value,
          }

          setPlayers([
            ...players.filter((p) => p.index !== currentPlayerIndex),
            updatePlayer,
          ])
        }}
      >
        + {value}
      </button>
      <button
        css={[
          buttonStyle(theme.signalRed, theme.signalRed, theme.white),
          { marginTop: 20 },
        ]}
        onClick={() => {
          const updatePlayer = {
            ...currentPlayer,
            halfItPoints: (currentPlayer?.halfItPoints ?? 0) - value,
          }

          setPlayers([
            ...players.filter((p) => p.index !== currentPlayerIndex),
            updatePlayer,
          ])
        }}
      >
        - {value}
      </button>
    </div>
  )
}
