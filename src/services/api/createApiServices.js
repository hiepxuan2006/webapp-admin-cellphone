import axios from "axios"
import { getAccessToken } from "../AuthService"

const _makeRequest = (createRequest) => async (args) => {
  const _headers = args.headers ? args.headers : {}

  const defaultHeaders = {}

  args = {
    ...args,
    headers: {
      ...defaultHeaders,
      ..._headers,
    },
  }

  try {
    const { data } = await createRequest(args)

    return data
  } catch (e) {
    throw e
  }
}

const _makeAuthRequest = (createRequest) => async (args) => {
  const requestHeaders = args.headers ? args.headers : {}
  const accessToken = getAccessToken()

  let headers = {
    Authorization: `Bearer ${accessToken}`,
    "cache-control": "no-cache",
  }

  args = {
    ...args,
    headers: {
      ...headers,
      ...requestHeaders,
    },
  }

  return await _makeRequest(createRequest)(args)
}
// eslint-disable-next-line import/no-anonymous-default-export
const createAPIServices = (_options = {}) => {
  const baseUrlValidated = _options.baseUrl
  const timeout = _options.timeout || 10000

  const configs = {
    baseURL: baseUrlValidated,
    timeout: timeout,
    validateStatus: function (status) {
      return status >= 200
    },
  }
  const instance = axios.create(configs)

  return {
    makeRequest: _makeRequest(instance),
    makeAuthRequest: _makeAuthRequest(instance),
  }
}
const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_BASE_DEV
const api = createAPIServices({ baseUrl })
export const uploadImage = (data, path) => {
  return api.makeRequest({
    url: `/upload/`,
    method: "post",
    data,
  })
}
export default createAPIServices
