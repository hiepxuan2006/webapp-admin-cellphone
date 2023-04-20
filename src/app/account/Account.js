/* eslint-disable no-unused-vars */
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import PFTable from "../../Components/Tables/PFTable"
import { getAccount, getListAccount } from "../../services/api/accountSevice"
import { AccountBody } from "./AccountBody"
import { AccountHead } from "./AccountHead"
import { Link } from "react-router-dom"
const Account = () => {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    const fetchAccount = async () => {
      // eslint-disable-next-line no-unused-vars
      const { data, success, message } = await getListAccount()
      if (!success) throw new Error(message)
      setAccounts(data.accounts)
    }
    fetchAccount()
  }, [])

  return (
    <div className="AccountPage">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className=""> Danh sách người dùng</h1>
        <Link to={"/a/admin/account/create"}>
          <Button className="success my-3">Thêm người dùng</Button>
        </Link>
      </div>
      <div className="SectionInner">
        <div className="ProductHeader d-flex align-items-center">
          <div className="TableLength me-3">
            Show
            <select className="ms-2 px-4">
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="50">50 rows</option>
              <option value="100">100 rows</option>
            </select>
          </div>
          <div className="TableLength me-3">
            Account
            <select className="ms-2 px-4">
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="50">50 rows</option>
              <option value="100">100 rows</option>
            </select>
          </div>
          <div className="form-group me-3 SearchProduct d-flex  align-items-center">
            <label className="m-0 me-2">Email</label>
            <input
              type="text"
              className="form-control"
              id="SearchTitleProductMockup"
              name="title"
              placeholder="Enter search  account ..."
            />
            <FontAwesomeIcon icon={faSearch} className="SearchIcon" />
          </div>
        </div>
      </div>
      <Row>
        <Col md={12}>
          <div className="SectionInner">
            <PFTable>
              <AccountHead />
              <AccountBody accounts={accounts} />
            </PFTable>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Account
