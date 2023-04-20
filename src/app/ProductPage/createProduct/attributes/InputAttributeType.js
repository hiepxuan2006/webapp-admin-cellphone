import React from "react"
import { Input } from "reactstrap"

//import PropTypes from 'prop-types'

const InputAttributeType = (props) => {
  const { onChangeAttribute, attribute, attributes } = props

  const _handleChangeSelect = (e) => {
    const { value } = e.target
    onChangeAttribute("type", attribute.position, value)
  }

  const attributeType = attributes.map((attribute) => attribute.type)
  return (
    <td className="InputAttributeType">
      <Input
        type="select"
        className="InputAttributeType"
        onChange={_handleChangeSelect}
      >
        <option defaultValue={"DEFAULT"} selected disabled>
          Chose
        </option>
        <option
          selected={attribute.type === "color"}
          disabled={attributeType.some((type) => type === "color")}
          value="color"
        >
          Color
        </option>
        <option
          selected={attribute.type === "size"}
          disabled={attributeType.some((type) => type === "size")}
          value="size"
        >
          Size
        </option>
        <option
          selected={attribute.type === "memory"}
          disabled={attributeType.some((type) => type === "memory")}
          value="memory"
        >
          Memory
        </option>
      </Input>
    </td>
  )
}

export default InputAttributeType
