import 'react-toastify/dist/ReactToastify.css';

import { css, Global } from '@emotion/core';
import emotionReset from 'emotion-reset';
import React from 'react';
import { MemoryRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PlayersProvider, SetPlayersProvider } from './context';
import { Cricket } from './pages/cricket';
import { Debug } from './pages/debug';
import { EditPlayer } from './pages/edit-player';
import { Home } from './pages/home';
import { Hunter } from './pages/hunter';
import { CurrentPlayerIndexKey, ThreeZeroOne } from './pages/three-zero-one';
import { theme } from './styles/theme';
import { useStickyState } from './use-sticky-state';

export type Player = {
  id: number
  index: number
  name: string
  lives: [true | false, true | false, true | false]
  hits: [true | false, true | false, true | false]
  number?: number
  stillInGame: boolean
  threeZeroOnePoints: number
  cricketMap: Record<string, [true | false, true | false, true | false]>
}

export const buttonStyle = (color: string, borderColor?: string) => css`
  display: block;
  padding: 7px;
  width: 100%;
  color: ${theme.white};
  border: none;
  background-color: ${color};
  font-size: 20px;
  font-weight: 500;
  border: 2px solid ${borderColor ?? 'transparent'};
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
      <ToastContainer />
      <AppWithRouteAccess />
    </Router>
  )
}

export const PlayersKey = 'dart-players'
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
          <LocalStorageRoute path="/edit-player/:id">
            <EditPlayer />
          </LocalStorageRoute>
          <LocalStorageRoute path="/">
            <Home onRemovePlayer={onRemovePlayer} />
          </LocalStorageRoute>
        </Switch>
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
