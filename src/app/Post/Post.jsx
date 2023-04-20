import React from "react"
import { Link } from "react-router-dom"
import PFTable from "../../Components/Tables/PFTable"
import { PostBody } from "./components/PostBody"
import { PostHead } from "./components/PostHead"
import { useEffect } from "react"
import { useState } from "react"
import { getAllPost } from "../../services/api/postService"

export const Post = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    ;(async () => {
      const { data, success, message } = await getAllPost()
      if (!success) throw new Error(message)
      setPosts(data.post)
    })()
  }, [])
  return (
    <div className="Post">
      <div className="SectionInner d-flex gap-3">
        <h1>Danh sách bài viết</h1>
        <Link to={"/a/admin/post/create-post"}>
          <button className="btn btn-success">Thêm bài viết</button>
        </Link>
      </div>
      <div className="SectionInner">
        <h2 className="mb-5">Danh sách baì viết</h2>
        <PFTable>
          <PostHead />
          <PostBody posts={posts} />
        </PFTable>
      </div>
    </div>
  )
}
