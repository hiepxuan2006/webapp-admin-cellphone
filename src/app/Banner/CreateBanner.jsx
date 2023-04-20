import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { toastAlert } from "../../helpers/toast"
import { createBanner } from "../../services/api/bannerService"
import { LoadingProcess } from "../../Components/loading/LoadingProcess"
import { useEffect } from "react"
import { getCategoryParent } from "../../services/api/categoryApiService"
import Select from "react-select"
export const CreateBanner = () => {
  const [image, setImage] = useState("")
  const [tempImage, setTempImage] = useState(null)
  const [horizontal, setHorizontal] = useState(false)
  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const handleClose = () => {
    setImage("")
    setTempImage("")
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
    const reader = new FileReader()
    reader.onload = () => {
      setTempImage(reader.result)
    }
    reader.readAsDataURL(selectedImage)
  }

  const handleChangeHorizontal = (e) => {
    setHorizontal(e.target.checked)
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await getCategoryParent()
      setCategories(data)
    })()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image || !link) {
      toastAlert("warn", "Vui lòng nhập đủ dữ liệu!")
      return
    }
    const formData = new FormData()
    formData.append("image", image)
    formData.append("link", link)
    formData.append("horizontal", horizontal)
    formData.append("category", category)
    setLoading(true)
    const { data, success, message } = await createBanner(formData)
    setLoading(false)
    if (!success) {
      toastAlert("error", message)
      return
    }
    window.location.reload()
    setTempImage(null)
    toastAlert("success", "Thêm bài viết thành công")
  }

  const formatArray = (array) => {
    return array.map((item) => {
      item.value = item._id
      return item
    })
  }
  return (
    <div className="CreateBanner">
      <div className="SectionInner">
        <h1>Thêm banner</h1>
      </div>
      <div className="SectionInner">
        {loading && <LoadingProcess />}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <Row>
                <Form.Group
                  as={Col}
                  md="10"
                  className="mt-5"
                  controlId="validationCustom01"
                >
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    required
                    name="name"
                    type="text"
                    placeholder="vd: Link ..."
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập !
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="2"
                  className="mt-5"
                  controlId="validationCustom01"
                >
                  <Form.Label>Banner Ngang</Form.Label>
                  <Form.Check
                    type="checkbox"
                    onChange={handleChangeHorizontal}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập !
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Col>
            <Col md={12}>
              <Row>
                <Form.Group
                  as={Col}
                  md="8"
                  className="mt-5"
                  controlId="validationCustom01"
                >
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    required
                    name="name"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập !
                  </Form.Control.Feedback>
                </Form.Group>
                {categories.length && (
                  <Form.Group as={Col} md="4" className="mt-5">
                    <Form.Label>Category</Form.Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isClearable={true}
                      isSearchable
                      name="color"
                      options={formatArray(categories)}
                      onChange={(option) => {
                        setCategory(option._id)
                      }}
                    />
                  </Form.Group>
                )}
              </Row>
              {!!tempImage ? (
                <>
                  <FontAwesomeIcon
                    icon={faClose}
                    onClick={() => handleClose()}
                  />
                  <div
                    className="mt-3"
                    style={{ height: "300px", width: "700px" }}
                  >
                    <img
                      className="h-100 w-100 "
                      style={{ objectFit: "contain" }}
                      src={tempImage}
                      alt=""
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Button
            disabled={loading}
            type="submit"
            className="btn btn-success mt-3"
          >
            Tạo mới
          </Button>
        </Form>
      </div>
    </div>
  )
}
