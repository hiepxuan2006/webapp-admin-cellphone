import MenuItem from "./MenuItem"
const { NAVBAR_MENU } = require("../constants")
const NavbarLeft = ({ pathname }) => {
  const navbar = NAVBAR_MENU
  return (
    <div className="NavbarLeft">
      <div className="NavbarLeftInner justify-content-between">
        <nav className="PrimaryMenu">
          {navbar.map((nav) => {
            return (
              <div>
                <MenuItem pathname={pathname} item={nav} key={nav.href} />
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default NavbarLeft
