import { css, Global } from '@emotion/core'
import emotionReset from 'emotion-reset'
import React from 'react'
import {
  MemoryRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

import { PlayersProvider, SetPlayersProvider } from './context'
import { Cricket } from './pages/cricket'
import { Debug } from './pages/debug'
import { EditPlayer } from './pages/edit-player'
import { Home } from './pages/home'
import { Hunter } from './pages/hunter'
import { CurrentPlayerIndexKey, ThreeZeroOne } from './pages/three-zero-one'
import { theme } from './styles/theme'
import { useStickyState } from './use-sticky-state'
import { createDeferredPromise } from './utils/deferred-promise'
import { HalfIt } from './pages/half-it'
import { Player, PlayersKey } from './model/player'

export const ConfettiDuration = 3000

export const buttonStyle = (
  backgroundColor: string,
  borderColor?: string,
  color = theme.dark
) => css`
  display: block;
  padding: 7px;
  width: 100%;
  color: ${color};
  border: none;
  background-color: ${backgroundColor};
  font-size: 20px;
  font-weight: 500;
  border: 2px solid ${borderColor ?? 'transparent'};
  letter-spacing: 2px;
`

export function App() {
  const currentPath = localStorage.getItem('currentPath')
  return (
    <Router initialEntries={[currentPath ?? '/']}>
      <Global
        styles={css`
          ${emotionReset}

          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
          }
        `}
      />
      <AppWithRouteAccess />
    </Router>
  )
}

function AppWithRouteAccess() {
  const [players, setPlayers] = useStickyState<Player[]>([], PlayersKey)

  function onRemovePlayer(player: Player) {
    const confirmation = window.confirm(
      `Spieler ${player.name} wirklich entfernen?`
    )
    if (confirmation) {
      const remainingPlayers = players.filter((p) => p.id !== player.id)
      const currentPlayerIndex = localStorage.getItem(CurrentPlayerIndexKey)
      if (Number(currentPlayerIndex) > remainingPlayers.length - 1) {
        localStorage.setItem(CurrentPlayerIndexKey, '0')
      }
      setPlayers(players.filter((p) => p.id !== player.id))
    }
  }

  return (
    <SetPlayersProvider value={setPlayers}>
      <PlayersProvider
        value={players
          .sort((p1, p2) => p1.index - p2.index)
          .map((p, i) => ({ ...p, index: i }))}
      >
        <ThrowConfettiForProvider>
          <Switch>
            <LocalStorageRoute path="/debug">
              <Debug />
            </LocalStorageRoute>
            <LocalStorageRoute path="/hunter">
              <Hunter />
            </LocalStorageRoute>
            <LocalStorageRoute path="/cricket">
              <Cricket />
            </LocalStorageRoute>
            <LocalStorageRoute path="/301">
              <ThreeZeroOne />
            </LocalStorageRoute>
            <LocalStorageRoute path="/half-it">
              <HalfIt />
            </LocalStorageRoute>
            <LocalStorageRoute path="/edit-player/:id">
              <EditPlayer />
            </LocalStorageRoute>
            <LocalStorageRoute path="/">
              <Home onRemovePlayer={onRemovePlayer} />
            </LocalStorageRoute>
          </Switch>
        </ThrowConfettiForProvider>
      </PlayersProvider>
    </SetPlayersProvider>
  )
}

function LocalStorageRoute({
  path,
  children,
}: {
  path: string
  children: React.ReactNode
}) {
  const { pathname } = useLocation()
  React.useEffect(() => {
    localStorage.setItem('currentPath', pathname)
  }, [path, pathname])
  return <Route path={path}>{children}</Route>
}

const ThrowConfettiForContext = React.createContext<
  undefined | (() => Promise<void>)
>(undefined)

function ThrowConfettiForProvider({ children }: { children: React.ReactNode }) {
  const [throwConfetti, setThrowConfetti] = React.useState(false)
  const { width, height } = useWindowSize()

  const [onConfettiComplete, setOnConfettiComplete] = React.useState(() =>
    createDeferredPromise<void>()
  )

  return (
    <ThrowConfettiForContext.Provider
      value={() => {
        setThrowConfetti(true)
        return onConfettiComplete.promise
      }}
    >
      {throwConfetti && (
        <Confetti
          recycle={false}
          width={width}
          height={height}
          tweenDuration={ConfettiDuration}
          numberOfPieces={1000}
          onConfettiComplete={() => {
            setThrowConfetti(false)
            onConfettiComplete.resolve()
            setOnConfettiComplete(createDeferredPromise<void>())
          }}
        ></Confetti>
      )}
      {children}
    </ThrowConfettiForContext.Provider>
  )
}

export function useThrowConfettiFor() {
  const throwConfettiFor = React.useContext(ThrowConfettiForContext)
  if (throwConfettiFor === undefined) {
    throw Error(
      `useThrowConfettiFor must be used withtin a ThrowConfettiForProvider`
    )
  }

  return throwConfettiFor
}
