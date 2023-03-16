import { AppProps } from 'next/dist/shared/lib/router/router'
import { ThrowConfettiForProvider } from '../throw-confetti-provider'
import { SetPlayersProvider, PlayersProvider } from '../context'
import { Player, PlayersKey } from '../model/player'
import { useStickyState } from '../use-sticky-state'
import { css, Global } from '@emotion/react'
import { createStyles, MantineProvider } from '@mantine/core'
import emotionReset from 'emotion-reset'
import 'react-multi-carousel/lib/styles.css'
import '../styles/index.css'
import { useEffect, useState } from 'react'

export const useStyles = createStyles({})

export default function App({ Component, pageProps }: AppProps) {
  const [players, setPlayers] = useStickyState<Player[]>([], PlayersKey)

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
      }}
    >
      <SetPlayersProvider value={setPlayers}>
        <PlayersProvider
          value={(players ?? [])
            .sort((p1, p2) => p1.index - p2.index)
            .map((p, i) => ({ ...p, index: i }))}
        >
          <Global
            styles={css`
              ${emotionReset}

              *, *::after, *::before {
                box-sizing: border-box;
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
              }
            `}
          />
          <ThrowConfettiForProvider>
            <Component {...pageProps} />
          </ThrowConfettiForProvider>
        </PlayersProvider>
      </SetPlayersProvider>
    </MantineProvider>
  )
}
