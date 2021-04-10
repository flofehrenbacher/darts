import { css, jsx } from '@emotion/core'
import React from 'react'
import { Link } from 'react-router-dom'

import { RestartIcon } from './components/icons'
import { theme } from './styles/theme'
import { useGoBack } from './utils/go-back'

/** @jsx jsx */

export const headerHeight = 60

export function Layout({
  children,
  title,
  pageType,
  rightIcon,
  resetGame,
}: {
  children: React.ReactNode
  pageType:
    | 'HUNTER'
    | '301'
    | 'HOME'
    | 'EDIT_PLAYER'
    | 'DEBUG'
    | 'CRICKET'
    | 'HALF_IT'
  title?: string
  rightIcon?: React.ReactNode
  resetGame?: () => void
}) {
  const goBack = useGoBack()

  return (
    <main
      style={{
        fontFamily: 'arial',
        backgroundColor: theme.dark,
        color: theme.white,
        margin: '0 auto',
        maxWidth: '500px',
        display: 'flex',
        minHeight: '100%',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: headerHeight,
          display: 'flex',
          background: rainbow,
          margin: 0,
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
            background: 'transparent',
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
                background: 'transparent',
                fontWeight: 500,
                color: 'white',
              }}
              onClick={goBack}
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
          }}
        >
          {resetGame && (
            <RestartIcon css={{ width: 40, height: 40 }} onClick={resetGame} />
          )}
          {rightIcon}
        </div>
      </div>
      <div
        css={{
          padding: 10,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {children}
      </div>
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
    color: white;
  `,
}

export const rainbow = `linear-gradient(217deg, rgba(0,0,255,.8), rgba(0,0,255,0.2) 70%),
linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0.2) 70%),
linear-gradient(336deg, rgba(255,0,0,.8), rgba(255,0,0,0.2) 70%)`
