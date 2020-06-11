import React from 'react'
import { LifeIcon } from './icons'
import { useStickyState } from './use-sticky-state'
import { Link, useHistory } from 'react-router-dom'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { theme } from './theme'

export function Layout({
  children,
  title,
  pageType: gameType,
}: {
  children: React.ReactNode
  pageType: 'HUNTER' | '301' | 'HOME' | 'EDIT_PLAYER'
  title?: string
}) {
  const [bonusAvailable, setBonusAvailble] = useStickyState<boolean>(
    true,
    'bonus-available'
  )

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
            backgroundColor: gameType !== 'HOME' ? theme.grey : 'none',
          }}
        >
          {gameType !== 'HOME' && (
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
        <Link
          style={{ textDecoration: 'none', color: theme.dark, flexGrow: 1 }}
          to="/"
        >
          <h1 css={styles.h1}>{title}</h1>
        </Link>
        <div
          style={{
            height: '100%',
            width: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: gameType === 'HUNTER' ? theme.grey : 'none',
          }}
        >
          {gameType === 'HUNTER' && (
            <LifeIcon
              style={{
                opacity: bonusAvailable ? 1 : 0.3,
              }}
              fillPrimary={theme.dark}
              fillSecondary={theme.dark}
              height={40}
              width={40}
              onClick={() => setBonusAvailble(!bonusAvailable)}
            />
          )}
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
