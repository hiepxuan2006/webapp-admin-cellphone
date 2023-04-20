import createAPIServices from "./createApiServices"

const baseUrl = "http://localhost:5005/post"

const api = createAPIServices({ baseUrl })

export const createTopic = (data) => {
  return api.makeRequest({
    url: "/create-topic",
    method: "post",
    data: data,
  })
}

export const getAllTopic = (data) => {
  return api.makeRequest({
    url: "/get-all-topic",
    method: "get",
  })
}

export const createNewsPaper = (data) => {
  return api.makeRequest({
    url: "/create-news-paper",
    method: "post",
    data,
  })
}

export const getAllPost = (data) => {
  return api.makeRequest({
    url: "/get-news-paper",
    method: "get",
  })
}

export const getPost = (data) => {
  return api.makeRequest({
    url: `/get-news-paper/${data}`,
    method: "get",
  })
}

export const updatePost = (id, data) => {
  return api.makeRequest({
    url: `/update/post/${id}`,
    method: "post",
    data,
  })
}
