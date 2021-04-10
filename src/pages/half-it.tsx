import React from 'react'
import Fader from 'react-fader'
import { buttonStyle, useThrowConfettiFor } from '../app'
import { usePlayers, useSetPlayers } from '../context'
import { Layout, rainbow } from '../layout'
import { useStickyState } from '../use-sticky-state'

import { jsx } from '@emotion/core'
import { theme } from '../styles/theme'
import { Player } from '../model/player'

/** @jsx jsx */

export const CurrentPlayerIndexKeyHalfIt = 'current-player-index-half-it'

export function HalfIt() {
  const players = usePlayers()
  const setPlayers = useSetPlayers()
  const [step, setStep] = useStickyState(0, 'half-it-step')

  const throwConfetti = useThrowConfettiFor()

  React.useEffect(() => {
    step === HalfItStep.length && throwConfetti()
  }, [step, throwConfetti])

  const [currentPlayerIndex, setCurrentPlayerIndex] = useStickyState(
    players.find((p) => p.index >= 0)?.index ?? 0,
    CurrentPlayerIndexKeyHalfIt
  )

  function resetGame() {
    const confirmation = window.confirm('Spiel wiederholen?')
    if (confirmation) {
      setCurrentPlayerIndex(players.find((p) => p.index >= 0)?.index ?? 0)
      setPlayers((previousPlayers) => {
        return previousPlayers.map((p) => ({
          ...p,
          halfItPoints: 0,
        }))
      })
      setStep(0)
    }
  }

  const currentPlayer = players.find((p) => currentPlayerIndex === p.index)

  return (
    <Layout pageType="HALF_IT" title="half it!" resetGame={resetGame}>
      <div css={{ flexGrow: 1 }}>
        <ul>
          {players.map((player, i) => (
            <li key={player.id}>
              {player.name} {player.halfItPoints}
            </li>
          ))}
        </ul>
        {step < HalfItStep.length ? (
          <div css={{ marginTop: 30 }}>
            {currentPlayer && (
              <Fader>
                <h2 css={{ fontSize: 40, textAlign: 'center' }}>
                  {currentPlayer.name}
                </h2>
                <p css={{ fontSize: 50, textAlign: 'center' }}>
                  {currentPlayer.halfItPoints}
                </p>
              </Fader>
            )}
            {currentPlayer && (
              <MakePoints
                currentStep={HalfItStep[step]}
                currentPlayerIndex={currentPlayerIndex}
                setCurrentPlayerIndex={setCurrentPlayerIndex}
                setStep={setStep}
              />
            )}
          </div>
        ) : null}
      </div>
    </Layout>
  )
}

interface MakePointsProps {
  currentStep: HalfItStep
  currentPlayerIndex: number
  setCurrentPlayerIndex: React.Dispatch<React.SetStateAction<number>>
  setStep: React.Dispatch<React.SetStateAction<number>>
}
function MakePoints({
  currentStep,
  currentPlayerIndex,
  setCurrentPlayerIndex,
  setStep,
}: MakePointsProps) {
  const players = usePlayers()
  const setPlayers = useSetPlayers()
  const currentPlayer = players.find((p) => currentPlayerIndex === p.index)

  if (currentPlayer && typeof currentStep === 'number') {
    return (
      <React.Fragment>
        <button
          css={[
            buttonStyle(theme.signalGreen, theme.signalGreen, theme.white),
            { marginTop: 20 },
          ]}
          onClick={() => {
            const updatePlayer = {
              ...currentPlayer,
              halfItPoints: (currentPlayer?.halfItPoints ?? 0) + currentStep,
            }

            setPlayers([
              ...players.filter((p, i) => p.index !== currentPlayerIndex),
              updatePlayer,
            ])
          }}
        >
          + {currentStep}
        </button>
        <button
          css={[
            buttonStyle(theme.signalRed, theme.signalRed, theme.white),
            { marginTop: 20 },
          ]}
          onClick={() => {
            const updatePlayer = {
              ...currentPlayer,
              halfItPoints: (currentPlayer?.halfItPoints ?? 0) - currentStep,
            }

            setPlayers([
              ...players.filter((p, i) => p.index !== currentPlayerIndex),
              updatePlayer,
            ])
          }}
        >
          - {currentStep}
        </button>
        <button
          css={[
            buttonStyle(rainbow, 'transparent', theme.white),
            { marginTop: 20 },
          ]}
          onClick={() => {
            const updatePlayer = {
              ...currentPlayer,
              halfItPoints: Math.floor((currentPlayer?.halfItPoints ?? 0) / 2),
            }

            setPlayers([
              ...players.filter((p, i) => p.index !== currentPlayerIndex),
              updatePlayer,
            ])
            nextPlayer(
              players,
              currentPlayerIndex,
              setCurrentPlayerIndex,
              setStep
            )
          }}
        >
          Half it!
        </button>
        <button
          css={[buttonStyle(theme.white), { marginTop: 20 }]}
          onClick={() => {
            nextPlayer(
              players,
              currentPlayerIndex,
              setCurrentPlayerIndex,
              setStep
            )
          }}
        >
          Weiter
        </button>
      </React.Fragment>
    )
  }
  return (
    <button
      css={[buttonStyle(theme.white), { marginTop: 20 }]}
      onClick={() => {
        nextPlayer(players, currentPlayerIndex, setCurrentPlayerIndex, setStep)
      }}
    >
      Weiter
    </button>
  )
}

const HalfItStep = [15, 16, 'double', 17, 18, 'triple', 19, 20, 'bull'] as const

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

type HalfItStep = ElementType<typeof HalfItStep>

function nextPlayer(
  players: Player[],
  currentPlayerIndex: number,
  setCurrentPlayerIndex: React.Dispatch<React.SetStateAction<number>>,
  setStep: React.Dispatch<React.SetStateAction<number>>
) {
  const nextPlayer = players.find((p) => p.index > currentPlayerIndex)

  setCurrentPlayerIndex(
    nextPlayer?.index ?? players.find((p) => p.index >= 0)?.index ?? 0
  )

  if (currentPlayerIndex === players.length - 1) {
    setStep((previousStep) => previousStep + 1)
  }
}
