import React, { CSSProperties } from 'react'
import { useSetPlayers, usePlayers } from './context'
import { Layout } from './layout'
import { buttonStyle } from './App'
import { Link } from 'react-router-dom'
import { useStickyState } from './use-sticky-state'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export function Home() {
  const setPlayers = useSetPlayers()
  const players = usePlayers()
  return (
    <Layout title="Darts">
      <button
        style={{
          ...buttonStyle,
          scrollSnapAlign: 'start',
          scrollMarginBlockStart: 20,
          marginTop: 20,
        }}
        onClick={() => {
          // eslint-disable-next-line no-restricted-globals
          const confirmation = confirm('Wirklich alle Spieler entfernen?')
          confirmation && setPlayers([])
        }}
      >
        Zurücksetzen
      </button>
      <AddPlayerForm />
      <div>
        <h2 css={headlineStyles}>SPIELER</h2>
        <ul style={{ listStyle: 'none' }}>
          {players
            .sort((a, b) => a.id - b.id)
            .map((p) => (
              <li css={{ textAlign: 'center' }} key={p.id}>
                {p.name}
              </li>
            ))}
        </ul>
        <h2 css={headlineStyles}>SPIELE</h2>
        <ul style={{ listStyle: 'none' }}>
          <Link css={gameLinkStyles} to="/hunter">
            <button css={buttonStyle}>HUNTER</button>
          </Link>

          <li>
            <Link css={[gameLinkStyles]} to="/301">
              <button css={[buttonStyle]}>301</button>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  )
}

const gameLinkStyles = css`
  text-decoration: none;
  button {
    font-size: 20px;
    font-weight: bold;
  }
`

const headlineStyles = css`
  display: block;
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
`

function AddPlayerForm() {
  const [newPlayer, setNewPlayer] = useStickyState<{
    name: string
    number: number | undefined
  }>({ name: '', number: undefined }, 'user-form')
  const players = usePlayers()
  const setPlayers = useSetPlayers()

  const input = React.useRef<HTMLInputElement>(null)

  function onAddNewPlayer(newPlayer: {
    name: string
    number: number | undefined
  }) {
    const newPlayerN = players.find((p) => p.name === newPlayer.name)
      ? `${newPlayer.name}2`
      : newPlayer.name

    setPlayers([
      ...players,
      {
        id: players.length,
        name: newPlayerN,
        hits: [false, false, false],
        lives: [false, false, false],
        number: newPlayer.number,
      },
    ])
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onAddNewPlayer(newPlayer)
        setNewPlayer({ name: '', number: undefined })
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <label htmlFor="newPlayerName" style={{ display: 'block' }}>
        Name
      </label>
      <input
        ref={input}
        style={{ ...inputStyle }}
        id="newPlayerName"
        autoComplete="new-password"
        required
        value={newPlayer.name}
        onChange={(event) =>
          setNewPlayer({ ...newPlayer, name: event.target.value })
        }
      ></input>
      <button style={buttonStyle}>Hinzufügen</button>
    </form>
  )
}

export const inputStyle: CSSProperties = {
  textAlign: 'center',
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  borderBottom: 'solid 2px white',
  fontSize: 20,
  borderRadius: 0,
  width: '100%',
}
