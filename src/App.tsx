import React from "react";

type Player = {
  order: number;
  name: string;
  lives: [true | false, true | false, true | false];
  hits: [true | false, true | false, true | false];
  number: string;
};

const buttonStyle = {
  display: "block",
  width: "80%",
  padding: 10,
  margin: "20px auto",
};

export function App() {
  const [newPlayerName, setNewPlayerName] = React.useState("");
  const [newPlayerNumber, setNewPlayerNumber] = React.useState("");
  const [players, setPlayers] = useStickyState<Player[]>([], "");

  function onAddNewPlayer() {
    setPlayers([
      ...players,
      {
        order: players.length,
        name: newPlayerName,
        hits: [false, false, false],
        lives: [false, false, false],
        number: newPlayerNumber,
      },
    ]);
  }

  return (
    <main
      style={{
        fontFamily: "arial",
        backgroundColor: "black",
        color: "white",
        padding: 20,
        boxSizing: "border-box",
        margin: 0,
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <h1 style={{ letterSpacing: 3, textAlign: "center" }}>HUNTER</h1>
      <button style={buttonStyle} onClick={() => setPlayers([])}>
        Zurücksetzen
      </button>
      <form
        onSubmit={onAddNewPlayer}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ margin: "0 auto" }}>
          <label
            style={{ flexBasis: "100px", display: "block" }}
            htmlFor="newPlayerName"
          >
            Name
          </label>
          <input
            style={{ flexBasis: "60%" }}
            id="newPlayerName"
            type="text"
            value={newPlayerName}
            onChange={(event) => setNewPlayerName(event.target.value)}
          ></input>
        </div>
        <div style={{ margin: "0 auto" }}>
          <label
            style={{ flexBasis: "100px", display: "block", marginTop: 10 }}
            htmlFor="newPlayerNumber"
          >
            Nummer
          </label>
          <input
            style={{ flexBasis: "60%" }}
            id="newPlayerNumber"
            type="number"
            value={newPlayerNumber}
            onChange={(event) => setNewPlayerNumber(event.target.value)}
          ></input>
        </div>
        <button style={buttonStyle}>Hinzufügen</button>
      </form>
      <div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {players
            .sort((p1, p2) => p1.order - p2.order)
            .map((player) => (
              <li key={player.name} style={{ marginBottom: 30 }}>
                <span style={{ fontSize: 40 }}>{player.name}</span>{" "}
                <span style={{ fontSize: 45, fontWeight: 600, marginLeft: 20 }}>
                  {player.number}
                </span>
                <div style={{ display: "flex" }}>
                  <div>
                    <div style={{ marginTop: 30 }}>Treffer</div>
                    {player.hits.map((hit, index) => {
                      return (
                        <Icon
                          style={{ opacity: hit ? 1 : 0.4, marginLeft: 10 }}
                          key={`${player.name}-hit-${index}`}
                          onClick={() => {
                            const updatePlayer = players.find(
                              (p) => p.name === player.name
                            );
                            if (updatePlayer) {
                              updatePlayer.hits[index] = !hit;
                              setPlayers([
                                ...players.filter(
                                  (p) => p.name !== player.name
                                ),
                                updatePlayer,
                              ]);
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                  <div style={{ marginLeft: 40 }}>
                    <div style={{ marginTop: 30 }}>Leben</div>
                    {player.lives.map((alive, index) => {
                      return (
                        <LifeIcon
                          style={{ opacity: alive ? 0.2 : 1, marginLeft: 10 }}
                          key={`${player.name}-live-${index}`}
                          onClick={() => {
                            const updatePlayer = players.find(
                              (p) => p.name === player.name
                            );
                            if (updatePlayer) {
                              updatePlayer.lives[index] = !alive;
                              setPlayers([
                                ...players.filter(
                                  (p) => p.name !== player.name
                                ),
                                updatePlayer,
                              ]);
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}

function useStickyState<A>(
  defaultValue: A,
  key: string
): [A, React.Dispatch<React.SetStateAction<A>>] {
  const [value, setValue] = React.useState<A>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function Icon(props: any) {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" {...props}>
      <rect width="24" height="24" fill="none" rx="0" ry="0" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 12C2 6.68481 6.14679 2.33816 11.3816 2.0188C11.1659 2.24117 9.10879 4.42412 8.03923 7.86041C6.74259 7.20576 5.62999 6.23971 4.79972 5.06055C4.51421 5.35673 4.24679 5.67048 3.99927 6.00001C4.97077 7.29341 6.2486 8.34357 7.72504 9.04278C7.52269 9.96004 7.40004 10.9494 7.40004 12C7.40004 13.0507 7.52269 14.04 7.72504 14.9572C6.2486 15.6565 4.97077 16.7066 3.99927 18C2.74389 16.3287 2 14.2512 2 12ZM4.79972 18.9395C6.48504 20.6877 8.80112 21.8237 11.3816 21.9812C11.1657 21.7586 9.10873 19.5757 8.03923 16.1396C6.74259 16.7943 5.62999 17.7603 4.79972 18.9395ZM9.10624 15.6869C9.84408 18.3577 11.2125 20.3339 12 21.3124C12.7875 20.3339 14.156 18.3577 14.8938 15.6869C13.9875 15.3714 13.0138 15.2 12 15.2C10.9862 15.2 10.0125 15.3714 9.10624 15.6869ZM15.9608 16.1396C14.8913 19.5758 12.8343 21.7587 12.6185 21.9812C15.1989 21.8237 17.515 20.6877 19.2003 18.9395C18.37 17.7603 17.2574 16.7943 15.9608 16.1396ZM20.0007 18C21.2561 16.3287 22 14.2512 22 12C22 6.68484 17.8533 2.33821 12.6185 2.0188C12.8343 2.2413 14.8913 4.42422 15.9608 7.86038C17.2574 7.20573 18.37 6.23969 19.2003 5.06055C19.4858 5.35673 19.7532 5.67048 20.0007 6.00002C19.0292 7.29339 17.7514 8.34353 16.275 9.04275C16.4774 9.96001 16.6 10.9493 16.6 12C16.6 13.0507 16.4774 14.04 16.275 14.9573C17.7514 15.6565 19.0292 16.7066 20.0007 18ZM15.1659 9.48851C15.3135 10.2782 15.4 11.1174 15.4 12C15.4 12.8826 15.3135 13.7218 15.1658 14.5115C14.1709 14.1797 13.1064 14 12 14C10.8936 14 9.82911 14.1797 8.83421 14.5115C8.68658 13.7218 8.60004 12.8826 8.60004 12C8.60004 11.1175 8.68658 10.2782 8.83421 9.48853C9.82911 9.82032 10.8936 10 12 10C13.1065 10 14.1709 9.82032 15.1659 9.48851ZM14.8938 8.31314C14.156 5.64228 12.7875 3.66613 12 2.6876C11.2126 3.66613 9.84408 5.64228 9.10624 8.31316C10.0125 8.6286 10.9862 8.80002 12 8.80002C13.0138 8.80002 13.9875 8.62858 14.8938 8.31314Z"
        fill="#22a6b3"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.1625 14.5104C15.3121 13.7155 15.4 12.8703 15.4 11.9811C15.4 11.1052 15.3147 10.2719 15.1691 9.48743C14.1733 9.81992 13.1077 10 12 10C10.8923 10 9.8267 9.81992 8.83084 9.48741C8.68523 10.2719 8.59998 11.1052 8.59998 11.9811C8.59998 12.8703 8.68783 13.7156 8.83749 14.5104C9.83145 14.1793 10.8948 14 12 14C13.1052 14 14.1685 14.1793 15.1625 14.5104ZM14.889 15.6852C13.9841 15.3708 13.012 15.2 12 15.2C10.988 15.2 10.0159 15.3708 9.11096 15.6852C9.84992 18.3474 11.2142 20.3171 12 21.2935C12.7858 20.3171 14.15 18.3473 14.889 15.6852ZM9.10144 8.31148C10.0091 8.62799 10.9844 8.80002 12 8.80002C13.0155 8.80002 13.9909 8.62799 14.8985 8.3115C14.1618 5.63188 12.7892 3.64933 12 2.6687C11.2108 3.64933 9.83814 5.63187 9.10144 8.31148Z"
        fill="#ffffff"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.1691 9.48742C14.1733 9.81992 13.1077 10 12 10C10.8923 10 9.82673 9.81992 8.83087 9.48742C8.68525 10.2719 8.6 11.1052 8.6 11.9812C8.6 12.8703 8.68785 13.7156 8.8375 14.5104C9.83146 14.1793 10.8948 14 12 14C13.1052 14 14.1685 14.1793 15.1625 14.5104C15.3122 13.7156 15.4 12.8703 15.4 11.9812C15.4 11.1052 15.3147 10.2719 15.1691 9.48742ZM16.2788 9.04099C16.4789 9.95345 16.6 10.937 16.6 11.9812C16.6 13.0383 16.4758 14.0334 16.2712 14.9555C17.7457 15.653 19.0222 16.7004 19.9936 17.9906C21.2533 16.3177 22 14.2366 22 11.9812C22 9.50483 21.0999 7.23873 19.609 5.49219C19.6062 5.49512 19.6033 5.49806 19.6004 5.501C19.739 5.66294 19.8725 5.82936 20.0007 6.00002C19.0301 7.2923 17.7536 8.34177 16.2788 9.04099ZM7.72878 14.9555C6.25434 15.653 4.9778 16.7004 4.00635 17.9906C2.74669 16.3177 2 14.2366 2 11.9812C2 9.51145 2.8953 7.25085 4.37905 5.5062C4.38241 5.50854 4.38577 5.51088 4.38913 5.51322C4.25426 5.67131 4.12423 5.83365 3.99927 6.00001C4.96994 7.2923 6.24641 8.34177 7.72125 9.04099C7.52114 9.95345 7.4 10.937 7.4 11.9812C7.4 13.0383 7.52418 14.0334 7.72878 14.9555Z"
        fill="black"
        fill-opacity="0.3"
      />
    </svg>
  );
}

function LifeIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" {...props}>
      <rect width="24" height="24" fill="none" rx="0" ry="0" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.5 11H9.5V12H1V16H9.5V17H14.5V16H23V12H14.5V11Z"
        fill="#22a6b3"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.6 23H10C10.8019 23 11.522 22.6321 12 22.0567C12.4779 22.6321 13.198 23 13.9999 23H21.3999C22.2799 23 22.9999 22.28 22.9999 21.4V16H21.7999V21.4C21.7999 21.62 21.6199 21.8 21.3999 21.8H13.9999C13.2344 21.8 12.6072 21.1773 12.6 20.4134L12.6 20.4V17H11.3999V20.4L11.3999 20.4134C11.3927 21.1773 10.7655 21.8 10 21.8H2.6C2.38 21.8 2.2 21.62 2.2 21.4V16H1.00005V12H2.2V7.56C3.05 7.43 3.82 7.04 4.42 6.43C5.18 5.68 5.6 4.68 5.6 3.6V2.2H8.82L10.86 6.42C11.2066 7.14291 11.3963 7.94428 11.3999 8.7464L11.3999 8.77V11H12.6V8.77L12.6 8.7464C12.6036 7.94428 12.7933 7.14291 13.1399 6.42L15.1799 2.2H18.3999V3.6C18.3999 4.68 18.8199 5.68 19.5699 6.43C20.1799 7.04 20.9499 7.43 21.7999 7.56V12H22.9999V7C22.9999 6.67 22.7299 6.4 22.3999 6.4C21.6499 6.4 20.9499 6.11 20.4199 5.57C19.8899 5.05 19.5999 4.35 19.5999 3.6V1.6C19.5999 1.27 19.3299 1 18.9999 1H14.7999C14.5699 1 14.3599 1.13 14.2599 1.34L12.0599 5.9C12.0395 5.9423 12.0195 5.98483 12 6.02757C11.9804 5.98483 11.9604 5.9423 11.94 5.9L9.74 1.34C9.64 1.13 9.43 1 9.2 1H5C4.67 1 4.4 1.27 4.4 1.6V3.6C4.4 4.35 4.11 5.05 3.57 5.58C3.05 6.11 2.35 6.4 1.6 6.4C1.27 6.4 1 6.67 1 7V21.4C1 22.28 1.72 23 2.6 23Z"
        fill="#ffffff"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.5 11H14.5V13H9.5V11ZM9.5 15H14.5V17H9.5V15Z"
        fill="black"
        fill-opacity="undefined"
      />
    </svg>
  );
}
