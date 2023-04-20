import React from "react"
import { Link } from "react-router-dom"

export const Banner = () => {
  return (
    <div className="Banner">
      <div className="SectionInner d-flex gap-3">
        <h1>Danh sách banner</h1>
        <Link to="/a/admin/banner/create">
          <button className="btn btn-success"> Thêm mới banner</button>
        </Link>
      </div>
    </div>
  )
}
