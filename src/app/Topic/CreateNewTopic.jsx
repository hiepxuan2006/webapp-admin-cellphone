import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { createTopic } from "../../services/api/postService"
import { toastAlert } from "../../helpers/toast"
import { LoadingProcess } from "../../Components/loading/LoadingProcess"

export const CreateNewTopic = () => {
  const [image, setImage] = useState("")
  const [tempImage, setTempImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    title: "",
    label: "",
  })
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
    const reader = new FileReader()
    reader.onload = () => {
      setTempImage(reader.result)
    }
    reader.readAsDataURL(selectedImage)
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const { title, label } = data
  const handleClose = () => {
    setImage("")
    setTempImage("")
  }

  const handleCreate = async () => {
    const formData = new FormData()
    formData.append("image", image)
    formData.append("title", title)
    formData.append("label", label)
    setLoading(true)
    const { data, success, message } = await createTopic(formData)
    setLoading(false)
    if (!success) {
      toastAlert("error", message)
      throw new Error(message)
    }
    toastAlert("success", "Thanh công")
    window.location.reload()
  }

  return (
    <div className="CreateNewTopic">
      <h1>Chủ đê bài viết</h1>
      {loading && <LoadingProcess />}
      <Row>
        {/* <div className="SectionInner"> */}
        <Form.Group as={Col} md="8">
          <div className="SectionInner">
            <h1>
              Tên <span className="text-danger ml-1">(*)</span>
            </h1>
            <Form.Control
              required
              name="title"
              type="text"
              placeholder="...."
              onChange={handleChange}
              // onFocus={handleFocus}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập !
            </Form.Control.Feedback>
          </div>
          <div className="SectionInner">
            <h1>
              label <span className="text-danger ml-1">(*)</span>
            </h1>
            <Form.Control
              required
              name="label"
              type="text"
              placeholder=" ...."
              onChange={handleChange}
              // onFocus={handleFocus}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập !
            </Form.Control.Feedback>
          </div>
          <div className="SectionInner">
            <h1>
              Thumbs <span className="text-danger ml-1">(*)</span>
            </h1>
            <Form.Control
              type="file"
              accept="image/*"
              placeholder="Miêu tả ...."
              onChange={handleImageChange}
            />
            {tempImage && (
              <div className="mt-3" style={{ height: "300px", width: "700px" }}>
                <FontAwesomeIcon icon={faClose} onClick={() => handleClose()} />
                <img
                  className="h-100 w-100 object-fit-cover"
                  style={{}}
                  src={tempImage}
                  alt=""
                />
              </div>
            )}
          </div>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="8">
          <div className="SectionInner ">
            <Button disabled={loading} onClick={handleCreate}>
              Tạo
            </Button>
          </div>
        </Form.Group>
      </Row>
    </div>
  )
}
