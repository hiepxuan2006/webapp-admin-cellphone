/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Input } from "reactstrap"
//import PropTypes from 'prop-types'

const InputAttributeName = (props) => {
  const { attribute, onChangeAttribute } = props
  const [data, setData] = useState({
    name: "",
    errors: {},
  })
  const { name, errors } = data
  const _getInputPlaceholder = () => {
    switch (attribute.type) {
      case "size":
        return "e.g. Sizes"
      case "color":
        return "e.g. Colors"
      case "label":
        return "e.g. Sizes"
      case "slide":
        return "e.g. Products"
      default:
        return "e.g. Products"
    }
  }

  const handleChange = (e) => {
    setData({ ...data, name: e.target.value })
  }
  useEffect(() => {
    onChangeAttribute("name", attribute.position, name, true)
  }, [name])
  return (
    <td className="InputAttributeName">
      <Input
        disabled={!attribute.type}
        name="name"
        // value={attribute.name}
        onChange={handleChange}
        placeholder={_getInputPlaceholder()}
        invalid={!!errors.name || !attribute.name}
      />
    </td>
  )
}

//InputAttributeName.defaultProps = {}

//InputAttributeName.propTypes = {}

export default InputAttributeName
