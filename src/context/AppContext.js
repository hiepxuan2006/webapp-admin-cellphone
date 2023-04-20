import * as React from "react"
import { requestLogin } from "../services/api/accountSevice"
import { removeLocalData } from "../services/api/StoreageServices"
import { useEffect } from "react"
import { useState } from "react"

export const DataContext = React.createContext()
const AppContext = (props) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isLogin, setIsLogin] = React.useState(true)
  const [loading, setLoading] = useState(false)

  const _requestLogin = async () => {
    setLoading(true)
    const { success } = await requestLogin()
    setLoading(false)
    if (!success) {
      removeLocalData("access_token")
      removeLocalData("roles")
      removeLocalData("user")
      setIsLogin(false)
      throw new Error("Authorization")
    }
    setIsLogin(true)
  }
  useEffect(() => {
    _requestLogin()
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
