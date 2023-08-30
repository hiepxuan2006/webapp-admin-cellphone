import createAPIServices from "./createApiServices"

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_BASE_DEV

const api = createAPIServices({ baseUrl })
export const createSlider = (data) => {
  return api.makeRequest({
    url: "/slider/create-slider",
    method: "post",
    data: data,
  })
}

export const getSlider = (params) => {
  return api.makeRequest({
    url: `/slider/get-sliders?${params}`,
    method: "get",
  })
}

export const getSliderById = (id) => {
  return api.makeRequest({
    url: `/slider/get-slider/${id}`,
    method: "get",
  })
}

export const deletedSlider = (id) => {
  return api.makeRequest({
    url: `/slider/delete-slider/${id}`,
    method: "delete",
  })
}
