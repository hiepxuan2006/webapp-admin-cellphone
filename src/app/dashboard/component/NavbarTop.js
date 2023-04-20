/* eslint-disable jsx-a11y/alt-text */
import { faBars, faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { DataContext } from "../../../context/AppContext"

const logo = require("../../../assets/image/logo.png")
const NavbarTop = () => {
  const { setIsCollapsed, isCollapsed } = useContext(DataContext)
  return (
    <div className="NavbarTop">
      <ul className="NavLeft">
        <li className="NavbarItem">
          <span
            className="SideBarToggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FontAwesomeIcon icon={faBars} />
          </span>
        </li>
        <li className="NavbarItem">
          <div className="SidebarLogo">
            <img src={logo} />
            <Link to={"/"}>
              <FontAwesomeIcon icon={faSquareArrowUpRight} />
            </Link>
          </div>
        </li>
        <li>
          <Link to="/" className="LogoLink"></Link>
        </li>
      </ul>
    </div>
  )
}

export default NavbarTop
