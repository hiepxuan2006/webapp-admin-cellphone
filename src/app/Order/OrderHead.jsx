import React from "react"

export const OrderHead = () => {
  return (
    <thead className="AccountTableHead table-light ">
      <tr className="col">
        <th className="col-2">Order code</th>
        <th className="col-3">Product</th>
        <th className="col-1">Price total</th>
        <th className="col-2">Customer</th>
        <th className="col-2">Status</th>
        <th className="col-2">Address</th>
        <th className="col-1">Order date</th>
        <th className="col-1 text-center">Actions</th>
      </tr>
    </thead>
  )
}
