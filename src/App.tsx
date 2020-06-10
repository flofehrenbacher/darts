import React from 'react'
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './home'
import { PlayersProvider, SetPlayersProvider } from './context'
import { EditPlayer } from './edit-player'
import { Hunter } from './Hunter'
import { ThreeZeroOne } from './three-zero-one'
import { useStickyState } from './use-sticky-state'
import { css, Global } from '@emotion/core'
import emotionReset from 'emotion-reset'

export type Player = {
  id: number
  name: string
  lives: [true | false, true | false, true | false]
  hits: [true | false, true | false, true | false]
  number?: number
}

export const buttonStyle = {
  display: 'block',
  padding: 10,
  margin: '20px auto',
  width: '100%',
  backgroundColor: '#292',
}

export function App() {
  const [players, setPlayers] = useStickyState<Player[]>([], '')

  return (
    <Router>
      <Global
        styles={css`
          ${emotionReset}

          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `}
      />
      <SetPlayersProvider value={setPlayers}>
        <PlayersProvider value={players}>
          <Switch>
            <Route path="/hunter">
              <Hunter />
            </Route>
            <Route path="/301">
              <ThreeZeroOne />
            </Route>
            <Route path="/edit-player/:id">
              <EditPlayer />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </PlayersProvider>
      </SetPlayersProvider>
    </Router>
  )
}
