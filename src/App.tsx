import { css, Global } from '@emotion/core'
import emotionReset from 'emotion-reset'
import React, { CSSProperties } from 'react'
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'
import { PlayersProvider, SetPlayersProvider } from './context'
import { EditPlayer } from './edit-player'
import { Home } from './home'
import { Hunter } from './Hunter'
import { theme } from './theme'
import { ThreeZeroOne } from './three-zero-one'
import { useStickyState } from './use-sticky-state'

export type Player = {
  id: number
  name: string
  lives: [true | false, true | false, true | false]
  hits: [true | false, true | false, true | false]
  number?: number
}

export const buttonStyle = css`
  display: block;
  padding: 10;
  margin: 20px auto;
  padding: 10px;
  width: 100%;
  color: ${theme.white};
  border: none;
  background-color: ${theme.signalGreen};
  font-size: 20px;
  font-weight: 500;
`

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
