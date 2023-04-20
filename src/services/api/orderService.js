import createAPIServices from "./createApiServices"

const baseUrl = "http://localhost:5005/order"

const api = createAPIServices({ baseUrl })

export const getListOrders = () => {
  return api.makeRequest({
    url: "/get-orders",
    method: "get",
  })
}

export const getOrder = (data) => {
  return api.makeRequest({
    url: "/get-order-by-code",
    method: "post",
    data,
  })
}
