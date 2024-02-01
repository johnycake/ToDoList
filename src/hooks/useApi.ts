import axios, { AxiosRequestHeaders } from 'axios'
import { useState } from 'react'
import { ApiMethodTypes } from '../api/types/Api'
import { BASE_PATH } from '../api/generated'

type UseApiProps<RES> = {
  onSuccess?: (data: RES) => unknown
  onError?: () => unknown
}

export const useApi = <REQ = unknown, RES = unknown>({ onSuccess, onError }: UseApiProps<RES>) => {
  type ApiProps = {
    url: string
    method: ApiMethodTypes
    reqData: REQ
    headers?: AxiosRequestHeaders
  }
  const [apiResponse, setApiResponse] = useState<RES>()
  const [apiError, setApiError] = useState<unknown>(null)
  const [apiLoading, setApiLoading] = useState(false)

  axios.defaults.baseURL = 'http://localhost' //BASE_PATH
  const defaultHeaders = {
    accept: 'application/json',
    'Content-Type': 'application/json'
  }

  const fetchData = async ({ url, method, reqData: data, headers }: ApiProps) => {
    try {
      const res = await axios.request<RES>({
        method,
        url,
        headers: headers ?? defaultHeaders,
        data
      })
      onSuccess?.(res.data) // --> wrap in useCallback() in the code
      setApiResponse(res.data)
    } catch (err) {
      onError?.() // --> wrap in useCallback() in the code
      setApiError(err)
    } finally {
      setApiLoading(false)
    }
  }

  const callApi = ({ url, method, reqData: data }: ApiProps) => {
    setApiLoading(true)
    fetchData({ url, method, reqData: data })
  }

  return { callApi, apiResponse, apiError, apiLoading }
}

/*
USAGE:
------

const {callApi, apiResponse, apiLoading, apiError} = useApi<Request, Response>()

callApi({
  url: '/login',
  method: ApiMethodTypes.POST,
  reqData: {
    passHash: 'dglubzdrg43zd68g4xd38hz3d6h513f5nz35xdfbsdv5zd43bzdf35bzd=zddn',
  },
})

  useEffect(() => {
    if (apiResponse?.errorCode != null) {
      console.log({apiError}) //TODO: presmerovat na error page, vyhodit hlasku, explodovat a tak dalej....
    }
  }, [apiError])

  useEffect(() => {
    if (apiResponse?.result === 'ok') {
      navigateTo(RouteNames.ROOT) //TODO: impolementovat nejaky ten token (vsak ich je tam dost) ...akoze som prihlaseny
    }
  }, [apiResponse])

  useCallBack(()=>{
    onSuccess(data){
      // BLABLA
    }
  })

*/
