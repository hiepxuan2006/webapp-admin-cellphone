import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export const KeyWordBody = ({ tags = [] }) => {
  return (
    <>
      {tags.length > 0 &&
        tags.map((tag, key) => {
          return (
            <tr key={key} className="pt-3">
              <td>{tag.title}</td>
              <td>
                <p className={tag.is_active ? "active" : "disable"}>
                  {tag.is_active ? "active" : "disable"}
                </p>
              </td>
              <td className="text-center d-flex justify-content-center gap-3">
                <div className="ActionIcon ActionIconDel">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    // onClick={() => handleDelete(item._id)}
                  />
                </div>
                <div className="ActionIcon ActionIconEdit">
                  <FontAwesomeIcon icon={faPen} />
                </div>
              </td>
            </tr>
          )
        })}
    </>
  )
}
