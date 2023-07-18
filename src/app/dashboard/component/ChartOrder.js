import React, { useState } from "react"
import { useEffect } from "react"
import { analyticOrder } from "../../../services/api/orderService"
import { toastAlert } from "../../../helpers/toast"
import BarChart from "../../../helpers/BarChart"
import { PolarAreaChart } from "../../../helpers/PolarAreaChart"

export const ChartOrder = ({ countOrder }) => {
  const [data, setData] = useState([])
  const [dataDailyDay, setDataDailyDay] = useState([])
  const [userData, setUserData] = useState(
    {
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [
        {
          label: "Order",
          data: [1, 2, 3, 4, 5, 6, 7],
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
    },
    {
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
    }
  )
  const [dayData, setDayData] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "Order Day",
        data: data.map((item) => item.totalAmount),
        backgroundColor: [
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ffa500",
          "#800080",
          "#00ffff",
          "#ff00ff",
          "#ffff00",
          "#008000",
          "#800000",
          "#907000",
          "#008080",
        ],
      },
    ],
  })
  const _getAnalyticOrder = async () => {
    const { success, data, message } = await analyticOrder()
    if (!success) {
      toastAlert("error", message)
    }
    const { dailyDay, dailyMonth } = data
    setData(dailyMonth)
    setDataDailyDay(dailyDay)
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
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffa500",
              "#800080",
              "#00ffff",
              "#ff00ff",
              "#ffff00",
              "#008000",
              "#800000",
              "#907000",
              "#008080",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      })
    if (dataDailyDay.length)
      setDayData({
        labels: dataDailyDay.map((item) => item.time.substr(5, 5)),
        datasets: [
          {
            label: "Order Day",
            data: dataDailyDay.map((item) => item.totalAmount),
            backgroundColor: [
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffa500",
              "#800080",
              "#00ffff",
              "#ff00ff",
              "#ffff00",
              "#008000",
              "#800000",
              "#907000",
              "#008080",
            ],
          },
        ],
      })
  }, [data, dataDailyDay])

  return (
    <div className="Chart">
      <div className="BarChart">
        <BarChart chartData={dayData} />

        <h3>Tổng doanh thu đơn hàng 12 ngày qua</h3>
      </div>
      <div className="PolarChart">
        <PolarAreaChart chartData={userData} />
        <h3>Tổng doanh thu đơn hàng các tháng</h3>
      </div>
    </div>
  )
}
