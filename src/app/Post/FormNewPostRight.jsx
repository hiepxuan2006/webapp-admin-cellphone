import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useState } from "react"
import { Form, FormText } from "react-bootstrap"
import { Input } from "reactstrap"
import Select from "react-select"
export const FormNewPostRight = ({
  data = [],
  topics,
  setData,
  hidden = false,
  topicId = "",
  setTopicId,
}) => {
  const [value, setValue] = useState()

  const _handleChangeInput = (e) => {
    setValue(e.target.value)
  }

  const handleDelete = (tag) => {
    const newTags = data.filter((item) => item !== tag)
    setData(newTags)
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setData([...data, value])
      setValue("")
    }
  }
  topics = topics.map((item) => {
    item.value = item.title
    return item
  })
  return (
    <>
      <div className="SectionInner ">
        <h1>
          Tags bài viết <span className="text-danger ml-1">(*)</span>
        </h1>
        {data.length > 0 && hidden && (
          <div className="d-flex gap-3">
            {data.length > 0 &&
              data.map((item, key) => {
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
          autoComplete="off"
          className="mt-2"
          value={value}
          onChange={_handleChangeInput}
          onKeyPress={handleKeyPress}
        />
        <FormText>Enter to add new value</FormText>
        <button hidden className="d-none" />
      </div>
      <div className="SectionInner ">
        <h1>Chuyên mục bài viết</h1>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isClearable={true}
          defaultValue={topics.filter((option) => option._id === topicId)}
          isSearchable
          isMulti
          name="color"
          options={topics}
          onChange={(option) => {
            setTopicId(option._id)
          }}
        />
      </div>
    </>
  )
}
