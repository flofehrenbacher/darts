import React, { CSSProperties } from 'react'
import { useSetPlayers, usePlayers } from './context'
import { Layout } from './layout'
import { buttonStyle, Player } from './App'
import { Link, useHistory } from 'react-router-dom'
import { useStickyState } from './use-sticky-state'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { theme } from './theme'
import { toast } from 'react-toastify'
import { RemoveIcon } from './icons'

export function Home({
  onRemovePlayer,
}: {
  onRemovePlayer: (player: Player) => void
}) {
  const setPlayers = useSetPlayers()
  const players = usePlayers()
  const history = useHistory()

  return (
    <Layout title="Darts" pageType="HOME">
      <h2 css={headlineStyles}>Spieler hinzufügen</h2>
      <AddPlayerForm css={{ marginTop: 20 }} />
      <div>
        <h2 css={headlineStyles}>Spieler</h2>
        <ul style={{ listStyle: 'none' }}>
          {players
            .sort((a, b) => a.id - b.id)
            .map((p) => (
              <li
                css={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 40,
                  backgroundColor: theme.grey,
                  color: theme.dark,
                  marginTop: 2,
                }}
                key={p.id}
                onClick={() => history.push(`edit-player/${p.id}`)}
              >
                <span css={{ padding: 10, fontWeight: 600 }}>{p.name}</span>
                <button
                  css={{
                    height: '100%',
                    width: 40,
                    background: theme.white,
                    border: 'none',
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemovePlayer(p)
                  }}
                >
                  <RemoveIcon />
                </button>
              </li>
            ))}
        </ul>
        <h2 css={headlineStyles}>Spiel starten</h2>
        <ul style={{ listStyle: 'none' }}>
          <Link css={gameLinkStyles} to="/hunter">
            <button css={buttonStyle(theme.signalGreen)}>HUNTER</button>
          </Link>

          <li>
            <Link css={[gameLinkStyles]} to="/301">
              <button css={[buttonStyle(theme.signalGreen), { marginTop: 2 }]}>
                301
              </button>
            </Link>
          </li>
        </ul>
        <button
          css={[buttonStyle(theme.dark, theme.signalRed), { marginTop: 20 }]}
          onClick={() => {
            const confirmation = window.confirm(
              'Wirklich alle Spieler entfernen?'
            )
            confirmation && setPlayers([])
            localStorage.setItem('bonus-available', 'true')
          }}
        >
          Zurücksetzen
        </button>
      </div>
    </Layout>
  )
}

const gameLinkStyles = css`
  text-decoration: none;
`

const headlineStyles = css`
  display: block;
  width: 100%;
  font-size: 20px;
  margin: 20px 0;
  font-weight: bold;
`

function AddPlayerForm(props: any) {
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
        lives: [true, true, true],
        number: newPlayer.number,
        stillInGame: true,
        threeZeroOnePoints: 301,
      },
    ])
    toast(`${newPlayerN} hinzugefügt`)
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
      {...props}
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
      <button
        css={[buttonStyle(theme.dark, theme.signalGreen), { marginTop: 10 }]}
      >
        Hinzufügen
      </button>
    </form>
  )
}

export const inputStyle: CSSProperties = {
  textAlign: 'center',
  backgroundColor: 'transparent',
  color: theme.white,
  border: 'none',
  borderBottom: 'solid 2px white',
  fontSize: 24,
  borderRadius: 0,
  padding: 7,
  width: '100%',
  margin: '2px auto 0',
  display: 'block',
}
