export const PlayersKey = 'dart-players'

export type Player = {
  id: number
  index: number
  name: string
  lives: [true | false, true | false, true | false]
  hits: [true | false, true | false, true | false]
  number?: number
  stillInGame: boolean
  threeZeroOnePoints: number
  cricketMap: Record<string, [true | false, true | false, true | false]>
}
