import React from "react"
import { OrderHead } from "./OrderHead"
import { OrderBody } from "./OrderBody"
import PFTable from "../../Components/Tables/PFTable"
import { getListOrders } from "../../services/api/orderService"
import { useState } from "react"
import { set } from "store"
import { useEffect } from "react"

export const Order = () => {
  const [listOrders, setListOrders] = useState([])
  const _getListOrder = async () => {
    const { data, success, message } = await getListOrders()
    if (!success) throw new Error(message)
    setListOrders(data.orders)
  }
  useEffect(() => {
    _getListOrder()
  }, [])
  return (
    <div className="OrderPage">
      <div className="SectionInner">
        <PFTable>
          <OrderHead />
          <OrderBody orders={listOrders} />
        </PFTable>
      </div>
    </div>
  )
}
