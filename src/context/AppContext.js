import * as React from "react"
import { requestLogin } from "../services/api/accountSevice"
import { removeLocalData } from "../services/api/StoreageServices"
import { useEffect } from "react"
import { useState } from "react"
import { toastAlert } from "../helpers/toast"
import { useNavigate } from "react-router-dom"

export const DataContext = React.createContext()
const AppContext = (props) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isLogin, setIsLogin] = React.useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const _requestLogin = async () => {
    try {
      setLoading(true)
      const { success, message } = await requestLogin()
      setLoading(false)
      if (!success) {
        removeLocalData("access_token")
        removeLocalData("roles")
        removeLocalData("user")
        setIsLogin(false)
        toastAlert("error", message)
        navigate("/sign-in")
        throw new Error("Authorization")
      }
      setIsLogin(true)
    } catch (error) {
      setLoading(false)
      toastAlert(error)
    }
  }
  useEffect(() => {
    if (isLogin) _requestLogin()
  }, [])
  const value = {
    isCollapsed,
    setIsCollapsed,
    isLogin,
    setIsLogin,
    loading,
  }
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  )
}

export default AppContext
