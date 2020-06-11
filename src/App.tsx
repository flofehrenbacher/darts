import { css, Global } from '@emotion/core'
import emotionReset from 'emotion-reset'
import React from 'react'
import { MemoryRouter as Router, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PlayersProvider, SetPlayersProvider } from './context'
import { EditPlayer } from './edit-player'
import { Home } from './home'
import { Hunter } from './Hunter'
import { theme } from './theme'
import { ThreeZeroOne } from './three-zero-one'
import { useStickyState } from './use-sticky-state'
import Switch from 'react-router-transition-switch'
import Fader from 'react-fader'

export type Player = {
  id: number
  name: string
  lives: [true | false, true | false, true | false]
  hits: [true | false, true | false, true | false]
  number?: number
  stillInGame: boolean
  threeZeroOnePoints: number
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

function AppWithRouteAccess() {
  const [players, setPlayers] = useStickyState<Player[]>([], '')
  function onRemovePlayer(player: Player) {
    const confirmation = window.confirm(
      `Spieler ${player.name} wirklich entfernen?`
    )
    confirmation && setPlayers(players.filter((p) => p.id !== player.id))
  }

  return (
    <SetPlayersProvider value={setPlayers}>
      <PlayersProvider value={players}>
        <Switch component={Fader}>
          <LocalStorageRoute path="/hunter">
            <Hunter />
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
