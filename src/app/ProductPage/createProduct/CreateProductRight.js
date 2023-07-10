import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { Form, FormText } from "react-bootstrap"
import { Input } from "reactstrap"
import Select from "react-select"
import { getTags } from "../../../services/api/productService"
import { useEffect } from "react"
import { Specification } from "./Specification"
export const CreateProductRight = ({
  tags,
  setTags,
  sale,
  setSale,
  key_word = [],
  setKey_word,
  products = [],
  setProduct_class,
  specifi,
  setSpecifi,
}) => {
  const [data, setData] = useState()
  const [keyWord, setKeyWord] = useState([])
  const _handleChangeInput = (e) => {
    setData(e.target.value)
  }
  const _handleSubmit = (e) => {
    e.preventDefault()
    setTags([...tags, data])
    setData("")
  }

  const _getKeyWord = async () => {
    const { data, success, message } = await getTags()

    if (!success) {
      throw new Error(message)
    }
    setKeyWord(data.tags)
  }
  useEffect(() => {
    _getKeyWord()
  }, [])
  const handleDelete = (tag) => {
    const newTags = tags.filter((item) => item !== tag)
    setTags(newTags)
  }

  const listKeyword =
    keyWord.length > 0 &&
    keyWord.map((item) => {
      item["label"] = item.title
      item["value"] = item._id
      return item
    })
  const onChangeSale = (e) => {
    const value = e.target.value
    if (!value.length) setSale(0)
    setSale(Number(value))
  }

  const onChangeProductClass = (e) => {
    setProduct_class(e.target.value)
  }
  const handleChangeKeyword = (option = []) => {
    setKey_word(option.map((item) => item._id))
  }
  return (
    <>
      <div className="SectionInner">
        <h1>Phân loại sản phẩm</h1>
        <div className="d-flex align-items-center gap-3">
          <div className={"d-flex align-items-center w-100"}>
            <Input
              className="me-2"
              name="product_class"
              onChange={onChangeProductClass}
              type="test"
            />
          </div>
        </div>
      </div>
      <div className="SectionInner ">
        <Form onSubmit={_handleSubmit}>
          <h1>Tags</h1>
          {tags.length > 0 && (
            <div className="d-flex gap-3">
              {tags.length &&
                tags.map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="d-flex gap-2 px-3 bg-primary text-white  rounded-3"
                    >
                      <span>{item}</span>
                      <p
                        onClick={() => handleDelete(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </p>
                    </div>
                  )
                })}
            </div>
          )}
          <Input
            name="value"
            value={data}
            autoComplete="off"
            className="mt-2"
            onChange={_handleChangeInput}
          />
          <FormText>Enter to add new value</FormText>
          <Input type="submit" className="d-none" />
        </Form>
      </div>
      <div className="SectionInner">
        <h1>Khuyến mãi</h1>
        <div className="d-flex align-items-center gap-3">
          <div className={"d-flex align-items-center"}>
            <Input className="me-2" onChange={onChangeSale} type="number" />
            <p>%</p>
          </div>
        </div>
      </div>
      <div className="SectionInner">
        <h1>Key word</h1>
        <Select
          onChange={(option) => {
            handleChangeKeyword(option)
          }}
          isMulti
          name="key_word"
          options={listKeyword}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <div className="SectionInner">
        <h1>Sản phẩm liên quan</h1>
        <Select
          onChange={(option) => {
            handleChangeKeyword(option)
          }}
          isMulti
          name="key_word"
          options={products}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <div className="SectionInner">
        <Specification specifi={specifi} setSpecifi={setSpecifi} />
      </div>
      <div className="SectionInner">
        <h1>Thống số kỹ thuật</h1>
        {specifi.length > 0 &&
          specifi.map((item, key) => {
            return (
              <div key={key} className="mb-4">
                <p className="mb-3">{item.label}</p>
                {item.value.map((val, key) => {
                  return (
                    <p key={key} className="ms-3">
                      {val.label} : {val.data}
                    </p>
                  )
                })}
              </div>
            )
          })}
      </div>
    </>
  )
}
