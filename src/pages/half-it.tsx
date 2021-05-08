import React from 'react'
import Fader from 'react-fader'
import { buttonStyle, useThrowConfettiFor } from '../app'
import { usePlayers, useSetPlayers } from '../context'
import { headerHeight, Layout, rainbow } from '../layout'
import { useStickyState } from '../use-sticky-state'

import { jsx } from '@emotion/react'
import { theme } from '../styles/theme'
import { Player } from '../model/player'
import { PointButtonsHalfIt } from '../components/point-buttons-half-it'

/** @jsxRuntime classic */
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
          {players.map((player) => (
            <li key={player.id}>
              {player.name} {player.halfItPoints}
            </li>
          ))}
        </ul>
        {step < HalfItStep.length ? (
          <div css={{ marginTop: 30 }}>
            {currentPlayer && (
              <div
                css={{
                  position: 'sticky',
                  top: headerHeight,
                  background: theme.dark,
                }}
              >
                <span
                  css={{
                    position: 'absolute',
                    textAlign: 'center',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    fontSize: '100px',
                    zIndex: -1,
                    color: 'lightskyblue',
                    opacity: 0.5,
                  }}
                >
                  {HalfItStep[step]}
                </span>
                <div css={{ zIndex: 1 }}>
                  <Fader>
                    <h2
                      css={{
                        fontSize: 40,
                        textAlign: 'center',
                      }}
                    >
                      {currentPlayer.name}
                    </h2>
                    <p css={{ fontSize: 50, textAlign: 'center' }}>
                      {currentPlayer.halfItPoints ?? 0}
                    </p>
                  </Fader>
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
                  <button
                    css={[
                      buttonStyle(rainbow, 'transparent', theme.white),
                      { marginTop: 20 },
                    ]}
                    onClick={() => {
                      const updatePlayer = {
                        ...currentPlayer,
                        halfItPoints: Math.floor(
                          (currentPlayer?.halfItPoints ?? 0) / 2
                        ),
                      }

                      setPlayers([
                        ...players.filter(
                          (p) => p.index !== currentPlayerIndex
                        ),
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
                </div>
              </div>
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
  const currentPlayer = players.find((p) => currentPlayerIndex === p.index)

  if (currentPlayer) {
    return (
      <React.Fragment>
        {typeof currentStep === 'number' ? (
          <PointButtonsHalfIt
            currentPlayerIndex={currentPlayerIndex}
            currentPlayer={currentPlayer}
            value={currentStep}
          />
        ) : (
          [
            50,
            25,
            ...Array.from({ length: 20 })
              .map((_, value) => value + 1)
              .reverse(),
          ].map((n) => (
            <PointButtonsHalfIt
              currentPlayerIndex={currentPlayerIndex}
              currentPlayer={currentPlayer}
              value={n}
              key={n}
            />
          ))
        )}
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

export type HalfItStep = ElementType<typeof HalfItStep>

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
