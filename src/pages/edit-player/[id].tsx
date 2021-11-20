import { css } from '@emotion/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import InputNumber from 'react-input-number'
import { buttonStyle } from '../../styles/button-style'
import { usePlayers, useSetPlayers } from '../../context'
import { Layout } from '../../layout'
import { Player } from '../../model/player'
import { theme } from '../../styles/theme'
import { useGoBack } from '../../utils/go-back'
import { inputStyle } from '..'

export default function EditPlayer() {
  const router = useRouter()
  const { id } = router.query

  const players = usePlayers()
  const player = players.find((p) => {
    return p.id === Number(id)
  })

  return (
    <Layout title={player?.name} pageType="EDIT_PLAYER">
      {player ? <EditPlayerForm player={player} /> : null}
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
        <div css={{ alignSelf: 'flex-start', width: '80%', margin: '0 auto' }}>
          <label htmlFor="newPlayerName" css={{ display: 'block' }}>
            Name
          </label>
          <input
            css={{ ...inputStyle, width: '100%' }}
            id="newPlayerName"
            required
            value={editableName}
            onChange={(event) => setEditableName(event.target.value)}
          ></input>
        </div>
        <div css={{ alignSelf: 'flex-start', width: '80%', margin: '0 auto' }}>
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
          css={[
            buttonStyle(theme.signalGreen, theme.signalGreen, theme.white),
            { marginTop: 50 },
          ]}
        >
          Speichern
        </button>
      </form>
    </div>
  )
}

const labelStyle = css`
  display: block;
`
