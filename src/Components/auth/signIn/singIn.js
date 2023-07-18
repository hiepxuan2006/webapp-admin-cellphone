import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginAccount } from "../../../services/api/accountSevice"
import { toastAlert } from "../../../helpers/toast"
import { setLocalData } from "../../../services/api/StoreageServices"
import { useContext } from "react"
import { DataContext } from "../../../context/AppContext"
import { LoadingProcess } from "../../loading/LoadingProcess"

const bg = require("../../../statics/assets/img/bg.jpg")
const login = require("../../../statics/assets/img/login.png")
const fb = require("../../../statics/assets/img/fb.png")
const gg = require("../../../statics/assets/img/gg.png")
const SignIn = () => {
  const { setIsLogin, isLogin } = useContext(DataContext)
  const [valueSignIn, setValueSignIn] = useState({
    email: "hiepxuan2006@gmail.com",
    password: "Hiepxuan98@",
  })

  const { loading } = useContext(DataContext)
  const navigate = useNavigate()

  const { email, password } = valueSignIn
  const changeValue = (e) => {
    setValueSignIn({ ...valueSignIn, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const params = { email, password }
    const { success, message, data } = await loginAccount(params)

    if (!success) {
      toastAlert("error", message)
      throw new Error(message)
    }
    setLocalData("access_token", data.access_token)
    setLocalData("user", data.user)
    setLocalData("roles", data.roles)
    setIsLogin(true)
    toastAlert("success", "success")
    navigate("/")
  }
  if (isLogin) {
    navigate("/")
    return null
  }
  if (loading) return <LoadingProcess />
  return (
    <div className="Sign-in" style={{ backgroundImage: `url(${bg})` }}>
      <div className="SignInInner">
        <div className="ImageLogin">
          <img src={login} alt="" />
        </div>
        <div className="d-flex align-items-center justify-content-center mb-3">
          <span className="me-2">Don't have an account?</span>
          <Link to={"/sign-up"}>
            <h3 className="SignUpBtn">Sign up</h3>
          </Link>
        </div>
        <form className="FormLogin" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              required
              onChange={changeValue}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              onChange={changeValue}
              name="password"
              required
              value={password}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me
            </label>
          </div>
          <div className="mb-3 d-flex">
            <button type="submit" className="btn btn-primary ButtonSubmit">
              Sign In
            </button>
          </div>
        </form>
        <ul className="SignInPlatform">
          <Link to={"#"}>
            <li className="SignInOption">
              <img src={fb} alt="" />
            </li>
          </Link>
          <Link to={"#"}>
            <li className="SignInOption">
              <img src={gg} alt="" />
            </li>
          </Link>
        </ul>
        <h1>SignIn</h1>
      </div>
    </div>
  )
}

export default SignIn
