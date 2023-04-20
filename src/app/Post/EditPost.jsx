import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { EditorCk } from "../../Components/textEditorCk/EditorCk"
import {
  getAllTopic,
  getPost,
  updatePost,
} from "../../services/api/postService"
import { FormNewPostRight } from "./FormNewPostRight"
import { toastAlert } from "../../helpers/toast"

export const EditPost = () => {
  const [tags, setTags] = useState([])
  const [image, setImage] = useState("")
  const [tempImage, setTempImage] = useState("")
  const [topics, setTopics] = useState([])
  const [content, setContent] = useState("")
  const [topicId, setTopicId] = useState("")
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [disable, setDisable] = useState(false)
  const [post, setPost] = useState("")

  const navigate = useNavigate()
  const handleClose = () => {
    setImage("")
    setTempImage("")
  }

  const { id } = useParams()

  useEffect(() => {
    ;(async () => {
      const { success, data, message } = await getPost(id)
      if (!success) {
        throw new Error(message)
      }
      setPost(data)
      setTags(data.tags)
      setTopicId(data.topic_id._id)
      setContent(data.content)
      setTitle(data.title)
    })()
  }, [])

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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
    const reader = new FileReader()
    reader.onload = () => {
      setTempImage(reader.result)
    }
    reader.readAsDataURL(selectedImage)
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append("image", image)
    formData.append("title", title)
    formData.append("content", content)
    formData.append("topicId", topicId)
    formData.append("tags", tags)
    setLoading(true)

    const { success, data, message } = await updatePost(post._id, formData)
    setLoading(false)
    if (!success) {
      toastAlert("error", message)
      return
    }
    toastAlert("success", "Cập nhật thành công")
    navigate("/a/admin/post")
  }
  return (
    <div className="EditPost">
      <div className="SectionInner">
        <h1>Chỉnh sửa bài viết</h1>
      </div>
      {post && (
        <div className="SectionInner">
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
                  value={title}
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
                  Chuyên mục bài viết{" "}
                  <span className="text-danger ml-1">(*)</span>
                </h1>
                <Form.Control
                  type="file"
                  accept="image/*"
                  placeholder="Miêu tả ...."
                  onChange={handleImageChange}
                />
                {/* {tempImage && ( */}
                <div
                  className="mt-3"
                  style={{ height: "300px", width: "700px" }}
                >
                  <FontAwesomeIcon
                    icon={faClose}
                    onClick={() => handleClose()}
                  />
                  <img
                    className="h-100 w-100 object-fit-cover"
                    style={{}}
                    src={tempImage || post.image}
                    alt=""
                  />
                </div>
                {/* )} */}
              </div>
              <div className="SectionInner">
                <h1>
                  Tiêu đề bài viết <span className="text-danger ml-1">(*)</span>
                </h1>
                <EditorCk content={content} setData={setContent} />
              </div>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <FormNewPostRight
                data={tags}
                topics={topics}
                setData={setTags}
                topicId={topicId}
                hidden={true}
                setTopicId={setTopicId}
              />
            </Form.Group>
            {/* </div> */}
          </Row>
          <Row>
            <Form.Group as={Col} md="12">
              <div className="SectionInner ">
                <Button disabled={loading} onClick={handleUpdate}>
                  Tạo bài viết
                </Button>
              </div>
            </Form.Group>
          </Row>
        </div>
      )}
    </div>
  )
}
