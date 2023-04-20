/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { Input } from "reactstrap"

const VariantSKU = (props) => {
  const [sku, setSku] = useState("")

  const { variant, changeVariant } = props

  const skuConfig = () => {
    const options = _.get(variant, "options", [])
    return `SKU-HX-${options
      .map((item) => item.name.substr(0, 1).toUpperCase())
      .join("-")}`
  }
  useEffect(() => {
    setSku(skuConfig())
  }, [variant])
  useEffect(() => {
    changeVariant(variant, "sku", sku)
  }, [sku])

  return (
    <td className="VariantSKU">
      <Input value={sku} />
    </td>
  )
}

export default VariantSKU
