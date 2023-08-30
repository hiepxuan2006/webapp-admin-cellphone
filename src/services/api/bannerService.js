import createAPIServices from "./createApiServices"

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_BASE_DEV

const api = createAPIServices({ baseUrl })

export const createBanner = (data) => {
  return api.makeRequest({
    url: "/banner/create",
    method: "post",
    data,
  })
}

export const getAllBanner = (data) => {
  return api.makeAuthRequest({
    url: `/banner/get-all-banner?${data}`,
    method: "get",
  })
}
