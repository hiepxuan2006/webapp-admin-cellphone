import createAPIServices from "./createApiServices"

const baseUrl = `${process.env.REACT_APP_BASE_URL}/product`

const api = createAPIServices({ baseUrl })

export const createProduct = (data) => {
  return api.makeRequest({
    url: "/create-product",
    method: "post",
    data: data,
  })
}

export const getProducts = (params) => {
  return api.makeRequest({
    url: `/get-products?${params}`,
    method: "get",
  })
}

export const deleteProducts = (params) => {
  return api.makeRequest({
    url: `/delete-product/${params}`,
    method: "delete",
  })
}

export const getListProduct = (data) => {
  return api.makeRequest({
    url: "/search-product",
    method: "post",
    data: data,
  })
}
export const relationProduct = (data) => {
  return api.makeRequest({
    url: "/relation-product",
    method: "post",
    data: data,
  })
}
// ////////
export const createKeyWord = (data) => {
  return api.makeRequest({
    url: `/key_word/create_key`,
    method: "post",
    data,
  })
}

export const getTags = (params) => {
  return api.makeRequest({
    url: `/key_word/get_key_words`,
    method: "get",
  })
}
