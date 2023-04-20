import React from "react"

export const SubCategory = () => {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={item.children[0]}
      // isDisabled={isDisabled}
      // isLoading={isLoading}
      // isClearable={isClearable}
      // isSearchable={isSearchable}
      name="color"
      options={item.children}
    />
  )
}
