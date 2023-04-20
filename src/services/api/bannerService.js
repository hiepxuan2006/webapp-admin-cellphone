import createAPIServices from "./createApiServices"

const baseUrl = "http://localhost:5005/banner"

const api = createAPIServices({ baseUrl })

export const createBanner = (data) => {
  return api.makeRequest({
    url: "/create",
    method: "post",
    data,
  })
}
