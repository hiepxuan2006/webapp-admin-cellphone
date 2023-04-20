/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Button, Col, Form } from "react-bootstrap"
import { Row } from "reactstrap"
import { LoadingProcess } from "../../../Components/loading/LoadingProcess"
import { toastAlert } from "../../../helpers/toast"
import {
  createCategory,
  getCategories,
} from "../../../services/api/categoryApiService"
const noImage = require("../../../assets/no-image.jpg")
export default function CreateCategory() {
  const [categories, setCategories] = useState([])
  const [categoryParent, setCategoryParent] = useState("")
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [key, setKey] = useState("")
  const [name, setName] = useState("")
  const [tempImage, setTempImage] = useState("")
  const [tempIcon, setTempIcon] = useState("")
  const [image, setImage] = useState(null)
  const [icon, setIcon] = useState(null)
  const [banner, setBanner] = useState(null)
  const [tempBanner, setTempBanner] = useState("")
  const [reload, setReload] = useState(false)
  useEffect(() => {
    const _fetchCategories = async () => {
      const { data } = await getCategories()

      setCategories(data)
    }
    _fetchCategories()
  }, [reload])

  function flattenOptions(options, prefix = "") {
    return options.reduce((acc, option) => {
      const name = prefix ? `${prefix} > ${option.name}` : option.name
      acc.push({ id: option._id, name, parent_id: option.parent_id })
      if (option.children) {
        acc = acc.concat(flattenOptions(option.children, name))
      }
      return acc
    }, [])
  }
  const optionCategory = flattenOptions(categories)

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    if (e.target.name === "icon") {
      setIcon(selectedImage)
      const reader = new FileReader()
      reader.onload = () => {
        setTempIcon(reader.result)
      }
      reader.readAsDataURL(selectedImage)
    }
    if (e.target.name === "image") {
      setImage(selectedImage)
      const reader = new FileReader()
      reader.onload = () => {
        setTempImage(reader.result)
      }
      reader.readAsDataURL(selectedImage)
    }
    if (e.target.name === "banner") {
      setBanner(selectedImage)
      const reader = new FileReader()
      reader.onload = () => {
        setTempBanner(reader.result)
      }
      reader.readAsDataURL(selectedImage)
    }
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      setLoading(true)
      // eslint-disable-next-line no-unused-vars
      const formData = new FormData()
      formData.append("icon", icon)
      formData.append("image", image)
      formData.append("name", name)
      formData.append("key", key)
      formData.append("categoryParent", categoryParent)

      const { success, data, message } = await createCategory(formData)
      if (success) {
        setLoading(false)
        toastAlert("success", "Tạo thành công !")
        // window.location.reload()
        setReload(!reload)
      } else {
        setLoading(false)
        toastAlert("success", message)
        throw new Error(message)
      }
    }
  }

  return (
    <div className="CreateCategory">
      <h1>Thêm danh mục mới</h1>
      {loading ? (
        <LoadingProcess />
      ) : (
        <Form md="3" noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <div className="SectionInner">
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Row>
                      <Form.Label htmlFor="">Danh mục cha</Form.Label>
                      <Form.Select
                        required
                        style={{ fontSize: "16px" }}
                        onChange={(e) => setCategoryParent(e.target.value)}
                      >
                        <option selected disabled>
                          Chọn
                        </option>
                        {optionCategory &&
                          optionCategory.map((item, key) => {
                            return (
                              <option value={item.id} key={key}>
                                {item.name}
                              </option>
                            )
                          })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Vui lòng chọn !
                      </Form.Control.Feedback>
                    </Row>
                  </Form.Group>
                </Row>
              </div>
            </Col>
            <Col md={4}>
              <div className="SectionInner">
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Tên danh mục</Form.Label>
                    <Form.Control
                      required
                      name="name"
                      type="text"
                      placeholder="vd: Điện Thoại ..."
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập !
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </div>
            </Col>
            <Col md={4}>
              <div className="SectionInner">
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Từ khóa</Form.Label>
                    <Form.Control
                      name="key"
                      type="text"
                      placeholder="vd: grand ..."
                      onChange={(e) => setKey(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập !
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="SectionInner">
                <Form.Label>Icon Danh mục</Form.Label>
                <Form.Control
                  name="icon"
                  onChange={handleImageChange}
                  type="file"
                />
                <div className="ImagePreview mt-3">
                  <img src={tempIcon || noImage} alt="" />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="SectionInner">
                <Form.Label>Image Danh mục</Form.Label>
                <Form.Control
                  name="image"
                  onChange={handleImageChange}
                  type="file"
                />
                <div className="ImagePreview mt-3">
                  <img src={tempImage || noImage} alt="" />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="SectionInner">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Banner</Form.Label>
                  <Form.Control
                    name="banner"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập !
                  </Form.Control.Feedback>
                </Form.Group>
                {tempBanner && (
                  <div className="PreviewBanner mt-3">
                    <img src={tempBanner} alt="" />
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <div className="SectionInner FooterCreate">
            <div className="">
              <Button
                variant="primary"
                disabled={loading}
                type="submit"
                className="py-3"
              >
                Tạo Danh Mục
              </Button>
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}
