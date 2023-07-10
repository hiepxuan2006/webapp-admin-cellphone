import { useState } from "react"
import { Link } from "react-router-dom"

const bg = require("../../../statics/assets/img/bg-up.jpg")
const login = require("../../../statics/assets/img/login.png")
const SignUp = () => {
  const [valueSignIn, setValueSignIn] = useState({
    email: "",
    password: "",
    confPassword: "",
  })
  const { email, password, confPassword } = valueSignIn
  const changeValue = (e) => {
    setValueSignIn({ ...valueSignIn, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("ok")
  }

  return (
    <div className="Sign-in" style={{ backgroundImage: `url(${bg})` }}>
      <div className="SignInInner">
        <div className="ImageLogin">
          <img src={login} alt="" />
        </div>
        <div className="d-flex align-items-center justify-content-center mb-3">
          <span className="me-2"> Already have an account?</span>
          <Link to={"/sign-in"}>
            <h3 className="SignUpBtn">Sign in</h3>
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
              value={password}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              onChange={changeValue}
              name="confPassword"
              value={confPassword}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 d-flex">
            <button type="submit" className="btn btn-primary ButtonSubmit">
              Sign Up
            </button>
          </div>
        </form>

        <h1>SignUp</h1>
      </div>
    </div>
  )
}

export default SignUp
