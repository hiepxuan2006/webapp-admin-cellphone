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

export const changeStatusOrder = (params) => {
  return api.makeRequest({
    url: `/change-status-order?${params}`,
    method: "get",
  })
}

export const getCountDocument = () => {
  return api.makeAuthRequest({
    url: "/count-order",
    method: "get",
  })
}

export const getOrderByAccount = (params) => {
  return api.makeAuthRequest({
    url: `/get-order-by-account?id=${params}`,
    method: "get",
  })
}
