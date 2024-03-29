import createAPIServices from "./createApiServices"

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_BASE_DEV

const api = createAPIServices({ baseUrl })

export const getCategories = () => {
  return api.makeRequest({
    url: "/category/get-categories",
    method: "get",
  })
}

export const createCategory = (data) => {
  return api.makeRequest({
    url: "/categorycreate-category",
    method: "post",
    data,
  })
}

export const getCategoriesById = (id) => {
  return api.makeRequest({
    url: `/category/get-category/${id}`,
    method: "get",
  })
}

export const getCategoryChildren = (id) => {
  return api.makeRequest({
    url: `/category/get-category-children/${id}`,
    method: "get",
  })
}
export const getCategoryParent = (id) => {
  return api.makeRequest({
    url: `/category/get-category-parent`,
    method: "get",
  })
}

export const deleteCategory = (id) => {
  return api.makeRequest({
    url: `/category/delete-category/${id}`,
    method: "delete",
  })
}
