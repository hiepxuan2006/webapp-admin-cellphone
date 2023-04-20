import React from "react"

export const AccountHead = () => {
  return (
    <thead className="AccountTableHead table-light ">
      <tr className="col">
        <th className="col-1">#</th>
        <th className="col-2">Tên người dùng</th>
        <th className="col-2">Email</th>
        <th className="col-2 text-center">Quyền người dùng</th>
        <th className="col-2 text-center">Action</th>
      </tr>
    </thead>
  )
}
