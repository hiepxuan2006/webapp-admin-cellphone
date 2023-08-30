import createAPIServices from "./createApiServices"

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_BASE_DEV

const api = createAPIServices({ baseUrl })

export const getListOrders = (status) => {
  return api.makeRequest({
    url: `/order/get-orders?${status}`,
    method: "get",
  })
}

export const getOrder = (data) => {
  return api.makeRequest({
    url: "/order/get-order-by-code",
    method: "post",
    data,
  })
}

export const analyticOrder = () => {
  return api.makeRequest({
    url: `/order/analytic-order/get-order-by-date`,
    method: "get",
  })
}

export const changeStatusOrder = (params) => {
  return api.makeRequest({
    url: `/order/change-status-order?${params}`,
    method: "get",
  })
}

export const getCountDocument = () => {
  return api.makeAuthRequest({
    url: "/order/count-order",
    method: "get",
  })
}

export const getOrderByAccount = (params) => {
  return api.makeAuthRequest({
    url: `/order/get-order-by-account?id=${params}`,
    method: "get",
  })
}
