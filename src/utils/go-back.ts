import { useRouter } from 'next/dist/client/router'

export function useGoBack() {
  const { back } = useRouter()
  return back
}
