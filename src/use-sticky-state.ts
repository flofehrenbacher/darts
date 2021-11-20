import React from 'react'

const HunterVersionKey = 'hunter-version'
const CurrentVersion = 4

export function useStickyState<A>(defaultValue: A, key: string) {
  const [value, setValue] = React.useState<A>(() => {
    if (typeof window === 'undefined') return null

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

  return [value ?? defaultValue, setValue] as const
}
