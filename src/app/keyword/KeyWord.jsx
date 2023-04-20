import React, { useEffect } from "react"
import PFTable from "../../Components/Tables/PFTable"
import { PFPagePagination } from "../../helpers/PFPagePagination"
import { useState } from "react"
import { KeyWordHead } from "./KeyWordHead"
import { KeyWordBody } from "./KeyWordBody"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { createKeyWord, getTags } from "../../services/api/productService"
import { toastAlert } from "../../helpers/toast"
import { Link } from "react-router-dom"

export const KeyWord = () => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState([])
  const handleClose = () => {
    setShow(false)
  }

  const createNewTag = async () => {
    const { data, success, message } = await createKeyWord({ title })
    if (!success) {
      toastAlert("error", message)
      throw new Error(message)
    }
    setShow(false)
    toastAlert("success", "Thành công!")
  }

  const _getTags = async () => {
    setLoading(true)
    const { data, success, message } = await getTags()

    if (!success) {
      toastAlert("error", message)
      throw new Error(message)
    }
    setTags(data.tags)

    setLoading(false)
  }
  useEffect(() => {
    _getTags()
  }, [show])

  return (
    <div className="Tags">
      <div className="ProductPageHeader d-flex gap-5 mb-4 ">
        <button className="px-2" onClick={() => setShow(true)}>
          Tạo tags
        </button>
        <Link to={"/a/admin/product"}>
          <button className="px-2">Danh sách sản phẩm </button>
        </Link>
      </div>
      <div className="SectionInner">
        <PFTable>
          <KeyWordHead />
          <KeyWordBody tags={tags} loading={loading} />
        </PFTable>
      </div>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Header>
          <Modal.Title>Tạo mới tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nhập tên tag</Form.Label>
              <Form.Control
                type="title"
                placeholder="iphone pro max ..."
                autoFocus
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => createNewTag()}>
            Tạo mới tag
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
