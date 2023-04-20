/* eslint-disable no-unused-vars */
import React from "react"
import { Input } from "reactstrap"

const VariantSelector = (props) => {
  const { variant, variantIndex, onChangeProduct } = props
  const _handleChangeInput = (e) => {
    // onChangeProduct(`variants[${variantIndex}].is_selected`, e.target.checked);
  }

  return (
    <td className="VariantSelector">
      <Input
        id={`inputSelectVariant_${variantIndex}`}
        type="checkbox"
        checked={variant.is_selected}
        disabled={variant.is_default}
        onChange={_handleChangeInput}
      />
    </td>
  )
}

export default VariantSelector
