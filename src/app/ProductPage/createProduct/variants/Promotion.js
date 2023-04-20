/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"

export const Promotion = (props) => {
  const [sale, setSale] = useState(0)
  const { variant, changeVariant } = props

  const handleChangeSale = (e) => {
    const value = e.target.value
    if (value) setSale(value)
  }
  useEffect(() => {
    changeVariant(variant, "sale", sale)
  }, [sale])

  return (
    <td className="">
      <input type="number" onChange={handleChangeSale} />
    </td>
  )
}
