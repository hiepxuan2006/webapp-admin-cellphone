import React, { useRef } from "react"
import { ReactPdfPrint } from "../../Components/ReactPdfPrint"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import { useReactToPrint } from "react-to-print"
import { formattedNumber } from "../../helpers/formatCurentcy"
import moment from "moment"
const logo = require("../../assets/shop.jpg")
export const InvoiceOrder = ({ order = {} }) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
  })

  const hideLastThreeDigits = (phoneNumber) => {
    const hiddenDigits = phoneNumber.slice(-3)
    const maskedDigits = hiddenDigits.replace(/\d/g, "*")
    const lastThreeDigits = phoneNumber.slice(0, -3)
    return lastThreeDigits + maskedDigits
  }
  return (
    <div className="DropdownItem" onClick={handlePrint}>
      <FontAwesomeIcon className="IconAction text-warning" icon={faPrint} />
      <p>Print invoice</p>
      <div style={{ display: "none" }}>
        {order && (
          <div className="ReactPdfPrint" ref={componentRef}>
            <div className="InvoiceOrder">
              <div className="InvoiceHeader">
                <div className="InvoiceHeaderLogo">
                  <img src={logo} alt="" />
                </div>
              </div>
              <div className="InvoiceOrderBody">
                <div className="InvoiceHeaderHeading">
                  <div className="d-flex">
                    <p style={{ minWidth: "100px" }}>Invoice</p>
                    <p>:{order?.order_code}</p>
                  </div>
                  <div className="d-flex">
                    <p style={{ minWidth: "100px" }}>Order date</p>
                    <p>:{moment(order?.order_at).format("LTS L")}</p>
                  </div>
                </div>
                <div className="InvoiceBodyInfo">
                  <div className="row">
                    <div className="col col-md-12 mb-3">
                      <h1 className="mt-3">Billing address</h1>
                      <div className="BillingAddress">
                        <p>hxShop</p>
                        <p>0943076***</p>
                        <p>Xuân Tình, Diễn Lộc, Diễn Châu, Nghệ An</p>
                      </div>
                    </div>
                    <div className="col col-md-12">
                      <h1 className="mt-3">Shipping address</h1>
                      <p>{order.name}</p>
                      <p>{hideLastThreeDigits(order?.phone_number)}</p>
                      <p>{order.shipping_address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="InvoiceProduct">
                <table>
                  <tbody>
                    <tr>
                      <th className="col-9">Product</th>
                      <th className="col-1">Qty</th>
                      <th className="col-2">Price</th>
                    </tr>
                  </tbody>
                  {order.order_item.map((item, key) => {
                    return (
                      <tbody key={key}>
                        <tr>
                          <td>
                            <div className="TitleProduct">
                              <p>{item.product_variant_id.title}</p>
                            </div>
                          </td>
                          <td>
                            <div>{item.quantity}</div>
                          </td>
                          <td>
                            <div>
                              {formattedNumber(
                                item.price - (item.price * 10) / 100
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    )
                  })}
                </table>
              </div>
              <div className="InvoicePrice">
                <div className="InvoicePriceItem">
                  <h4>Subtotal:</h4>
                  <p>{formattedNumber(order.price_total)}</p>
                </div>
                <div className="InvoicePriceItem">
                  <h4>Coupon discount:</h4>
                  <p>{formattedNumber(0)}</p>
                </div>
                <div className="InvoicePriceItem">
                  <h4>Shipping fee:</h4>
                  <p>{formattedNumber(30000)}</p>
                </div>
                <div className="InvoicePriceItem">
                  <h4>Total:</h4>
                  <p>{formattedNumber(order.price_total)}</p>
                </div>
              </div>
              <div className="InvoiceFooter align-self-center">
                <p>Thank you for your purchase from us.</p>
                <p>Looking forward to welcoming you in the future!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
