import React from 'react'
import { Player } from './model/player'

const SetPlayersContext = React.createContext<
  React.Dispatch<React.SetStateAction<Player[]>> | undefined
>(undefined)

export function SetPlayersProvider({
  value,
  children,
}: {
  value: React.Dispatch<React.SetStateAction<Player[]>>
  children: React.ReactNode
}) {
  return (
    <SetPlayersContext.Provider value={value}>
      {children}
    </SetPlayersContext.Provider>
  )
}

export function useSetPlayers() {
  const setPlayer = React.useContext(SetPlayersContext)
  if (setPlayer === undefined) {
    throw new Error('useSetPlayer must be used within SetPlayersProvider')
  }
  return setPlayer
}

const PlayersContext = React.createContext<Player[] | undefined>(undefined)

export function PlayersProvider({
  value,
  children,
}: {
  value: Player[]
  children: React.ReactNode
}) {
  return (
    <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
  )
}

export function usePlayers() {
  const setPlayer = React.useContext(PlayersContext)
  if (setPlayer === undefined) {
    throw new Error('useSetPlayer must be used within PlayersProvider')
  }
  return setPlayer
}
