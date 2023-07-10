import { faCartFlatbed } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export const AnalyticsOrderItem = (args) => {
  const { title, class_css, icon } = args
  return (
    <div className={`${class_css} AnalyticsOrderItem`}>
      <h2>{title}</h2>
      <div className="d-flex align-items-center justify-content-between">
        <p>1</p>
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  )
}
