import React, { useState } from "react"
import { Button, Col, Form, Spinner } from "react-bootstrap"
import { createSlider } from "../../services/api/SliderApiService"
import { toast } from "react-toastify"
import { toastAlert } from "../../helpers/toast"
import { LoadingProcess } from "../../Components/loading/LoadingProcess"
export const CreateSlider = () => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ title: "", description: "", link: "" })
  const [tempImage, setTempImage] = useState("")
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
    const reader = new FileReader()
    reader.onload = () => {
      setTempImage(reader.result)
    }
    reader.readAsDataURL(selectedImage)
  }

  const { title, description, link } = data

  const onChangeValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("title", title)
    formData.append("link", link)
    formData.append("description", description)
    formData.append("image", image)
    setLoading(true)
    const { success, message } = await createSlider(formData, "slider")
    setLoading(false)
    if (success) {
      toastAlert("success", "Thành công")
      window.location.reload()
    } else {
      toastAlert("error", message)
      throw new Error(message)
    }
  }
  return (
    <div className="CreateSlider">
      <div className="SectionInner">
        <h1>Tạo Slider mới</h1>
        {loading ? (
          <LoadingProcess />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Nhập tiêu đề ..."
                onChange={onChangeValue}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>Miêu tả</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Miêu tả ...."
                onChange={onChangeValue}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>Link</Form.Label>
              <Form.Control
                name="link"
                type="text"
                placeholder="Link đến sản phẩm."
                onChange={onChangeValue}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                placeholder="Miêu tả ...."
                onChange={handleImageChange}
              />
              {tempImage && (
                <div
                  className="mt-3"
                  style={{ height: "300px", width: "700px" }}
                >
                  <img
                    className="h-100 w-100 object-fit-cover"
                    style={{}}
                    src={tempImage}
                    alt=""
                  />
                </div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Tạo Slider
            </Button>
          </Form>
        )}
      </div>
    </div>
  )
}
