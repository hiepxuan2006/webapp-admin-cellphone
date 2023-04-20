import createAPIServices from "./createApiServices"

const baseUrl = `${process.env.REACT_APP_BASE_URL}/banner`

const api = createAPIServices({ baseUrl })

export const createBanner = (data) => {
  return api.makeRequest({
    url: "/create",
    method: "post",
    data,
  })
}
