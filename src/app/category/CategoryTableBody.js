import React, { Fragment, useState } from "react"

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "react-dropdown-tree-select/dist/styles.css"
import { Link } from "react-router-dom"
import TableLoading from "../../helpers/TableLoading"
import { confirmDialog } from "../../helpers/alertConfirm"
import { toastAlert } from "../../helpers/toast"
import { deleteCategory } from "../../services/api/categoryApiService"

const noImage = require("../../assets/no-image.jpg")
export default function CategoryTableBody({
  data = [],
  loading,
  reload,
  setReload,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async (id) => {
    const isConfirm = await confirmDialog()
    if (!isConfirm) return
    const { success, message } = await deleteCategory(id)

    if (!success) {
      toastAlert("error", message)
      return
    }
    setReload(!reload)
    toastAlert("success", "Thành công!")
  }
  return (
    <Fragment>
      {loading ? (
        <TableLoading columnQuantity={4} />
      ) : (
        <>
          {data.length > 0 &&
            data.map((item, key) => {
              return (
                <tr className="pt-3" style={{ height: "100px" }}>
                  <td>{item.label}</td>
                  <td className="ImageItem">
                    <img src={item.image || noImage} alt="" />
                  </td>
                  <td className="ImageItem">
                    <img src={item.icon || noImage} alt="" />
                  </td>
                  <td>
                    <div className="h-100 d-flex justify-content-center gap-5 align-items-center">
                      <div>
                        <FontAwesomeIcon
                          onClick={() => handleDelete(item._id)}
                          icon={faTrash}
                        />
                      </div>
                      <Link to={`edit/${item.slug}?id=${item._id}`}>
                        <FontAwesomeIcon icon={faPen} />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
        </>
      )}
    </Fragment>
  )
}
