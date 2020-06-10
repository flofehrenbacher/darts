import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { inputStyle } from './home'
import { buttonStyle, Player } from './App'
import { usePlayers, useSetPlayers } from './context'
import { Layout } from './layout'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export function EditPlayer() {
  const { id } = useParams()
  const players = usePlayers()
  const player = players.find((p) => {
    return p.id === Number(id)
  })
  if (player === undefined) {
    throw new Error(`Player with id ${id} does not exist`)
  }
  return (
    <Layout title={player.name}>
      <EditPlayerForm player={player} />
    </Layout>
  )
}

function EditPlayerForm({ player }: { player: Player }) {
  const [editableNumber, setEditableNumber] = React.useState<string>(
    String(player.number)
  )
  const [editableName, setEditableName] = React.useState<string>(player.name)
  const players = usePlayers()
  const setPlayers = useSetPlayers()
  const history = useHistory()

  function onEditPlayer() {
    setPlayers([
      ...players.filter((p) => p.id !== player.id),
      {
        ...player,
        number:
          editableNumber !== undefined ? Number(editableNumber) : undefined,
        name: editableName,
      },
    ])
    history.goBack()
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onEditPlayer()
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '300px',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <div style={{ alignSelf: 'flex-start', width: '80%', margin: '0 auto' }}>
        <label htmlFor="newPlayerName" style={{ display: 'block' }}>
          Name
        </label>
        <input
          style={{ ...inputStyle, width: '100%' }}
          autoComplete="new-password"
          id="newPlayerName"
          required
          value={editableName}
          onChange={(event) => setEditableName(event.target.value)}
        ></input>
      </div>
      <div style={{ alignSelf: 'flex-start', width: '80%', margin: '0 auto' }}>
        <label
          style={{ marginTop: 10, display: 'block' }}
          htmlFor="newPlayerNumber"
        >
          Nummer
        </label>
        <input
          style={{
            ...inputStyle,
            margin: '0 auto',
            display: 'block',
          }}
          autoComplete="new-password"
          type="number"
          id="newPlayerNumber"
          pattern="\d*"
          value={editableNumber === undefined ? '' : editableNumber}
          onChange={(event) => setEditableNumber(event.target.value)}
        ></input>
      </div>
      <button css={buttonStyle}>Ändern</button>
    </form>
  )
}
