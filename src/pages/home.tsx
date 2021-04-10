import { css, jsx } from '@emotion/core'
import React, { CSSProperties } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd'
import { Link, useHistory } from 'react-router-dom'
import arrayMove from 'array-move'

import { buttonStyle } from '../app'
import { RemoveIcon, SwapIcon } from '../components/icons'
import { usePlayers, useSetPlayers } from '../context'
import { Layout } from '../layout'
import { theme } from '../styles/theme'
import { useStickyState } from '../use-sticky-state'
import { createInitialCricketMap } from './cricket'
import { BonusAvailableKey } from './hunter'
import { CurrentPlayerIndexKey } from './three-zero-one'
import { Player } from '../model/player'

/** @jsx jsx */

const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: DraggingStyle | NotDraggingStyle
) => ({
  ...(isDragging && {
    backgroundColor: theme.dark,
    color: theme.white,
    border: `2px solid ${theme.white}`,
  }),
  ...draggableStyle,
})

export function Home({
  onRemovePlayer,
}: {
  onRemovePlayer: (player: Player) => void
}) {
  const setPlayers = useSetPlayers()
  const players = usePlayers()
  const history = useHistory()

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    // destination is not null AND draggable actually moved
    if (
      destination &&
      !(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
    ) {
      const newOrderOfPlayers = arrayMove(
        players,
        source.index,
        destination.index
      ).map((p, i) => ({ ...p, index: i }))

      setPlayers(newOrderOfPlayers)
    }
  }

  return (
    <Layout title="darts" pageType="HOME">
      <h2 css={headlineStyles}>Spieler hinzufügen</h2>
      <AddPlayerForm css={{ marginTop: 20 }} />
      <div>
        <h2 css={headlineStyles}>Spieler</h2>
        <ul style={{ listStyle: 'none' }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {players.map((p, index) => (
                    <Draggable
                      key={`dragplayer-key-${p.index}`}
                      draggableId={`dragplayer-${p.index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          css={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 40,
                            backgroundColor: theme.grey,
                            color: theme.dark,
                            marginTop: 5,
                          }}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          key={p.id}
                          onClick={() => history.push(`edit-player/${p.id}`)}
                        >
                          <div css={{ display: 'flex', alignItems: 'center' }}>
                            <SwapIcon css={{ width: '35px' }} />
                            <span css={{ padding: 10, fontWeight: 600 }}>
                              {p.name}
                            </span>
                          </div>
                          <div
                            css={{
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'space-around',
                              alignItems: 'center',
                            }}
                          >
                            <button
                              css={{
                                border: 'none',
                                height: '100%',
                                width: '35px',
                                background: theme.white,
                              }}
                              onClick={(e) => {
                                e.stopPropagation()
                                onRemovePlayer(p)
                              }}
                            >
                              <RemoveIcon />
                            </button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </ul>
        <h2 css={headlineStyles}>Spiel starten</h2>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <Link css={[gameLinkStyles]} to="/half-it">
              <button css={[buttonStyle('hotpink', theme.grey, 'white')]}>
                HALF IT!
              </button>
            </Link>
          </li>
          <li>
            <Link css={gameLinkStyles} to="/hunter">
              <button
                css={[buttonStyle(theme.grey, theme.grey), { marginTop: 5 }]}
              >
                HUNTER
              </button>
            </Link>
          </li>

          <li>
            <Link css={[gameLinkStyles]} to="/301">
              <button
                css={[buttonStyle(theme.grey, theme.grey), { marginTop: 5 }]}
              >
                301
              </button>
            </Link>
          </li>
          <li>
            <Link css={[gameLinkStyles]} to="/cricket">
              <button
                css={[buttonStyle(theme.grey, theme.grey), { marginTop: 5 }]}
              >
                CRICKET
              </button>
            </Link>
          </li>
        </ul>
        <button
          css={[
            buttonStyle(theme.signalRed, theme.signalRed, theme.white),
            { marginTop: 20 },
          ]}
          onClick={() => {
            const confirmation = window.confirm(
              'Wirklich alle Spieler entfernen?'
            )
            if (confirmation) {
              setPlayers([])
              localStorage.setItem(CurrentPlayerIndexKey, '0')
              localStorage.setItem(BonusAvailableKey, 'true')
            }
          }}
        >
          Zurücksetzen
        </button>
        {window.location.search.includes('debug') && (
          <Link css={[gameLinkStyles]} to="/debug">
            <button css={[buttonStyle(theme.signalGreen), { marginTop: 5 }]}>
              DEBUG
            </button>
          </Link>
        )}
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
        id:
          players.length > 0
            ? players.sort((p1, p2) => p1.id - p2.id)[players.length - 1].id + 1
            : 0,
        name: newPlayerN,
        hits: [false, false, false],
        lives: [true, true, true],
        number: newPlayer.number,
        stillInGame: true,
        threeZeroOnePoints: 301,
        cricketMap: createInitialCricketMap(),
        index: players.length > 0 ? players[players.length - 1].index + 1 : 0,
        halfItPoints: 0,
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
        flexShrink: 0,
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
        css={[
          buttonStyle(theme.signalGreen, theme.signalGreen, theme.white),
          { marginTop: 10 },
        ]}
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
