import React, { CSSProperties } from "react";
import { useSetPlayers, usePlayers } from "./context";
import { Layout } from "./layout";
import { buttonStyle } from "./App";
import { Link } from "react-router-dom";
import { useStickyState } from "./use-sticky-state";

export function AddPlayer() {
  const setPlayers = useSetPlayers();
  const players = usePlayers();
  return (
    <Layout title="Darts">
      <button
        style={{
          ...buttonStyle,
          scrollSnapAlign: "start",
          scrollMarginBlockStart: 20,
          marginTop: 20,
        }}
        onClick={() => {
          // eslint-disable-next-line no-restricted-globals
          const confirmation = confirm("Wirklich alle Spieler entfernen?");
          confirmation && setPlayers([]);
        }}
      >
        Zurücksetzen
      </button>
      <AddPlayerForm />
      <div style={{ margin: "0 auto", width: "80%" }}>
        <h2 style={{ textDecoration: "underline" }}>SPIELER</h2>
        <ul style={{ listStyle: "none" }}>
          {players
            .sort((a, b) => a.id - b.id)
            .map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
        </ul>
        <h2 style={{ textDecoration: "underline" }}>SPIELE</h2>
        <ul style={{ listStyle: "none" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/hunter">
            <h3>HUNTER</h3>
          </Link>

          <li>
            <Link style={{ color: "white", textDecoration: "none" }} to="/301">
              <h3>301</h3>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

function AddPlayerForm() {
  const [newPlayer, setNewPlayer] = useStickyState<{
    name: string;
    number: number | undefined;
  }>({ name: "", number: undefined }, "user-form");
  const players = usePlayers();
  const setPlayers = useSetPlayers();

  function onAddNewPlayer(newPlayer: {
    name: string;
    number: number | undefined;
  }) {
    const newPlayerN = players.find((p) => p.name === newPlayer.name)
      ? `${newPlayer.name}2`
      : newPlayer.name;

    setPlayers([
      ...players,
      {
        id: players.length,
        name: newPlayerN,
        hits: [false, false, false],
        lives: [false, false, false],
        number: newPlayer.number,
      },
    ]);
  }

  return (
    <form
      onSubmit={() => {
        onAddNewPlayer(newPlayer);
        setNewPlayer({ name: "", number: undefined });
      }}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ alignSelf: "flex-start", width: "80%", margin: "0 auto" }}>
        <label htmlFor="newPlayerName" style={{ display: "block" }}>
          Name
        </label>
        <input
          style={{ ...inputStyle, width: "100%" }}
          autoComplete="off"
          id="newPlayerName"
          type="text"
          required
          value={newPlayer.name}
          onChange={(event) =>
            setNewPlayer({ ...newPlayer, name: event.target.value })
          }
        ></input>
      </div>
      <button style={buttonStyle}>Hinzufügen</button>
    </form>
  );
}

export const inputStyle: CSSProperties = {
  textAlign: "center",
  backgroundColor: "transparent",
  color: "white",
  border: "none",
  borderBottom: "solid 2px white",
  fontSize: 20,
  borderRadius: 0,
};
