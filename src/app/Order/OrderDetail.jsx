import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getOrder } from "../../services/api/orderService"
import { Button, Col, Form, Row } from "react-bootstrap"
import moment from "moment"
import { formattedNumber } from "../../helpers/formatCurentcy"

export const OrderDetail = () => {
  const [order, setOrder] = useState("")
  const { order_code } = useParams()

  const _getOrder = async () => {
    const { data, success, message } = await getOrder({ order_code })
    if (!success) throw new Error(message)
    setOrder(data)
  }

  useEffect(() => {
    _getOrder()
  }, [])
  console.log(order)
  return (
    <div className="OrderDetail">
      {order && (
        <>
          <Row>
            <Col md={8}>
              <div className="SectionInner">
                <h1>Chi tiết đơn hàng #{order_code}</h1>
                <span>Hình thức thanh toán : {order.payment_type}</span>
                <div className="ContentOrder mt-5">
                  <Row>
                    <Col md={5}>
                      <div className="">
                        <h2>Chung</h2>
                        <div className="mt-3">
                          <h4>Ngày tạo</h4>
                          <span>{moment(order.order_at).format("LTS L")}</span>
                        </div>
                        <div className="mt-3">
                          <h4>Trạng thái đơn hàng</h4>
                          <Form.Select>
                            <option
                              selected={order.status === "processing"}
                              value="1"
                            >
                              Chờ xác nhận
                            </option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </div>
                        <div className="mt-3">
                          <h4>Khách hàng</h4>
                          <span>{order.name}</span>
                        </div>
                      </div>
                    </Col>

                    <Col md={7}>
                      <div className="">
                        <h2>Giao hàng</h2>
                        <div className="d-flex mt-3 align-items-center">
                          <h4>Người nhận:</h4>
                          <p>{order.name}</p>
                        </div>
                        <div className="d-flex mt-3 align-items-center">
                          <h4>Địa chỉ giao hàng:</h4>
                          <p>{order.shipping_address}</p>
                        </div>
                        <div className="d-flex mt-3 align-items-center">
                          <h4>Số điện thoại:</h4>
                          <p>{order.phone_number}</p>
                        </div>
                      </div>
                    </Col>
                    <Link to={"/a/admin/order"} className="mt-3">
                      <span>#Xem đơn hàng khác</span>
                    </Link>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="SectionInner">
                <h2>Cập nhật trạng thái đơn hàng</h2>
                <Form.Select className="mt-3">
                  <option selected={order.status === "processing"} value="1">
                    Chờ xác nhận
                  </option>
                  <option value="2">Đã xác nhận</option>
                  <option value="2">Đang chuẩn bị hàng</option>
                  <option value="3">Đang gửi hàng</option>
                  <option value="3">Gửi hàng thành công</option>
                </Form.Select>
                <Button className="mt-3">Cập nhật</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <div className="SectionInner">
                <h2 className="mb-5">Sản phẩm</h2>
                {order.order_item.map((item, key) => {
                  return (
                    <div className="ItemProduct">
                      <div className="ImageProduct">
                        <img
                          src={item.product_variant_id.image_uris[0]}
                          alt=""
                        />
                      </div>
                      <div className="TitleProduct">
                        <p>
                          {item.product_variant_id.title} * ({item.quantity})
                        </p>
                      </div>
                      <div>
                        <h3>Thành tiền:</h3>
                        <p>
                          {formattedNumber(
                            item.price - (item.price * item.discount) / 100
                          )}
                        </p>
                      </div>
                    </div>
                  )
                })}
                <div className="d-flex justify-content-end">
                  <h3>Tổng tiền:</h3>
                  <p> &ensp; {formattedNumber(order.price_total)}</p>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}
