import React from 'react';

import { Player, PlayersKey } from '../app';
import { Layout } from '../layout';
import { CurrentPlayerIndexKey } from './three-zero-one';

export function Debug() {
  const players = JSON.parse(
    localStorage.getItem(PlayersKey) ?? '[]'
  ) as Player[]

  const currentPlayerId = JSON.parse(
    localStorage.getItem(CurrentPlayerIndexKey) ?? ''
  )
  return (
    <React.Fragment>
      <Layout pageType="DEBUG">
        <h2>Spieler</h2>
        <ul>
          {players.map((p) => (
            <li key={p.id}>{JSON.stringify(p, null, 2)}</li>
          ))}
        </ul>
        <br></br>
        <h2>Wer ist grad dran?</h2>
        <p>{currentPlayerId}</p>
      </Layout>
    </React.Fragment>
  )
}
