import React from "react"
import { Button, Modal } from "react-bootstrap"
const image = require("../../../../assets/image/Image_not_available.png")
export const VariantImageModal = (props) => {
  const { show, setShow, image_urls } = props
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <div
        // disabled={showBtn ? false : true}
        className={`${image_urls ? "" : "d-none"}`}
        style={{ height: "80px", width: "100px" }}
        onClick={handleShow}
      >
        <img src={image_urls ? `${image_urls}` : image} alt="" />
      </div>

      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/upload/product/${image_urls}`}
            alt=""
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
