import React from "react"
const logo = require("../../assets/shop.jpg")
export const DetailAcount = () => {
  return (
    <div className="DetailAccount">
      <div className="SectionInner" >
        <h1 className="mb-3">Account</h1>
        <div className="InfoAccount">
          <div className="AvatarAccount">
            <img src={logo} alt="" />
          </div>
          <div className="BackgroundAccount mt-auto">
            <h3>Cao Xuân Hiệp</h3>
            <p>hiepxuan200@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
