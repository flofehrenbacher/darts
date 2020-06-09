import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { inputStyle } from "./add-player";
import { buttonStyle, Player } from "./App";
import { usePlayers, useSetPlayers } from "./context";
import { Layout } from "./layout";

export function EditPlayer() {
  const { id } = useParams();
  const players = usePlayers();
  const player = players.find((p) => {
    return p.id === Number(id);
  });
  if (player === undefined) {
    throw new Error(`Player with id ${id} does not exist`);
  }
  return (
    <Layout title={player.name}>
      <EditPlayerForm player={player} />
    </Layout>
  );
}

function EditPlayerForm({ player }: { player: Player }) {
  const [inputFields, setInputFields] = React.useState<{
    name?: string;
    number?: number;
  }>({ name: player.name, number: player.number });
  const players = usePlayers();
  const setPlayers = useSetPlayers();
  const history = useHistory();

  function onEditPlayer() {
    setPlayers([
      ...players.filter((p) => p.id !== player.id),
      {
        ...player,
        ...inputFields,
      },
    ]);
    history.goBack();
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onEditPlayer();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
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
          value={inputFields.name}
          onChange={(event) =>
            setInputFields({ ...inputFields, name: event.target.value })
          }
        ></input>
      </div>
      <div style={{ alignSelf: "flex-start", width: "80%", margin: "0 auto" }}>
        <label
          style={{ marginTop: 10, display: "block" }}
          htmlFor="newPlayerNumber"
        >
          Nummer
        </label>
        <input
          style={{
            ...inputStyle,
            margin: "0 auto",
            display: "block",
          }}
          autoComplete="off"
          id="newPlayerNumber"
          type="number"
          pattern="\d*"
          required
          value={inputFields.number}
          onChange={(event) =>
            setInputFields({
              ...inputFields,
              number: Number(event.target.value),
            })
          }
        ></input>
      </div>
      <button style={buttonStyle}>Ändern</button>
    </form>
  );
}
