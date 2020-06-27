import { css, jsx } from '@emotion/core'
import React from 'react'
import { Link } from 'react-router-dom'

import { RestartIcon } from './components/icons'
import { theme } from './styles/theme'
import { useGoBack } from './utils/go-back'

/** @jsx jsx */

export function Layout({
  children,
  title,
  pageType,
  rightIcon,
  resetGame,
}: {
  children: React.ReactNode
  pageType: 'HUNTER' | '301' | 'HOME' | 'EDIT_PLAYER' | 'DEBUG' | 'CRICKET'
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
      <div
        css={{
          padding: 5,
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
  `,
}
