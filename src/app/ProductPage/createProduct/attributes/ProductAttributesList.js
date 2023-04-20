import React from "react"
import InputAttributeName from "./InputAttributeName"
import InputAttributeType from "./InputAttributeType"
import InputAttributeValue from "./InputAttributeValue"
import PreviewAttributeValues from "./PreviewAttributeValues"

const AttributeItem = (props) => {
  return (
    <tr>
      <InputAttributeName {...props} />
      <InputAttributeType {...props} />
      <InputAttributeValue {...props} />
      <PreviewAttributeValues {...props} />
    </tr>
  )
}

const ProductAttributesList = (props) => {
  return (
    <div className="ProductAttributesList mt-3">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className=" col-2 Name">
                Name<span className="text-danger ml-1">*</span>
              </th>
              <th className=" col-2 Type">
                Type<span className="text-danger ml-1">*</span>
              </th>
              <th className=" col-2 Value">
                Value<span className="text-danger ml-1">*</span>
              </th>
              <th className=" col-2 Preview">Preview</th>
            </tr>
          </thead>

          <tbody>
            {props.attributes &&
              props.attributes.map((attribute, index) => (
                <AttributeItem
                  key={index}
                  {...props}
                  index={index}
                  attIndex={index}
                  attribute={attribute}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductAttributesList
