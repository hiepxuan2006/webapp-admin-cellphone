import React, { useState } from "react"
import { useEffect } from "react"
import { analyticOrder } from "../../services/api/orderService"
import { toastAlert } from "../../helpers/toast"
import BarChart from "../../helpers/BarChart"

export const ChartOrder = () => {
  const [data, setData] = useState([])
  const [userData, setUserData] = useState({
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: "Order",
        data: data.map((item) => item.totalAmount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#2a71d0",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  })
  const _getAnalyticOrder = async () => {
    const { success, data, message } = await analyticOrder()
    if (!success) {
      toastAlert("error", message)
    }
    setData(data)
  }
  useEffect(() => {
    _getAnalyticOrder()
  }, [])
  useEffect(() => {
    if (data.length)
      setUserData({
        labels: data.map((item) => item.time),
        datasets: [
          {
            label: "Order",
            data: data.map((item) => item.totalAmount),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
              "#2a71d0",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      })
  }, [data])
  return (
    <div>
      <BarChart chartData={userData} />
    </div>
  )
}
