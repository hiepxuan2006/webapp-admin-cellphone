import createAPIServices from "./createApiServices"

const baseUrl = "http://localhost:5005/slider/"

const api = createAPIServices({ baseUrl })
export const createSlider = (data) => {
  return api.makeRequest({
    url: "/create-slider",
    method: "post",
    data: data,
  })
}

export const getSlider = (params) => {
  return api.makeRequest({
    url: `/get-sliders?${params}`,
    method: "get",
  })
}

export const getSliderById = (id) => {
  return api.makeRequest({
    url: `/get-slider/${id}`,
    method: "get",
  })
}

export const deletedSlider = (id) => {
  return api.makeRequest({
    url: `/delete-slider/${id}`,
    method: "delete",
  })
}
