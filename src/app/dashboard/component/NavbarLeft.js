import { getLocalData } from "../../../services/api/StoreageServices"
import MenuItem from "./MenuItem"
const { NAVBAR_MENU, NAVBAR_MENU_Home } = require("../constants")
const shop = require("../../../assets/shop.jpg")
const NavbarLeft = ({ pathname }) => {
  const navbar = NAVBAR_MENU_Home
  const user = getLocalData("user")

  return (
    <div className="NavbarLeft">
      <div className="NavbarLeftInner justify-content-between">
        <div className="NavbarLeftStore">
          <div className="StoreName">
            <img src={shop} alt="" />
          </div>
          <p>{user && user.name}</p>
        </div>
        <nav className="PrimaryMenu">
          {navbar.map((nav, index) => {
            return (
              <div className="NavbarLeftItem" key={index}>
                <p className="GroupName">{nav.group}</p>
                {nav.child.map((child, index) => {
                  return (
                    <MenuItem pathname={pathname} item={child} key={index} />
                  )
                })}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default NavbarLeft
