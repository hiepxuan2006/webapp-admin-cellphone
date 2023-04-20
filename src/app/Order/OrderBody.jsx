import React from "react"
import { formattedNumber } from "../../helpers/formatCurentcy"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"
import { Button, Form, Modal } from "react-bootstrap"
import { useState } from "react"
import { Link } from "react-router-dom"

export const OrderBody = ({ orders = [] }) => {
  const [show, setShow] = useState(false)
  const [itemOrder, setItemOrder] = useState("")
  const handleClose = () => {
    setShow(false)
  }
  console.log(orders)
  return (
    <>
      {orders.length > 0 &&
        orders.map((item, key) => {
          return (
            <tr key={key}>
              <td>{item.name}</td>
              <td>{item.shipping_address}</td>
              <td>
                {item.order_item.map((item, key) => {
                  return (
                    <div className="OrderItem ">
                      <div className="ImageOrderItem">
                        <img
                          src={item.product_variant_id.image_uris[0]}
                          alt=""
                        />
                      </div>
                      <div className="TitleProduct">
                        <p>{item.product_variant_id.title}</p>
                      </div>
                    </div>
                  )
                })}
              </td>
              <td>{formattedNumber(item.price_total)} </td>
              <td>
                <Form.Select aria-label="Default select example">
                  <option selected={item.status === "processing"} value="1">
                    Chờ xác nhận
                  </option>
                  <option value="2">Đã xác nhận</option>
                  <option value="3">Đang giao hàng</option>
                  <option value="3">Đã giao hàng</option>
                  <option value="3">Hủy đơn hàng</option>
                </Form.Select>
              </td>
              <td>{moment(item.order_at).format("LTS L")}</td>
              <td>
                <div className="h-100 d-flex justify-content-center gap-5 align-items-center">
                  <FontAwesomeIcon
                    className="IconAction text-warning"
                    icon={faEye}
                    onClick={() => {
                      setItemOrder(item)
                      setShow(true)
                    }}
                  />
                  <Link to={`/a/admin/order/${item.order_code}/edit`}>
                    <FontAwesomeIcon className="IconAction " icon={faTrash} />
                  </Link>
                </div>
              </td>
            </tr>
          )
        })}
      {itemOrder && (
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết đơn hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ModalOrderStatus mt-3">
              <h2>Trạng thái đơn hàng</h2>
              <div className="ModalNoteStatus">
                <div className="d-flex align-items-center justify-content-center w-100 ">
                  <div className="NoteStatus">
                    <p className="NameNodeStatus">Chờ xác nhận</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center w-100">
                  <div className="NoteStatus">
                    <p className="NameNodeStatus">Đã xác nhận</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center w-100">
                  <div className="NoteStatus">
                    <p className="NameNodeStatus">Đang giao hàng</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center w-100">
                  <div className="NoteStatus">
                    <p className="NameNodeStatus">Đã giao hàng</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ModalOrderContent">
              <h2 className="mb-3">Thông tin đặt hàng</h2>
              <h3>Người đặt hàng : {itemOrder.name}</h3>
              <h3>Số điện thoại : {itemOrder.phone_number}</h3>
              <h3>Địa chỉ giao hàng : {itemOrder.shipping_address} </h3>
              <h3>Tổng đơn hàng : {formattedNumber(itemOrder.price_total)}</h3>
            </div>
            <div className="ModalOrderItem mt-3">
              <h2 className="mb-3">Chi tiết sản phẩm</h2>
              <div className="ModalProductOrderItem ">
                {itemOrder.order_item.map((item, key) => {
                  return (
                    <div className="OrderItem ">
                      <div className="ImageOrderItem">
                        <img
                          src={item.product_variant_id.image_uris[0]}
                          alt=""
                        />
                      </div>
                      <div className="TitleProduct">
                        <p>
                          {item.product_variant_id.title} * {item.quantity}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}
