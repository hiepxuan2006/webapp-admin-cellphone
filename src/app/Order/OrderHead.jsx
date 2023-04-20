import React from "react"

export const OrderHead = () => {
  return (
    <thead className="AccountTableHead table-light ">
      <tr className="col">
        <th className="col-2">Tên khách hàng</th>
        <th className="col-2">Địa chỉ</th>
        <th className="col-3">Sản phẩm</th>
        <th className="col-1">Đơn giá</th>
        <th className="col-2">Trạng thái đơn hàng</th>
        <th className="col-1">Ngày đặt hàng</th>
        <th className="col-1 text-center">Hành động</th>
      </tr>
    </thead>
  )
}
