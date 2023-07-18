import React from "react"
import { useState } from "react"
import { Button, Col, Form } from "react-bootstrap"
import { toastAlert } from "../../helpers/toast"
import { createAccount } from "../../services/api/accountSevice"

export const CreateAccount = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleCreateAccount = async (e) => {
    e.preventDefault()
    const { name, email, phone, role } = data
    if (!name || !email || !phone || !role) {
      toastAlert("warning", "Fill full the information")
      return
    }
    const { success, message } = await createAccount(data)
    if (!success) {
      toastAlert("error", message)
      throw new Error(message)
    }
    toastAlert("success", "Successfully")
  }

  return (
    <div className="row">
      <div className="col  col-md-6">
        <div className="Sect ionInner">
          <div className="Crea teAccount">
            <Form onSubmit={handleCreateAccount}>
              <Form.Group
                className="mt-4 "
                as={Col}
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  placeholder="Nhập họ tên ..."
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mt-4 "
                as={Col}
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="example@gmail ..."
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mt-4 "
                as={Col}
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="phone"
                  placeholder="Nhập số điện thoại ..."
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-4  " as={Col} md="4">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="role"
                  onChange={handleChange}
                >
                  <option disabled>Select role</option>
                  <option value="customer">customer</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </Form.Select>
              </Form.Group>
              <Button type="submit" className="mt-4 ">
                Create
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
