import { css } from '@emotion/react'
import Link from 'next/link'
import { RestartIcon } from './components/icons'
import { theme } from './styles/theme'
import { useGoBack } from './utils/go-back'

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
      css={{
        fontFamily: 'arial',
        backgroundColor: theme.white,
        color: theme.darker,
        margin: '0 auto',
        maxWidth: '500px',
        display: 'flex',
        minHeight: '100%',
        flexDirection: 'column',
      }}
    >
      <div
        css={{
          height: headerHeight,
          display: 'flex',
          backgroundImage:
            'linear-gradient(20deg, rgb(34, 139, 230) 0%, rgb(18, 184, 134) 100%)',
          margin: 0,
          overflow: 'hidden',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div
          css={{
            height: '100%',
            width: 60,
            background: 'transparent',
          }}
        >
          {pageType !== 'HOME' && (
            <button
              css={{
                height: '100%',
                width: '100%',
                display: 'block',
                border: 'none',
                fontSize: 24,
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
          css={{
            height: '100%',
            width: 60,
          }}
        ></div>
        <Link
          href="/"
          css={{ textDecoration: 'none', color: theme.white, flexGrow: 1 }}
        >
          <h1 css={styles.h1}>{title}</h1>
        </Link>
        <div
          css={{
            height: '100%',
            width: 120,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {resetGame && (
            <RestartIcon
              css={{ width: 40, height: 40 }}
              onClick={() => resetGame()}
            />
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
