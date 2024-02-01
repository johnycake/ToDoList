import { useCallback, useRef } from 'react'

export const useNoRenderState: <S>(initialState: S) => [S, (newState: S) => void] = (
  initialState
) => {
  const stateRef = useRef(initialState)
  const setState = useCallback((newState: typeof initialState) => {
    stateRef.current = newState
  }, [])
  return [stateRef.current, setState]
}
