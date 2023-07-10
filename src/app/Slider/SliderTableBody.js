import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { confirmDialog } from "../../helpers/alertConfirm"
import { deletedSlider } from "../../services/api/SliderApiService"
import { Button, Modal } from "react-bootstrap"

export const SliderTableBody = ({ sliders = [] }) => {
  const [show, setShow] = useState(false)
  const [imageModal, setImageModal] = useState(null)
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
            <tbody key={key}>
              <tr>
                <td>{key + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <div style={{ height: "100px", width: "230px" }}>
                    <img
                      onClick={() => {
                        setImageModal(item.image)
                        setShow(true)
                      }}
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
              <></>
            </tbody>
          )
        })}
      <Modal show={show} fullscreen onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={imageModal} alt="" />
        </Modal.Body>
      </Modal>
    </>
  )
}
