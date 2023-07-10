import _ from "lodash"
import { useCallback, useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDropzone } from "react-dropzone"
import Select from "react-select"
import { TextEditor } from "../../../Components/TextEditor"
import { LoadingProcess } from "../../../Components/loading/LoadingProcess"
import { EditorCk } from "../../../Components/textEditorCk/EditorCk"
import generateVariants from "../../../helpers/generateVariants"
import { toastAlert } from "../../../helpers/toast"
import { uploadImage } from "../../../services/api/createApiServices"
import {
  createProduct,
  getListProduct,
} from "../../../services/api/productService"
import { CategoryProduct } from "./CategoryProduct"
import { CreateProductRight } from "./CreateProductRight"
import ProductAttributesList from "./attributes/ProductAttributesList"
import VariantsTable from "./variants/VariantsTable"
import { Specification } from "./Specification"

const CreateProduct = () => {
  const [attributes, setAttributes] = useState([])
  const [variants, setVariants] = useState([])
  const [files, setFiles] = useState([])
  const [description, setDescription] = useState("")
  const [salientFeatures, setSalientFeatures] = useState("")
  const [childCategory, setChildCategory] = useState([])
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState("")
  const [showBtn, setShowBtn] = useState(false)
  const [sale, setSale] = useState(0)
  const [error, setError] = useState("")
  const [key_word, setKey_word] = useState([])
  const [loading, setLoading] = useState(false)
  const [product_class, setProduct_class] = useState("")
  const [products, setProducts] = useState([])
  const [specifi, setSpecifi] = useState([])
  const _getProducts = async () => {
    try {
      setLoading(true)

      const { data, success, message } = await getListProduct()

      if (!success) throw new Error(message)
      const newListProducts = data.data.map((item) => {
        item.label = item.title
        item.value = item._id
        return item
      })
      setProducts(newListProducts)
      setLoading(false)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    _getProducts()
  }, [])

  const _handleAddAttribute = () => {
    if (attributes.length === 0) {
      setAttributes([
        ...attributes,
        {
          is_preselected: true,
          position: attributes.length + 1,
          type: "",
          name: "",
          values: [],
        },
      ])
    }

    let attribute = attributes[attributes.length - 1]
    const errors = {}
    if (attribute.name && attribute.values.length) {
      setAttributes([
        ...attributes,
        {
          is_preselected: true,
          position: attributes.length + 1,
          type: "",
          name: "",
          values: [],
        },
      ])
    } else {
      if (!attribute.values.length) {
        errors.value = "At least one value required"
      }
      if (!attribute.name) {
        errors.name = "can not found"
      }
      attribute = Object.assign({}, attribute, { errors })
      const newAttributes = attributes.splice(0, attributes.length - 1)
      setAttributes([...newAttributes, attribute])
    }
  }
  const onChangeAttribute = (key, vKey, value, hasVariants = false) => {
    const newAttribute =
      attributes &&
      attributes.map((item) => {
        if (item["position"] === vKey) {
          item[key] = value
        }
        return item
      })
    if (hasVariants) {
      const variants = generateVariants(attributes)
      setVariants(variants)
    }
    setAttributes(newAttribute)
  }
  useEffect(() => {
    const variants = generateVariants(attributes)
    setVariants(variants)
  }, [attributes])

  const changeVariant = (variant, field, data) => {
    const keyVariant = _.get(variant, "options")
      .map((item) => item.name)
      .join("/")
    variants.length > 0 &&
      variants.map((item) => {
        const option = _.get(item, "options")
        const key = option.length && option.map((item) => item.name).join("/")
        if (key === keyVariant) {
          item[field] = data
        }
        return item
      })
  }
  const onDrop = useCallback(
    async (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles])
    },
    [files]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const [data, setData] = useState({
    name: "",
    price: "",
  })
  const { name, price } = data
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    // setError({ ...error, [e.target.name]: "" })
  }
  const handleFocus = (e) => {
    setError({ ...error, [e.target.name]: e.target.value })
  }
  let err = {}
  const handleSubmit = async () => {
    setLoading(true)
    const categoryAll = [category, ...childCategory]
    const newProduct = {
      name,
      price,
      tags,
      category: categoryAll,
      childCategory: childCategory,
      attributes,
      variants,
      key_word,
      sale,
      description,
      salientFeatures,
      product_class,
    }
    if (!name) err.name = "Vui lòng nhập tên sản phẩm"
    if (!price) err.price = "Vui lòng nhập giá sản phẩm"
    if (!category.length > 0)
      err.category = "Vui lòng chọn danh mục sản phẩm sản phẩm"
    if (!files.length > 0) err.images = "Vui lòng chọn ảnh của sản phẩm"
    if (!(description.length > 8))
      err.description = "Vui lòng viết mô tả sản phẩm"
    if (!salientFeatures.length)
      err.salientFeatures = "Vui lòng nhập đặc điểm sản phẩm"
    setError(err)
    if (Object.values(err).length !== 0) {
      setLoading(false)
      toastAlert("warn", "Vuil lòng nhập đầy đủ thông tin")
      return
    }
    const form_data = new FormData()
    for (let i = 0; i < files.length; i++) {
      form_data.append(`image`, files[i])
    }
    const { data, success, message } = await uploadImage(form_data)
    if (!success) {
      setLoading(false)
      toastAlert("error", message)
      throw new Error(message)
    }

    newProduct.images = data.map((item) => {
      return item.secure_url
    })

    const { success: successCre, message: messageCre } = await createProduct(
      newProduct
    )

    if (!successCre) {
      setLoading(false)
      toastAlert("error", "Thất bại")
      throw new Error(messageCre)
    }
    setLoading(false)
    toastAlert("success", "Thành công")
    window.location.reload()
  }
  return (
    <div className="CreateProductPage ">
      <h1>Create Product</h1>
      <Row>
        <Form.Group as={Col} md="8">
          <Form md="3">
            <div className="SectionInner">
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <h1>
                    Tên sản phẩm <span className="text-danger ml-1">(*)</span>
                  </h1>
                  <Form.Control
                    required
                    name="name"
                    type="text"
                    placeholder="First name"
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập !
                  </Form.Control.Feedback>
                </Form.Group>
                {error.name && (
                  <span
                    className="fw-lighter fst-italic"
                    style={{ color: "red" }}
                  >
                    {error.name}
                  </span>
                )}
              </Row>
            </div>

            <div className="SectionInner">
              <Row>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <h1>
                    Giá sản phẩm <span className="text-danger ml-1">(*)</span>
                  </h1>

                  <Form.Control
                    type="text"
                    name="price"
                    required
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập giá
                  </Form.Control.Feedback>
                  {error.price && (
                    <span
                      className="fw-lighter fst-italic"
                      style={{ color: "red" }}
                    >
                      {error.price}
                    </span>
                  )}
                </Form.Group>
              </Row>
            </div>

            <div className="SectionInner">
              <Row>
                <Form.Group as={Col} md="12" className="mt-4">
                  <CategoryProduct
                    childCategory={childCategory}
                    category={category}
                    setCategory={setCategory}
                    setChildCategory={setChildCategory}
                  />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  Vui lòng chọn danh mục
                </Form.Control.Feedback>
                {error.category && (
                  <span
                    className="fw-lighter fst-italic"
                    style={{ color: "red" }}
                  >
                    {error.category}
                  </span>
                )}
              </Row>
            </div>

            <div className="SectionInner">
              <Row>
                <Form.Group md="12" as={Col} controlId="validationCustom05">
                  <h1>
                    Đặc điểm nổi bật
                    <span className="text-danger ml-1">(*)</span>
                  </h1>
                  <EditorCk setData={setSalientFeatures} />
                  {error.salientFeatures && (
                    <span
                      className="fw-lighter fst-italic"
                      style={{ color: "red" }}
                    >
                      {error.salientFeatures}
                    </span>
                  )}
                </Form.Group>
              </Row>
            </div>

            <div className="SectionInner">
              <Row>
                <Form.Group md="12" as={Col} controlId="validationCustom05">
                  <h1>
                    Mô tả sản phẩm <span className="text-danger ml-1">(*)</span>
                  </h1>
                  <TextEditor setDescription={setDescription} />
                  {error.description && (
                    <span
                      className="fw-lighter fst-italic"
                      style={{ color: "red" }}
                    >
                      {error.description}
                    </span>
                  )}
                </Form.Group>
              </Row>
            </div>
          </Form>

          <div className="SectionInner">
            <h1>
              Product Image <span className="text-danger ml-1">(*)</span>
            </h1>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Nhấn vào đây để chọn ảnh</p>
              )}
            </div>
          </div>
          {error.images && (
            <span className="fw-lighter fst-italic" style={{ color: "red" }}>
              {error.images}
            </span>
          )}
          <div className="SectionInner d-flex gap-3">
            {files.map((file) => (
              <div style={{ height: "100px", width: "200px" }}>
                <img
                  src={URL.createObjectURL(file)}
                  key={file.name}
                  alt={file.name}
                />
              </div>
            ))}
          </div>
          <div className="SectionInner">
            <h1>Thuộc tính</h1>
            <p>Thêm thuộc tính cho sản phẩm</p>
            <div className="">
              {attributes.length > 0 ? (
                <ProductAttributesList
                  onChangeAttribute={onChangeAttribute}
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
              ) : (
                ""
              )}
              <Button
                color="primary"
                outline
                className="mt-3 AddAttribute"
                onClick={() => _handleAddAttribute()}
              >
                Thêm thuộc tính
              </Button>
            </div>
          </div>
          <div className="SectionInner">
            <h1>Biến thể của sản phẩm</h1>
            <p>Quản lí các biến thể của sản phẩm</p>
            <div className="VariantsTableContainer">
              <VariantsTable
                setShowBtn={setShowBtn}
                showBtn={showBtn}
                changeVariant={changeVariant}
                attributes={attributes}
                variants={variants}
              />
            </div>
          </div>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <CreateProductRight
            tags={tags}
            setTags={setTags}
            sale={sale}
            setSale={setSale}
            setKey_word={setKey_word}
            key_word={key_word}
            products={products}
            specifi={specifi}
            setSpecifi={setSpecifi}
            setProduct_class={setProduct_class}
          />
        </Form.Group>
      </Row>
      <div className="SectionInner FooterCreate">
        <div className="">
          <button onClick={() => handleSubmit()}>Tạo Sản phẩm</button>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
