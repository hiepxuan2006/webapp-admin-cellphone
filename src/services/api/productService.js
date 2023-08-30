import createAPIServices from "./createApiServices"

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_BASE_DEV

const api = createAPIServices({ baseUrl })

export const createProduct = (data) => {
  return api.makeAuthRequest({
    url: "/product/create-product",
    method: "post",
    data: data,
  })
}

export const getProducts = (params) => {
  return api.makeRequest({
    url: `/product/get-products?${params}`,
    method: "get",
  })
}

export const deleteProducts = (params) => {
  return api.makeRequest({
    url: `/product/delete-product/${params}`,
    method: "delete",
  })
}

export const getListProduct = (data) => {
  return api.makeRequest({
    url: "/product/search-product",
    method: "post",
    data: data,
  })
}
export const relationProduct = (data) => {
  return api.makeRequest({
    url: "/product/relation-product",
    method: "post",
    data: data,
  })
}
// ////////
export const createKeyWord = (data) => {
  return api.makeRequest({
    url: `/product/key_word/create_key`,
    method: "post",
    data,
  })
}

export const getTags = (params) => {
  return api.makeRequest({
    url: `/product/key_word/get_key_words`,
    method: "get",
  })
}

export const changeStatusSpecial = (params) => {
  const { id, status } = params
  return api.makeAuthRequest({
    url: `/product/change-status-special?id=${id}&status=${status}`,
    method: "get",
  })
}
