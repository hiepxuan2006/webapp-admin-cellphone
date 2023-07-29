import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import React, { useState } from "react"
import { Button, Dropdown, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import TableLoading from "../../helpers/TableLoading"
import { formattedNumber } from "../../helpers/formatCurentcy"
import { InvoiceOrder } from "./InvoiceOrder"

export const OrderBody = ({ orders = [], loading }) => {
  const [show, setShow] = useState(false)
  const [itemOrder, setItemOrder] = useState("")
  const handleClose = () => {
    setShow(false)
  }
  return (
    <>
      {!loading ? (
        orders.length > 0 &&
        orders.map((item, key) => {
          return (
            <tbody key={key}>
              <tr>
                <td>{item.order_code}</td>
                <td>
                  {item.order_item.map((item, key) => {
                    return (
                      <div key={key} className="OrderItem ">
                        <div className="ImageOrderItem">
                          <img src={item.image_uris[0]} alt="" />
                        </div>
                        <div className="TitleProduct">
                          <p>{item.product_variant_id.title}</p>
                        </div>
                      </div>
                    )
                  })}
                </td>
                <td>{formattedNumber(item.price_total)} </td>
                <td>{item.name}</td>
                <td>
                  <p>
                    <span className="StatusOrder">{item.status}</span>
                  </p>
                </td>
                <td>{item.shipping_address}</td>
                <td>{moment(item.order_at).format("LTS L")}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Link
                        to={`/a/admin/order/${item.order_code}/edit`}
                        className="DropdownItem"
                      >
                        <FontAwesomeIcon
                          className="IconAction "
                          icon={faEdit}
                        />
                        <p>Edit</p>
                      </Link>
                      <div
                        className="DropdownItem"
                        onClick={() => {
                          setItemOrder(item)
                          setShow(true)
                        }}
                      >
                        <FontAwesomeIcon
                          className="IconAction text-warning"
                          icon={faEye}
                        />
                        <p>View</p>
                      </div>
                      <InvoiceOrder order={item} />
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          )
        })
      ) : (
        <TableLoading columnQuantity={7} />
      )}
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
