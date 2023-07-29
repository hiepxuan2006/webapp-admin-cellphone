import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { changeStatusOrder, getOrder } from "../../services/api/orderService"
import { Button, Col, Form, Row } from "react-bootstrap"
import moment from "moment"
import { formattedNumber } from "../../helpers/formatCurentcy"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"
import { toastAlert } from "../../helpers/toast"
import queryString from "query-string"
import { InvoiceOrder } from "./InvoiceOrder"

export const OrderDetail = () => {
  const [order, setOrder] = useState("")
  const { order_code } = useParams()
  const [status, setStatus] = useState()
  const [reload, setReload] = useState(true)
  const _getOrder = async () => {
    const { data, success, message } = await getOrder({ order_code })
    if (!success) throw new Error(message)
    setOrder(data)
  }

  useEffect(() => {
    _getOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])
  const onChangeStatusOrder = (e) => {
    setStatus(e.target.value)
  }
  const handleUpdateStatus = async (e, order) => {
    e.preventDefault()
    const { _id } = order

    const params = queryString.stringify(
      { status, _id },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    )
    const { success, message } = await changeStatusOrder(params)
    if (!success) {
      toastAlert("error", message)
      throw new Error(message)
    }
    setReload(!reload)
    toastAlert("success", "Update successfully")
  }
  return (
    <div className="OrderDetail">
      {order && (
        <>
          <Row>
            <Col md={8}>
              <div className="SectionInner">
                <div className="OrderDetailHeading">
                  <h1>Order #{order_code}</h1>
                  <div
                    className={`${order.paid ? "Paid" : "Unpaid"} OrderPaid`}
                  >
                    {order.paid ? "Paid" : "Unpaid"}
                  </div>
                  <div className="StatusOrder">{order.status}</div>
                  <div className="OrderAt">
                    <FontAwesomeIcon icon={faCalendarDay} />
                    <p>{moment(order.order_at).format("LTS L")}</p>
                  </div>

                  <div className="OrderAll">All order</div>
                </div>
                <span>Payment type : {order.payment_type}</span>
                <InvoiceOrder order={order} />
                <div className="ContentOrder mt-5">
                  <Row>
                    <Col md={12}>
                      <div className="">
                        <div className="d-flex mt-3 align-items-center">
                          <h4>Customer:</h4>
                          <p>{order.name}</p>
                        </div>
                        <div className="d-flex mt-3 align-items-center">
                          <h4>Shipping address:</h4>
                          <p>{order.shipping_address}</p>
                        </div>
                        <div className="d-flex mt-3 align-items-center">
                          <h4>Phone Number:</h4>
                          <p>{order.phone_number}</p>
                        </div>
                      </div>
                    </Col>
                    <Link to={"/a/admin/order/all"} className="mt-3">
                      <span>#Xem đơn hàng khác</span>
                    </Link>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="SectionInner">
                <h2>Change status order</h2>
                <Form.Select className="mt-3" onChange={onChangeStatusOrder}>
                  <option selected={order.status === "pending"} value="pending">
                    Đặt hàng thành công
                  </option>
                  <option
                    selected={order.status === "confirmed"}
                    value="confirmed"
                  >
                    Đã xác nhận
                  </option>
                  <option
                    selected={order.status === "processing"}
                    value="processing"
                  >
                    Đang chuẩn bị
                  </option>
                  <option
                    selected={order.status === "delivery"}
                    value="delivery"
                  >
                    Đang giao hàng
                  </option>
                  <option
                    selected={order.status === "delivered"}
                    value="delivered"
                  >
                    Đã giao hàng
                  </option>
                  <option
                    selected={order.status === "canceled"}
                    value="canceled"
                  >
                    Hủy đơn hàng
                  </option>
                </Form.Select>
                <Button
                  className="mt-3"
                  onClick={(e) => handleUpdateStatus(e, order)}
                >
                  Cập nhật
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <div className="SectionInner">
                <div className="ProductOrderItems">
                  <h2 className="mb-4 border-bottom">Order Details</h2>
                  <div className="OrderDetailNote mb-4 border-bottom">
                    <p>Order note:</p>
                    <p>{order.note}</p>
                  </div>
                  {order.order_item.map((item, key) => {
                    return (
                      <div className="ItemProductOrder border-bottom mb-4">
                        <div className="ImageProduct">
                          <img src={item.image_uris[0]} alt="" />
                        </div>
                        <div className="TitleProduct">
                          <p>
                            {item.product_variant_id.title} * ({item.quantity})
                          </p>
                        </div>
                        <div>
                          <p>
                            {formattedNumber(
                              item.price - (item.price * item.discount) / 100
                            )}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                  <div className="CalculatorPrice">
                    <div className="PriceItems d-flex gap-3 mt-3 justify-content-end">
                      <h4>Sub Total:</h4>
                      <p> &ensp; {formattedNumber(order.price_total)}</p>
                    </div>
                    <div className="PriceItems d-flex gap-3 mt-3 justify-content-end">
                      <h4>Coupon discount:</h4>
                      <p> &ensp; {formattedNumber(0)}</p>
                    </div>
                    <div className="PriceItems d-flex gap-3 mt-3 justify-content-end">
                      <h4>Shipping:</h4>
                      <p> &ensp; {formattedNumber(30000)}</p>
                    </div>
                    <div className="PriceItems d-flex gap-3 mt-5 justify-content-end">
                      <h4>Total:</h4>
                      <p> &ensp; {formattedNumber(order.price_total)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}
