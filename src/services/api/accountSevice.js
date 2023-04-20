import createAPIServices from "./createApiServices"

const baseUrl = `${process.env.REACT_APP_BASE_URL}/account`

const api = createAPIServices({ baseUrl })

export const getAccount = () => {
  return api.makeRequest({
    url: "/get-account",
    method: "get",
  })
}

export const requestLogin = () => {
  return api.makeAuthRequest({
    url: "/admin/secret",
    method: "get",
  })
}

export const loginAccount = (data) => {
  return api.makeRequest({
    url: "/admin/login",
    method: "post",
    data,
  })
}

export const getListAccount = () => {
  return api.makeAuthRequest({
    url: "/get-account",
    method: "get",
  })
}
