import {
  faSquare,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"

function MenuItem({ item, selectedCheckbox, setSelectedCheckbox }) {
  const hasChildren = item.children && item.children.length > 0
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()

    setIsExpanded(!isExpanded)
  }
  const handleClickExit = (e) => {
    e.preventDefault()
    setIsExpanded(!isExpanded)
    setSelectedCheckbox("")
  }
  return (
    <li className="">
      <div className="d-flex align-items-center ">
        {hasChildren ? (
          <>
            <FontAwesomeIcon
              onClick={isExpanded ? handleClickExit : handleClick}
              style={{ cursor: "pointer" }}
              icon={isExpanded ? faSquareMinus : faSquarePlus}
              className="me-3"
            />
            <input
              className="me-3"
              name="check"
              type="checkbox"
              value={item._id}
              checked={selectedCheckbox === item._id}
              onChange={() => setSelectedCheckbox(item._id)}
            />
          </>
        ) : (
          <>
            <FontAwesomeIcon
              onClick={handleClickExit}
              style={{ cursor: "pointer" }}
              icon={faSquare}
              className="me-3"
            />
            <input
              className="me-3"
              name="check"
              type="checkbox"
              value={item._id}
              checked={selectedCheckbox === item._id}
              onChange={() => setSelectedCheckbox(item._id)}
            />
          </>
        )}

        <a href={item.link}>{item.label}</a>
      </div>
      {hasChildren && isExpanded && (
        <ul>
          {item.children.map((subItem) => (
            <MenuItem
              key={subItem.id}
              last={true}
              item={subItem}
              selectedCheckbox={selectedCheckbox}
              setSelectedCheckbox={setSelectedCheckbox}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
export default MenuItem
