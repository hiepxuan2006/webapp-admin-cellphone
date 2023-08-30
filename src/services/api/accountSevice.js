import createAPIServices from "./createApiServices"

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_BASE_DEV

const api = createAPIServices({ baseUrl })

export const getAccount = () => {
  return api.makeAuthRequest({
    url: "/account/get-account",
    method: "get",
  })
}

export const requestLogin = () => {
  return api.makeAuthRequest({
    url: "/account/admin/secret",
    method: "get",
  })
}

export const loginAccount = (data) => {
  return api.makeAuthRequest({
    url: "/account/admin/login",
    method: "post",
    data,
  })
}

export const getListAccount = (data) => {
  return api.makeAuthRequest({
    url: `/account/get-account?${data}`,
    method: "get",
  })
}

export const createAccount = (data) => {
  return api.makeAuthRequest({
    url: "/account/create-account",
    method: "post",
    data,
  })
}

export const getDetailAccount = (params) => {
  return api.makeAuthRequest({
    url: `/account/get-detail-account?id=${params}`,
    method: "get",
  })
}
