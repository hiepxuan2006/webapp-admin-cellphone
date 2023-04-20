import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"

export const PostBody = ({ posts = [] }) => {
  return (
    <tbody>
      {posts.length &&
        posts.map((post, key) => {
          return (
            <tr key={key}>
              <td>{post.title}</td>
              <td>{post.topic_id.title}</td>
              <td>
                <div className="ImageProduct me-3">
                  <img src={post.image} />
                </div>
              </td>
              <td className="text-center d-flex justify-content-center gap-3 h-100">
                <div className="ActionIcon ActionIconDel">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    // onClick={() => handleDelete(item._id)}
                  />
                </div>
                <div className="ActionIcon ActionIconEdit h-100">
                  <Link to={`/a/admin/post/edit/${post._id}`}>
                    <FontAwesomeIcon icon={faPen} />
                  </Link>
                </div>
              </td>
            </tr>
          )
        })}
    </tbody>
  )
}
