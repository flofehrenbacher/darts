import { useHistory } from 'react-router-dom'

export function useGoBack() {
  const h = useHistory()
  if (h.length > 1) {
    return () => h.goBack()
  } else {
    return () => h.push('/home')
  }
}
