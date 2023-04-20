import createAPIServices from "./createApiServices"

const baseUrl = `${process.env.REACT_APP_BASE_URL}/category`

const api = createAPIServices({ baseUrl })

export const getCategories = () => {
  return api.makeRequest({
    url: "/get-categories",
    method: "get",
  })
}

export const createCategory = (data) => {
  return api.makeRequest({
    url: "create-category",
    method: "post",
    data,
  })
}

export const getCategoriesById = (id) => {
  return api.makeRequest({
    url: `/get-category/${id}`,
    method: "get",
  })
}

export const getCategoryChildren = (id) => {
  return api.makeRequest({
    url: `/get-category-children/${id}`,
    method: "get",
  })
}
export const getCategoryParent = (id) => {
  return api.makeRequest({
    url: `/get-category-parent`,
    method: "get",
  })
}

export const deleteCategory = (id) => {
  return api.makeRequest({
    url: `/delete-category/${id}`,
    method: "delete",
  })
}
