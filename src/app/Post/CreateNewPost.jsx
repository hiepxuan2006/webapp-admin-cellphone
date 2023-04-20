import React from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { EditorCk } from "../../Components/textEditorCk/EditorCk"
import { FormNewPostRight } from "./FormNewPostRight"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { createNewsPaper, getAllTopic } from "../../services/api/postService"
import { useEffect } from "react"
import { toastAlert } from "../../helpers/toast"
import { Loading } from "../../Components/Loading"

export const CreateNewPost = () => {
  const [tags, setTags] = useState([])
  const [image, setImage] = useState("")
  const [tempImage, setTempImage] = useState("")
  const [topics, setTopics] = useState([])
  const [content, setContent] = useState("")
  const [topicId, setTopicId] = useState("")
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [disable, setDisable] = useState(false)

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
    const reader = new FileReader()
    reader.onload = () => {
      setTempImage(reader.result)
    }
    reader.readAsDataURL(selectedImage)
  }
  const handleClose = () => {
    setImage("")
    setTempImage("")
  }

  const _getAllTopic = async () => {
    const { data, success, message } = await getAllTopic()
    if (!success) throw new Error(message)
    const newData = data.filter((item) => item.slug !== "trang-chu")
    setTopics(newData)
  }
  useEffect(() => {
    _getAllTopic()
  }, [])

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = async () => {
    const newsPaper = {
      title,
      content,
      topicId,
      tags,
    }
    setLoading(true)
    setDisable(true)
    if (!title || !content || !topicId || !tags.length) {
      setLoading(false)
      setDisable(false)
      toastAlert("warn", "Vui lòng nhập đầy đủ thông tin !")
      return
    }
    const formData = new FormData()
    formData.append("image", image)
    formData.append("title", title)
    formData.append("content", content)
    formData.append("topicId", topicId)
    formData.append("tags", tags)

    const { data, success, message } = await createNewsPaper(formData)
    setLoading(false)
    if (!success) {
      setDisable(false)

      toastAlert("error", message)
      return
    }
    window.location.reload()
    toastAlert("success", "Thêm bài viết thành công")
    setDisable(false)
  }
  return (
    <div className="CreateProductPage" style={{ position: "relative" }}>
      <Loading loading={loading} />
      <h1>Tạo bài viết</h1>
      <Row>
        {/* <div className="SectionInner"> */}
        <Form.Group as={Col} md="8">
          <div className="SectionInner">
            <h1>
              Tiêu đề bài viết <span className="text-danger ml-1">(*)</span>
            </h1>
            <Form.Control
              required
              name="title"
              type="text"
              onChange={onChangeTitle}
              placeholder="First name"
              // onChange={handleChange}
              // onFocus={handleFocus}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập !
            </Form.Control.Feedback>
          </div>
          <div className="SectionInner">
            <h1>
              Chuyên mục bài viết <span className="text-danger ml-1">(*)</span>
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
          <div className="SectionInner">
            <h1>
              Tiêu đề bài viết <span className="text-danger ml-1">(*)</span>
            </h1>
            <EditorCk setData={setContent} />
          </div>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <FormNewPostRight
            data={tags}
            topics={topics}
            setData={setTags}
            hidden={true}
            setTopicId={setTopicId}
          />
        </Form.Group>
        {/* </div> */}
      </Row>
      <Row>
        <Form.Group as={Col} md="12">
          <div className="SectionInner ">
            <Button onClick={() => handleSubmit()}>Tạo bài viết</Button>
          </div>
        </Form.Group>
      </Row>
    </div>
  )
}
