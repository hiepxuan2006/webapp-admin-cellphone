import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import AppContext from "./context/AppContext"
import reportWebVitals from "./reportWebVitals"
import "./scss/app.scss"
import { Notify } from "./helpers/toast"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <AppContext>
      <App />
      <Notify />
    </AppContext>
    {/* </React.StrictMode> */}
  </BrowserRouter>
)
reportWebVitals()
