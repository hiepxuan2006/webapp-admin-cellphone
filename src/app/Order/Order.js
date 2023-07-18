import React, { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PFTable from "../../Components/Tables/PFTable"
import { getListOrders } from "../../services/api/orderService"
import { OrderBody } from "./OrderBody"
import { OrderHead } from "./OrderHead"
import queryString from "query-string"
import { PFPagePagination } from "../../helpers/PFPagePagination"
import { DocTitle } from "../../helpers/DocTitle"

export const Order = () => {
  const [listOrders, setListOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const { order_status: status } = useParams()
  const [order_status, setOrder_status] = useState()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const _getListOrder = async () => {
    const params = { page, limit, order_status }
    const paramString = queryString.stringify(params, {
      skipNull: true,
      skipEmptyString: true,
    })
    setLoading(true)
    const { data, success, message } = await getListOrders(paramString)
    setLoading(false)
    if (!success) throw new Error(message)
    setListOrders(data.orders)
  }
  useEffect(() => {
    setOrder_status(status)
  }, [status])
  useEffect(() => {
    _getListOrder()
  }, [order_status, limit, page])

  const handleChangeLimit = (e) => {
    setLimit(e.target.value)
  }

  const _handleChangePage = () => {
    setPage(page)
  }

  const handleChangeStatus = (e) => {
    setOrder_status(e.target.value)
  }
  return (
    <Fragment>
      <div className="OrderPage">
        <DocTitle title="Đơn hàng" />
        <div className="SectionInner">
          <div className="FilterOrder d-flex">
            <div className="TableLength me-3 d-flex align-items-center  ">
              <h3>Hiển thị:</h3>
              <select className="ms-2 px-4" onChange={handleChangeLimit}>
                <option value="10">10 rows</option>
                <option value="20">20 rows</option>
                <option value="50">50 rows</option>
                <option value="100">100 rows</option>
              </select>
            </div>
            <div className="TableLength me-3 d-flex align-items-center  ">
              <h3>Status:</h3>
              <select className="ms-2 px-4" onChange={handleChangeStatus}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>
        <div className="SectionInner">
          <PFTable>
            <OrderHead />
            <OrderBody orders={listOrders} loading={loading} />
          </PFTable>
        </div>
      </div>
      <div className="PaginationSticky">
        <PFPagePagination
          page={page}
          pages={pages}
          onChangePage={_handleChangePage}
        />
      </div>
    </Fragment>
  )
}
