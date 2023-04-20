/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Button, Col, Form, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { getSliderById } from "../../services/api/SliderApiService"

export const EditSlider = () => {
  const [loading, setLoading] = useState(false)
  const [slider, setSlider] = useState({})
  const [tempImage, setTempImage] = useState("")
  const [image, setImage] = useState(null)

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
    const reader = new FileReader()
    reader.onload = () => {
      setTempImage(reader.result)
    }
    reader.readAsDataURL(selectedImage)
  }

  const handleSubmit = (e) => {}

  let { id } = useParams()
  const _getSliderById = async () => {
    const { success, message, data } = await getSliderById(id)

    if (!success) throw new Error(message)

    setSlider(data)
  }

  useEffect(() => {
    _getSliderById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="CreateSlider">
      <div className="SectionInner">
        <h1>Tạo Slider mới</h1>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
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
                value={slider && slider.title}
                // onChange={onChangeValue}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Miêu tả ...."
                value={slider && slider.description}
                // onChange={onChangeValue}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                placeholder="Miêu tả ...."
                onChange={handleImageChange}
              />

              <div className="mt-3" style={{ height: "300px", width: "700px" }}>
                <img
                  className="h-100 w-100 object-fit-cover"
                  style={{}}
                  src={
                    tempImage
                      ? tempImage
                      : slider
                      ? slider.image
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                  }
                  alt=""
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              Cập nhật
            </Button>
          </Form>
        )}
      </div>
    </div>
  )
}
