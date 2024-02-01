import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { PageParams } from '../api/types'

export const useQueryParams = () => {
  const { search } = useLocation()
  const query = useMemo(() => new URLSearchParams(search), [search])
  const pageParams: PageParams = {}
  query.forEach((val, key: string) => {
    pageParams[key as keyof PageParams] = val ? val : undefined
  })
  return pageParams
}
