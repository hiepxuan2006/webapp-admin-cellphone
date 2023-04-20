import React from "react"
import { Form } from "react-bootstrap"
import { Input } from "reactstrap"

export const FormInput = ({ data, setData, title }) => {
  const _handleChangeInput = (e) => {
    setData(e.target.value)
  }
  return (
    <div className="SectionInner ">
      <Form>
        <h1>{title}</h1>

        <Input
          name="value"
          value={data}
          autoComplete="off"
          className="mt-2"
          onChange={_handleChangeInput}
        />
      </Form>
    </div>
  )
}
