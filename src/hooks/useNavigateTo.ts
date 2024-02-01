import { createSearchParams, To, useNavigate } from 'react-router-dom'
import { PageParams } from '../api/types'

export const useNavigateTo = () => {
  const navigate = useNavigate()

  const routeAssembly = (page: string[]) => {
    let path = ''
    page.forEach((p) => {
      path = path + '/' + p
    })
    return path
  }

  const page = (...path: string[]) => {
    navigate(routeAssembly(path) as To)
  }

  const withQuery = (pageParams?: PageParams, ...path: string[]) => {
    navigate({
      pathname: routeAssembly(path).toString(),
      search: createSearchParams({ ...pageParams }).toString()
    })
  }

  const withState = (pageParams?: PageParams, ...path: string[]) => {
    navigate(routeAssembly(path).toString(), { state: { ...pageParams } })
  }

  return { withQuery, withState, page }
}
