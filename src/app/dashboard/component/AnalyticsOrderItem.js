import { faCartFlatbed } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"

export const AnalyticsOrderItem = (args) => {
  const { title, class_css, icon, countOrder = 0, type, href } = args
  return (
    <Link to={href} className={`${class_css} AnalyticsOrderItem`}>
      <h2>{title}</h2>
      <div className="d-flex align-items-center justify-content-between">
        <p>{countOrder[type]}</p>
        <FontAwesomeIcon icon={icon} />
      </div>
    </Link>
  )
}
