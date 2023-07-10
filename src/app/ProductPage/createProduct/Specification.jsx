import React, { Fragment, useState } from "react"
import { Col, Row } from "react-bootstrap"
import Select from "react-select"
import { Input } from "reactstrap"
import fetchData from "../../../helpers/data.json"
import CreatableSelect from "react-select/creatable"
export const Specification = ({ specifi = [], setSpecifi }) => {
  const { data } = fetchData
  const [group, setGroup] = useState("")
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")
  const [option, setOption] = useState("")
  const specification = []
  let [dataSpe, setDataSpe] = useState([])

  const handleChange = (option) => {
    setGroup(option.value)
    setKey(option.children)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    option["data"] = value
    setDataSpe([...dataSpe, option])
    const isExits = specifi.filter((item) => item.label === group)

    if (!isExits.length) {
      setSpecifi([
        ...specifi,
        {
          label: group,
          value: [option],
        },
      ])
    } else {
      const isNotExits = specifi.filter((item) => item.label !== group)

      setSpecifi([
        ...isNotExits,
        { label: group, value: [...isExits[0].value, option] },
      ])
    }

    setOption("")
    setValue("")
  }

  return (
    <Fragment>
      <h1>Thông số kỹ thuật</h1>
      <Row>
        <Col md={12}>
          <p>Nhóm</p>
          <Select options={data} onChange={(option) => handleChange(option)} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p>key</p>
          <CreatableSelect
            onChange={(op) => {
              setOption(op)
            }}
            value={option}
            isClearable
            isDisabled={!group}
            options={key}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p>Value</p>

          <form onSubmit={handleSubmit}>
            <Input
              disabled={!option}
              name="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Input type="submit" hidden />
          </form>
        </Col>
      </Row>
    </Fragment>
  )
}
