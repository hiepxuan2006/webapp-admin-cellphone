import React from "react"
const logo = require("../../assets/shop.jpg")
export const DetailAcount = ({ children, account }) => {
  console.log(account)
  return (
    <div className="DetailAccount">
      <div className="row h-100">
        <div className="col SectionInner m-0  col-md-3 h-100">
          <div className="InfoAccount">
            <div className="AvatarAccount">
              <img src={logo} alt="" />
            </div>
            <div className="BackgroundAccount text-center ">
              <h3>{account && account.name}</h3>
              <h3>{account && account.email}</h3>
            </div>
          </div>
        </div>
        <div className="col col-md-9 m-0  SectionInner BodyInfoAccount">
          {children}
        </div>
      </div>
    </div>
  )
}
