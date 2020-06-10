import React from 'react'

export function useStickyState<A>(
  defaultValue: A,
  key: string
): [A, React.Dispatch<React.SetStateAction<A>>] {
  const [value, setValue] = React.useState<A>(() => {
    const stickyValue = window.localStorage.getItem(key)
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
  })
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}
