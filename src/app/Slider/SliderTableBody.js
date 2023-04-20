import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { confirmDialog } from "../../helpers/alertConfirm"
import { deletedSlider } from "../../services/api/SliderApiService"

export const SliderTableBody = ({ sliders = [] }) => {
  const handleClick = async (id) => {
    const isConfirm = await confirmDialog()
    if (isConfirm) {
      const { success, message } = await deletedSlider(id)
      if (!success) throw new Error(message)

      toast("🦄Successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      window.location.reload()
    }
  }
  return (
    <>
      {sliders.length &&
        sliders.map((item, key) => {
          return (
            <tr>
              <td>{key + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <div style={{ height: "100px", width: "230px" }}>
                  <img
                    className="h-100 w-100 object-fit-cover"
                    src={`${item.image}`}
                    alt=""
                  />
                </div>
              </td>
              <td>
                <div className="h-100 d-flex justify-content-center gap-3 align-items-center">
                  <div onClick={() => handleClick(item._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                  <Link to={`edit-slider/${item._id}`}>
                    <FontAwesomeIcon icon={faPen} />
                  </Link>
                </div>
              </td>
            </tr>
          )
        })}
    </>
  )
}
