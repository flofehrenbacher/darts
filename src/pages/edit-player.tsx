import React from 'react'
import InputNumber from 'react-input-number'
import { useParams } from 'react-router-dom'
import { buttonStyle, Player } from '../app'
import { usePlayers, useSetPlayers } from '../context'
import { inputStyle } from './home'
import { Layout } from '../layout'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { theme } from '../styles/theme'
import { useGoBack } from '../utils/go-back'

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
    <Layout title={player.name} pageType="EDIT_PLAYER">
      <EditPlayerForm player={player} />
    </Layout>
  )
}

function EditPlayerForm({ player, ...props }: { player: Player }) {
  const [editableNumber, setEditableNumber] = React.useState<
    number | undefined
  >(player.number)
  const [editableName, setEditableName] = React.useState<string>(player.name)
  const players = usePlayers()
  const setPlayers = useSetPlayers()

  const goBack = useGoBack()

  function onEditPlayer() {
    setPlayers([
      ...players.filter((p) => p.id !== player.id),
      {
        ...player,
        number: editableNumber ? Number(editableNumber) : undefined,
        name: editableName,
      },
    ])
    goBack()
  }

  return (
    <div
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 50,
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onEditPlayer()
        }}
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
        {...props}
      >
        <div
          style={{ alignSelf: 'flex-start', width: '80%', margin: '0 auto' }}
        >
          <label htmlFor="newPlayerName" style={{ display: 'block' }}>
            Name
          </label>
          <input
            style={{ ...inputStyle, width: '100%' }}
            id="newPlayerName"
            required
            value={editableName}
            onChange={(event) => setEditableName(event.target.value)}
          ></input>
        </div>
        <div
          style={{ alignSelf: 'flex-start', width: '80%', margin: '0 auto' }}
        >
          <label
            css={[labelStyle, { marginTop: 40 }]}
            htmlFor="newPlayerNumber"
          >
            Nummer
          </label>
          <InputNumber
            min={1}
            max={25}
            step={1}
            css={{
              ...inputStyle,
              width: '40px',
            }}
            id="newPlayerNumber"
            value={editableNumber === undefined ? '' : editableNumber}
            onChange={(x: number) => {
              setEditableNumber(x)
            }}
            enableMobileNumericKeyboard
          />
        </div>
        <button
          css={[buttonStyle(theme.dark, theme.signalGreen), { marginTop: 50 }]}
        >
          Ändern
        </button>
      </form>
    </div>
  )
}

const labelStyle = css`
  display: block;
`
