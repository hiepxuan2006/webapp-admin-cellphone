import createAPIServices from "./createApiServices"

const baseUrl = `${process.env.REACT_APP_BASE_URL}/order`

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
