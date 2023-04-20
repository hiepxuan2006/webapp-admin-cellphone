import React from "react"
import { Button, Col, Form } from "react-bootstrap"

export const CreateAccount = () => {
  return (
    <div className="SectionInner">
      <div className="CreateAccount">
        <Form>
          <Form.Group
            className="mt-4"
            as={Col}
            md="4"
            controlId="validationCustom01"
          >
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              placeholder="Nhập họ tên ..."
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mt-4"
            as={Col}
            md="4"
            controlId="validationCustom01"
          >
            <Form.Label>Nhập email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="example@gmail ..."
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mt-4"
            as={Col}
            md="4"
            controlId="validationCustom01"
          >
            <Form.Label>Nhập số điện thoại</Form.Label>
            <Form.Control
              required
              type="number"
              name="phone"
              placeholder="Nhập số điện thoại ..."
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="mt-3">
            Tạo account
          </Button>
        </Form>
      </div>
    </div>
  )
}
