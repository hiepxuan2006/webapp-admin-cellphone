import React from "react"
import { useState } from "react"
import { useEffect } from "react"

export const Quantity = (props) => {
  const [quantity, setQuantity] = useState(0)
  const { variant, changeVariant } = props

  const handleChangeSale = (e) => {
    const value = e.target.value
    if (value) setQuantity(value)
  }
  useEffect(() => {
    changeVariant(variant, "sale", quantity)
  }, [quantity])

  return (
    <td className="">
      <input type="number" onChange={handleChangeSale} />
    </td>
  )
}
