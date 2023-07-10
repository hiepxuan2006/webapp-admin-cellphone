import createAPIServices from "./createApiServices"

const baseUrl = `${process.env.REACT_APP_BASE_URL}/order`

const api = createAPIServices({ baseUrl })

export const getListOrders = (status) => {
  return api.makeRequest({
    url: `/get-orders?${status}`,
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

export const analyticOrder = () => {
  return api.makeRequest({
    url: `/analytic-order/get-order-by-date`,
    method: "get",
  })
}
