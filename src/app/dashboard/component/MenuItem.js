import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { NavLink } from "react-router-dom"

const MenuItem = (props) => {
  const { item } = props
  const { title, icon, href } = item
  return (
    <div className="">
      <NavLink to={href} className={classNames("nav-link")}>
        <span className="IconHolder" data-tooltip={title}>
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="Title mr-auto">{title}</span>
      </NavLink>
      <ul className="sub_menu_nav">
        {item?.children &&
          item.children.length &&
          item.children.map((value, key) => {
            return <li>{value.title}</li>
          })}
      </ul>
    </div>
  )
}

export default MenuItem
