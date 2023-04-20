import React, { useState } from "react"
import { EditorCk } from "../../../../Components/textEditorCk/EditorCk"
import { Button, Modal } from "react-bootstrap"

export const Technique = ({}) => {
  const [show, setShow] = useState(false)
  const [technique, setTechnique] = useState("")
  const handleClose = () => {
    setShow(!show)
  }
  return (
    <td>
      <p onClick={() => setShow(!show)}>text</p>
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex align-items-center justify-content-center h-100 w-100 ModalFullscreen">
          <div className="EditorCk">
            <EditorCk setTechnique={setTechnique} />
          </div>
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
    </td>
  )
}
