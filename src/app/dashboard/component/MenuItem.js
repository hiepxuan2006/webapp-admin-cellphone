import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { useState } from "react"
import { CustomLink } from "../../../helpers/CustomLink"
import { NavLink } from "react-router-dom"

const MenuItem = (props) => {
  const { item } = props
  const [isChildVisible, setIsChildVisible] = useState(false)
  const { title, icon, href } = item
  const handleClick = () => {
    setIsChildVisible(!isChildVisible)
  }
  return (
    <div className="dropdown">
      <div className="dropdown_nav" id="dropdownMenuButton1">
        {item.child.length > 0 ? (
          <CustomLink to={href} className={classNames("nav-link")}>
            <span className="IconHolder" data-tooltip={title}>
              <FontAwesomeIcon icon={icon} />
            </span>
            <span className="Title mr-auto">{title}</span>
          </CustomLink>
        ) : (
          <NavLink to={href} className={classNames("nav-link")}>
            <span className="IconHolder" data-tooltip={title}>
              <FontAwesomeIcon icon={icon} />
            </span>
            <span className="Title mr-auto">{title}</span>
          </NavLink>
        )}
        {item.child.length > 0 && isChildVisible ? (
          <FontAwesomeIcon
            className="dropdown_icon"
            onClick={handleClick}
            icon={faChevronRight}
          />
        ) : item.child.length > 0 && !isChildVisible ? (
          <FontAwesomeIcon
            className="dropdown_icon"
            onClick={handleClick}
            icon={faChevronDown}
          />
        ) : (
          ""
        )}
      </div>
      {isChildVisible ? (
        <ul className="sub_menu_nav nav-visible">
          {item?.child &&
            item.child.length > 0 &&
            item.child.map((value, key) => {
              return (
                <li key={key}>
                  <NavLink to={value.href}>{value.title}</NavLink>
                </li>
              )
            })}
        </ul>
      ) : (
        ""
      )}
    </div>
  )
}

export default MenuItem
