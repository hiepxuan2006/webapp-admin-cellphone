import {
  faBicycle,
  faCartFlatbed,
  faChartSimple,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { DocTitle } from "../../helpers/DocTitle"
import { AnalyticsOrderItem } from "./component/AnalyticsOrderItem"
import { ChartOrder } from "./ChartOrder"
import { InvoiceOrder } from "../Order/InvoiceOrder"
import { ReactPdfPrint } from "../../Components/ReactPdfPrint"

export const DashboardHome = () => {
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
              class_css="OrderPending"
              icon={faCartFlatbed}
            />
          </div>
          <div className="col col-md-3">
            <AnalyticsOrderItem
              title="Confirmed"
              class_css="OrderConfirmed"
              icon={faCheckCircle}
            />
          </div>
          <div className="col col-md-3">
            <AnalyticsOrderItem
              title="Processing"
              class_css="OrderProcessing"
              icon={faClock}
            />
          </div>
          <div className="col col-md-3">
            <AnalyticsOrderItem
              title="Out for delivery"
              class_css="OrderOutForDelivery"
              icon={faBicycle}
            />
          </div>
        </div>
      </div>
      <div className="SectionInner">
        <div className="row">
          <div className="col col-md-6">
            <div className="d-flex align-items-center gap-3 mb-3">
              <FontAwesomeIcon icon={faChartSimple} />
              <h1>Total amount order</h1>
            </div>
            <ChartOrder />
          </div>
        </div>
      </div>
    </div>
  )
}
