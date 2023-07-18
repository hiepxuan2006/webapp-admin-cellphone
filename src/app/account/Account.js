/* eslint-disable no-unused-vars */
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import PFTable from "../../Components/Tables/PFTable"
import { getAccount, getListAccount } from "../../services/api/accountSevice"
import { AccountBody } from "./AccountBody"
import { AccountHead } from "./AccountHead"
import { Link } from "react-router-dom"
import { toastAlert } from "../../helpers/toast"
import { PFPagePagination } from "../../helpers/PFPagePagination"
import queryString from "query-string"

const Account = () => {
  const [accounts, setAccounts] = useState([])
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  let timer = null
  useEffect(() => {
    const fetchAccount = async () => {
      // eslint-disable-next-line no-unused-vars
      setLoading(true)
      const params = { limit, page, search }
      const paramsStr = queryString.stringify(params, {
        skipNull: true,
        skipEmptyString: true,
      })

      const { data, success, message } = await getListAccount(paramsStr)
      setLoading(false)
      if (!success) {
        toastAlert("error", message)
        return
      }
      const { accounts, limit: limited, page: paged, pages: count } = data
      setAccounts(accounts)
      setPage(paged)
      setLimit(limit)
      setPages(count)
    }
    fetchAccount()
  }, [limit, page, search])

  const _handleChangePage = (page) => {
    setPage(page)
  }
  const handleChangeLimit = (e) => {
    setLimit(e.target.value)
  }

  const handleChangeSearch = (e) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      setSearch(e.target.value)
    }, 800)
  }
  return (
    <Fragment>
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
              <select className="ms-2 px-4" onChange={handleChangeLimit}>
                <option value="10">10 rows</option>
                <option value="20">20 rows</option>
                <option value="50">50 rows</option>
                <option value="100">100 rows</option>
              </select>
            </div>

            <div className="form-group me-3 SearchProduct d-flex  align-items-center">
              <label className="m-0 me-2">Email</label>
              <input
                onChange={handleChangeSearch}
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
                <AccountBody accounts={accounts} loading={loading} />
              </PFTable>
            </div>
          </Col>
        </Row>
      </div>
      <div className="PaginationSticky align-self-end">
        <PFPagePagination
          page={page}
          pages={pages}
          onChangePage={_handleChangePage}
        />
      </div>
    </Fragment>
  )
}

export default Account
