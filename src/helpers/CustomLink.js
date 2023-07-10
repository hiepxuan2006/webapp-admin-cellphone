import React from "react"
import { NavLink } from "react-router-dom"

export const CustomLink = ({ to, children, onClick }) => {
  const handleClick = (event) => {
    event.preventDefault() // Ngăn chuyển hướng mặc định
    // Thực hiện các xử lý khác (nếu cần)
    onClick()
  }

  return (
    <NavLink to={to} className={"nav-link"} onClick={handleClick}>
      {children}
    </NavLink>
  )
}
