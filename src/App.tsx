import React from "react";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import { AddPlayer } from "./add-player";
import { PlayersProvider, SetPlayersProvider } from "./context";
import { EditPlayer } from "./edit-player";
import { Hunter } from "./Hunter";
import { ThreeZeroOne } from "./three-zero-one";
import { useStickyState } from "./use-sticky-state";

export type Player = {
  id: number;
  name: string;
  lives: [true | false, true | false, true | false];
  hits: [true | false, true | false, true | false];
  number?: number;
};

export const buttonStyle = {
  display: "block",
  width: "80%",
  padding: 10,
  margin: "20px auto",
};

export function App() {
  const [players, setPlayers] = useStickyState<Player[]>([], "");

  return (
    <Router>
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
              <AddPlayer />
            </Route>
          </Switch>
        </PlayersProvider>
      </SetPlayersProvider>
    </Router>
  );
}
