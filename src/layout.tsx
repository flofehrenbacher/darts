import React from "react";
import { LifeIcon } from "./icons";
import { useStickyState } from "./use-sticky-state";
import { Link, useHistory } from "react-router-dom";

export function Layout({
  children,
  title,
  gameType,
}: {
  children: React.ReactNode;
  title?: string;
  gameType?: "HUNTER";
}) {
  const [bonusAvailable, setBonusAvailble] = useStickyState<boolean>(
    true,
    "bonus-available"
  );

  const history = useHistory();

  return (
    <main
      style={{
        fontFamily: "arial",
        backgroundColor: "black",
        color: "white",
        margin: "0 auto",
        height: "100vh",
        width: "100vw",
        maxWidth: "800px",
        overflowY: "scroll",
        scrollSnapType: "y proximity",
        scrollPaddingTop: 40,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          height: 40,
          display: "flex",
          backgroundColor: "white",
          margin: 0,
          color: "black",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          left: 0,
          borderBottom: "solid 2px grey",
          zIndex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ flexBasis: "10%", height: "100%" }}>
          <button style={{ height: "100%" }} onClick={() => history.goBack()}>
            ←
          </button>
        </div>
        <Link
          style={{ textDecoration: "none", color: "black", flexGrow: 2 }}
          to="/"
        >
          <h1
            style={{
              margin: 0,
              padding: 0,
              display: "block",
              letterSpacing: 4,
              textAlign: "center",
            }}
          >
            {title}
          </h1>
        </Link>
        <div style={{ flexBasis: "10%", height: "100%" }}>
          {gameType === "HUNTER" && (
            <LifeIcon
              style={{
                opacity: bonusAvailable ? 1 : 0.3,
              }}
              fillPrimary="darkred"
              fillSecondary="darkred"
              height={40}
              width={40}
              onClick={() => setBonusAvailble(!bonusAvailable)}
            />
          )}
        </div>
      </div>
      {children}
    </main>
  );
}
