import React from "react"
import { Link } from "react-router-dom"

export const Topic = () => {
  return (
    <div className="Topic">
      <div className="SectionInner d-flex gap-3">
        <h1>Danh sách chủ đề bài viết</h1>
        <Link to="/a/admin/topic/create">
          <button className="btn btn-success">Thêm chủ đề</button>
        </Link>
      </div>
    </div>
  )
}
