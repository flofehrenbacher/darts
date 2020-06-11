import React from 'react'
import { Link, useHistory } from 'react-router-dom'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { theme } from './theme'
import { RestartIcon } from './icons'

export function Layout({
  children,
  title,
  pageType,
  rightIcon,
  resetGame,
}: {
  children: React.ReactNode
  pageType: 'HUNTER' | '301' | 'HOME' | 'EDIT_PLAYER'
  title?: string
  rightIcon?: React.ReactNode
  resetGame?: () => void
}) {
  const history = useHistory()

  return (
    <main
      style={{
        fontFamily: 'arial',
        backgroundColor: theme.dark,
        color: theme.white,
        margin: '0 auto',
        maxWidth: '500px',
        overflowY: 'scroll',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: 60,
          display: 'flex',
          backgroundColor: theme.white,
          margin: 0,
          color: 'black',
          overflow: 'hidden',
          position: 'sticky',
          top: 0,
          left: 0,
          borderBottom: 'solid 2px grey',
          zIndex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: '100%',
            width: 60,
            backgroundColor: pageType !== 'HOME' ? theme.grey : 'none',
          }}
        >
          {pageType !== 'HOME' && (
            <button
              style={{
                height: '100%',
                width: '100%',
                display: 'block',
                border: 'none',
                fontSize: 20,
                fontWeight: 500,
              }}
              onClick={() => history.goBack()}
            >
              ←
            </button>
          )}
        </div>
        <div
          style={{
            height: '100%',
            width: 60,
          }}
        ></div>
        <Link
          style={{ textDecoration: 'none', color: theme.dark, flexGrow: 1 }}
          to="/"
        >
          <h1 css={styles.h1}>{title}</h1>
        </Link>
        <div
          style={{
            height: '100%',
            width: 120,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor:
              rightIcon !== undefined || resetGame !== undefined
                ? theme.grey
                : 'none',
          }}
        >
          {resetGame && (
            <RestartIcon css={{ width: 40, height: 40 }} onClick={resetGame} />
          )}
          {rightIcon}
        </div>
      </div>
      <div css={{ padding: 5, flexGrow: 1 }}>{children}</div>
    </main>
  )
}

const styles = {
  h1: css`
    margin: 0;
    padding: 0;
    display: block;
    letter-spacing: 4px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  `,
}
