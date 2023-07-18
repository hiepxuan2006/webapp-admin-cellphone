import {
  faBicycle,
  faCartFlatbed,
  faChartSimple,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { DocTitle } from "../../helpers/DocTitle"
import { ChartOrder } from "./component/ChartOrder"
import { AnalyticsOrderItem } from "./component/AnalyticsOrderItem"
import { getCountDocument } from "../../services/api/orderService"
import { toastAlert } from "../../helpers/toast"

export const DashboardHome = () => {
  const [countOrder, setCountOrder] = useState("")
  const _getCountDocument = async () => {
    const { success, data, message } = await getCountDocument()
    if (!success) {
      toastAlert("error", message)
      throw new Error(message)
    }
    setCountOrder(data)
  }

  useEffect(() => {
    _getCountDocument()
  }, [])
  return (
    <div className="DashboardHome">
      <DocTitle title={"Hệ thống quản lý bán hàng!"} />
      <div className=" SectionInner">
        <div className="d-flex align-items-center gap-3 mb-3">
          <FontAwesomeIcon icon={faChartSimple} />
          <h1>Dashboard order statistics</h1>
        </div>
        <div className="row">
          <div className="col col-md-3">
            <AnalyticsOrderItem
              title="Pending"
              type="pending"
              class_css="OrderPending"
              icon={faCartFlatbed}
              countOrder={countOrder}
              href="/a/admin/order/pending"
            />
          </div>
          <div className="col col-md-3">
            <AnalyticsOrderItem
              countOrder={countOrder}
              type="confirmed"
              title="Confirmed"
              class_css="OrderConfirmed"
              icon={faCheckCircle}
              href="/a/admin/order/confirmed"
            />
          </div>
          <div className="col col-md-3">
            <AnalyticsOrderItem
              countOrder={countOrder}
              type="processing"
              title="Processing"
              class_css="OrderProcessing"
              icon={faClock}
              href="/a/admin/order/processing"
            />
          </div>
          <div className="col col-md-3">
            <AnalyticsOrderItem
              type="delivery"
              countOrder={countOrder}
              title="Out for delivery"
              class_css="OrderOutForDelivery"
              icon={faBicycle}
              href="/a/admin/order/delivery"
            />
          </div>
        </div>
      </div>
      <div className="SectionInner">
        <div className="d-flex align-items-center gap-3 mb-3">
          <FontAwesomeIcon icon={faChartSimple} />
          <h1>Total amount order</h1>
        </div>
        <div className="row">
          <div className="col col-md-12">
            <ChartOrder countOrder={countOrder} />
          </div>
        </div>
      </div>
    </div>
  )
}
