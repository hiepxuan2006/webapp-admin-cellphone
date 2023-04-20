import React, { useState } from "react"
import { FormFeedback, FormText, Input } from "reactstrap"
import slugify from "slugify"
const InputAttributeValue = (props) => {
  const { attribute, onChangeAttribute } = props
  const [data, setData] = useState({
    name: "",
    value: "",
    errors: {},
  })
  const { name, value, errors } = data
  const _getInputNamePlaceholder = () => {
    switch (props.attribute.type) {
      case "label":
        return "e.g. XXL"
      case "slide":
        return "e.g. Classic T-Shirt"
      case "size":
        return "e.g. XXL"
      case "color":
        return "e.g #000000"
      default:
        return "e.g. Classic T-Shirt"
    }
  }

  const _handleChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const _validateInputs = () => {
    const nameTrimmed = data.name.trim()
    const valueTrimmed = data.value.trim()
    const errors = {}
    setData({ ...data, errors: {} })
    if (nameTrimmed === "" && attribute.type === "color")
      errors.name = "Please provide a name"

    if (valueTrimmed === "") errors.value = "Please provide a value"

    if (attribute.values.some((attValue) => attValue.value === valueTrimmed))
      errors.value = "This value already existed"

    return errors
  }

  const _handleSubmit = (e) => {
    e.preventDefault()
    const resultValidation = _validateInputs()
    const hasError = Object.values(resultValidation).filter(Boolean).length > 0
    if (hasError) {
      setData({ ...data, errors: resultValidation })
      return
    }
    const dataValues = [
      ...attribute.values,
      {
        name: attribute.type === "color" ? name : value,
        value: value,
        position: attribute.values.length ? attribute.values.length + 1 : 1,
        slug: slugify(name, {
          lower: true,
          strict: true,
        }),
      },
    ]
    onChangeAttribute("values", attribute.position, dataValues)
    setData({ name: "", value: "", errors: {} })
  }

  return (
    <td className="InputAttributeValue">
      <form onSubmit={_handleSubmit} noValidate>
        {props.attribute.type === "color" && (
          <Input
            name="name"
            value={name}
            placeholder="e.g Black"
            invalid={!!errors.name}
            autoComplete="off"
            onChange={_handleChangeInput}
          />
        )}

        {!!errors.name && <FormFeedback>{errors.name}</FormFeedback>}

        <Input
          disabled={!attribute.type}
          name="value"
          value={value}
          placeholder={_getInputNamePlaceholder()}
          autoComplete="off"
          className="mt-2"
          onChange={_handleChangeInput}
          invalid={!!errors.value}
        />
        {!!errors.value && <FormFeedback>{errors.value}</FormFeedback>}
        <FormText>Enter to add new value</FormText>

        <Input type="submit" className="d-none" />
      </form>
    </td>
  )
}

export default InputAttributeValue
