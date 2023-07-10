import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./app/dashboard/component/Dashboard"
import SignIn from "./Components/auth/signIn/singIn"
import SignUp from "./Components/auth/singUp/SingUp"
import { Notify } from "./helpers/toast"
import { InvoiceOrder } from "./app/Order/InvoiceOrder"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/a/*" element={<Dashboard />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/print" element={<InvoiceOrder />} />
        <Route path="/" element={<Navigate to={"/a"} />} />
      </Routes>
      <Notify />
    </div>
  )
}
export default App
