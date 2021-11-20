import React from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { createDeferredPromise } from './utils/deferred-promise'

export const ConfettiDuration = 3000

const ThrowConfettiForContext = React.createContext<
  undefined | (() => Promise<void>)
>(undefined)

export function ThrowConfettiForProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [throwConfetti, setThrowConfetti] = React.useState(false)
  const { width, height } = useWindowSize()

  const [onConfettiComplete, setOnConfettiComplete] = React.useState(() =>
    createDeferredPromise<void>()
  )

  return (
    <ThrowConfettiForContext.Provider
      value={() => {
        setThrowConfetti(true)
        return onConfettiComplete.promise
      }}
    >
      {throwConfetti && (
        <Confetti
          recycle={false}
          width={width}
          height={height}
          tweenDuration={ConfettiDuration}
          numberOfPieces={1000}
          onConfettiComplete={() => {
            setThrowConfetti(false)
            onConfettiComplete.resolve()
            setOnConfettiComplete(createDeferredPromise<void>())
          }}
        ></Confetti>
      )}
      {children}
    </ThrowConfettiForContext.Provider>
  )
}

export function useThrowConfettiFor() {
  const throwConfettiFor = React.useContext(ThrowConfettiForContext)
  if (throwConfettiFor === undefined) {
    throw Error(
      `useThrowConfettiFor must be used withtin a ThrowConfettiForProvider`
    )
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(throwConfettiFor, [])
}
