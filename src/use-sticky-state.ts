import React from 'react'

const HunterVersionKey = 'hunter-version'
const CurrentVersion = 3

export function useStickyState<A>(
  defaultValue: A,
  key: string
): [A, React.Dispatch<React.SetStateAction<A>>] {
  const [value, setValue] = React.useState<A>(() => {
    const version = window.localStorage.getItem(HunterVersionKey) ?? 0
    if (Number(version) < CurrentVersion) {
      window.localStorage.setItem(HunterVersionKey, String(CurrentVersion))
      return defaultValue
    } else {
      const stickyValue = window.localStorage.getItem(key)
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
    }
  })
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}
