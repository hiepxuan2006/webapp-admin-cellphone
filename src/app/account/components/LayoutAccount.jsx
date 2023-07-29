import {
  faClockRotateLeft,
  faCrown,
  faIdCardClip,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { DetailAcount } from "../DetailAcount"
import { useParams } from "react-router-dom"
import { getDetailAccount } from "../../../services/api/accountSevice"
import { toastAlert } from "../../../helpers/toast"
import { useState } from "react"
import { useEffect } from "react"
import { getOrderByAccount } from "../../../services/api/orderService"

export const LayoutAccount = () => {
  const [account, setAccount] = useState("")
  const [orders, setOrders] = useState([])
  const { id } = useParams()
  const _getDetailAccount = async () => {
    const { data, success, message } = await getDetailAccount(id)
    if (!success) {
      toastAlert("error", message)
      return
    }
    setAccount(data)
  }

  const _getOrderByAccount = async () => {
    const { data, success, message } = await getOrderByAccount(id)
    if (!success) {
      toastAlert("error", message)
      return
    }
    setOrders(data)
  }

  useEffect(() => {
    _getDetailAccount()
    _getOrderByAccount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  console.log(orders)
  return (
    <DetailAcount account={account}>
      <div className="m-0 h-100">
        <div className="row h-100 gap-3 justify-content-center align-items-center ">
          <div className="col col-md-4 ItemInfoAccount">
            <div className="CartIcon">
              <FontAwesomeIcon icon={faIdCardClip} />
            </div>
            <h3 className="CartTitle">Profile</h3>
          </div>
          <div className="col col-md-4 ItemInfoAccount">
            <div className="CartIcon">
              <FontAwesomeIcon icon={faClockRotateLeft} />
            </div>
            <h3 className="CartTitle">Order</h3>
          </div>
          <div className="col col-md-4 ItemInfoAccount">
            <div className="CartIcon">
              <FontAwesomeIcon icon={faCrown} />
            </div>
            <h3 className="CartTitle">Membership level</h3>
          </div>
          <div className="col col-md-4 ItemInfoAccount">
            <div className="CartIcon">
              <FontAwesomeIcon icon={faIdCardClip} />
            </div>
            <h3 className="CartTitle">Profile</h3>
          </div>
        </div>
      </div>
    </DetailAcount>
  )
}
