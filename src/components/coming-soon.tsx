import React from 'react'
import { useThrowConfettiFor } from '../app'
import { Layout } from '../layout'
import { css, jsx } from '@emotion/react'
/** @jsxRuntime classic */
/** @jsx jsx */

export function ComingSoon() {
  const throwConfetti = useThrowConfettiFor()
  React.useEffect(() => {
    throwConfetti()
  })

  function resetGame() {
    throwConfetti()
  }

  return (
    <Layout pageType="HALF_IT" title="half it!" resetGame={resetGame}>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 1;

          animation: text-shadow 1.5s ease-in-out infinite;
          font-size: 5em;
          font-weight: 900;
          line-height: 1;
          text-align: center;

          @keyframes text-shadow {
            0% {
              transform: translateY(0);
              text-shadow: 0 0 0 #0c2ffb, 0 0 0 #2cfcfd, 0 0 0 #fb203b,
                0 0 0 #fefc4b;
            }

            20% {
              transform: translateY(-1em);
              text-shadow: 0 0.125em 0 #0c2ffb, 0 0.25em 0 #2cfcfd,
                0 -0.125em 0 #fb203b, 0 -0.25em 0 #fefc4b;
            }

            40% {
              transform: translateY(0.5em);
              text-shadow: 0 -0.0625em 0 #0c2ffb, 0 -0.125em 0 #2cfcfd,
                0 0.0625em 0 #fb203b, 0 0.125em 0 #fefc4b;
            }

            60% {
              transform: translateY(-0.25em);
              text-shadow: 0 0.03125em 0 #0c2ffb, 0 0.0625em 0 #2cfcfd,
                0 -0.03125em 0 #fb203b, 0 -0.0625em 0 #fefc4b;
            }

            80% {
              transform: translateY(0);
              text-shadow: 0 0 0 #0c2ffb, 0 0 0 #2cfcfd, 0 0 0 #fb203b,
                0 0 0 #fefc4b;
            }
          }
        `}
      >
        COMING SOON!
      </div>
    </Layout>
  )
}
