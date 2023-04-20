/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"

//import PropTypes from 'prop-types'

const VariantRetailPrice = (props) => {
  const [price, setPrice] = useState("")
  const { variant, changeVariant } = props
  const _handleChangeInput = (e) => {
    setPrice(e.target.value)
  }
  useEffect(() => {
    changeVariant(variant, "retail_price", price)
  }, [price])
  return (
    <td className="VariantRetailPrice">
      <div className="position-relative">
        <NumericFormat
          onChange={_handleChangeInput}
          // value={props.variant.retail_price ?? ""}
          className={classNames("form-control")}
        />
      </div>
    </td>
  )
}
export default VariantRetailPrice
