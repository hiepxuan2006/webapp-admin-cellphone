/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react"
import Select from "react-select"
import { getCategories } from "../../../services/api/categoryApiService"
import _ from "lodash"
export const CategoryProduct = ({
  setCategory,
  category,
  setChildCategory,
  childCategory,
}) => {
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([[]])

  useEffect(() => {
    const _fetchCategories = async () => {
      const { data } = await getCategories()
      setCategories(data)
    }
    _fetchCategories()
  }, [])
  const handleChange = (e) => {
    setCategory(e._id)
  }
  const handleChangeSubCategory = (option, id) => {
    const value = option.map((item) => item._id)
    const newSub = [...subCategories]
    newSub[id] = value
    setSubCategories(newSub)
  }

  useEffect(() => {
    setChildCategory(_.flattenDeep(subCategories))
  }, [subCategories])
  const listCategories =
    categories.length > 0 &&
    categories.map((item) => {
      item["value"] = item._id
      return item
    })
  const subCategory = (array, id) => {
    const data = category && array.filter((item) => item._id.toString() === id)
    if (data.length && data[0].children.length) {
      return (
        <Fragment>
          {data[0].children.map((item1, key) => {
            const newSubChild = item1.children.map((item) => {
              item["value"] = item?._id
              return item
            })
            return (
              <div key={key} className="col col-md-6 d-flex flex-column">
                <label htmlFor="">{item1.label}</label>
                <Select
                  isMulti
                  placeholder="Select Option"
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  onChange={(option) => handleChangeSubCategory(option, key)}
                  name="color"
                  options={newSubChild}
                />
              </div>
            )
          })}
        </Fragment>
      )
    }
  }
  return (
    <>
      <h1>
        Danh mục sản phẩm <span className="text-danger ml-1">(*)</span>
      </h1>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable={true}
        defaultValue={categories[0]}
        name="color"
        options={listCategories}
        onChange={handleChange}
      />
      <div className="row">{subCategory(categories, category)}</div>
      <div className="invalid-feedback">Please select a valid state.</div>
    </>
  )
}
