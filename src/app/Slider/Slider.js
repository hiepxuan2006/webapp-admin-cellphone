import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import queryString from "query-string"
import React, { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import PFTable from "../../Components/Tables/PFTable"
import { PFPagePagination } from "../../helpers/PFPagePagination"
import { getSlider } from "../../services/api/SliderApiService"
import { SliderTableBody } from "./SliderTableBody"
import { SliderTableHead } from "./SliderTableHead"
import { Fragment } from "react"

export const Slider = () => {
  const [sliders, setSliders] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(10)
  const [limit, setLimit] = useState(10)
  const [title, setTitle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({})

  let timer = null
  const _getSliders = async () => {
    try {
      const params = { page, limit, title }
      setLoading(true)
      const paramString = queryString.stringify(
        Object.assign({}, params, status),
        {
          skipNull: true,
          skipEmptyString: true,
        }
      )
      const { data, success, message } = await getSlider(paramString)

      if (!success) throw new Error(message)
      const { sliders, page: paged, pages: pagesRel } = data
      setPages(pagesRel)
      setPage(paged)
      setSliders(sliders)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    _getSliders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, title, status])
  const _handleChangePage = (page) => {
    setPage(page)
  }
  const onChangeValue = (e) => {
    setLimit(e.target.value)
    setPage(1)
  }
  const onChangeSearch = (e) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      setTitle(e.target.value)
      setPage(1)
    }, 800)
  }
  const onChangeStatus = (e) => {
    setStatus({ [e.target.value]: true })
  }

  return (
    <Fragment>
      <div className="SliderPage">
        <div className="SectionInner">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h1>Danh sách Slider</h1>
            <Link to="create">
              <button>Thêm Slider</button>
            </Link>
          </div>
          <div className="ProductHeader d-flex align-items-center mb-5">
            <div className="TableLength me-3">
              Show
              <select className="ms-2 px-4" onChange={onChangeValue}>
                <option disabled selected value="">
                  chon
                </option>
                <option selected={limit === 10} value="4">
                  10 rows
                </option>
                <option selected={limit === 20} value="20">
                  20 rows
                </option>
                <option selected={limit === 50} value="50">
                  50 rows
                </option>
              </select>
            </div>
            <div className="TableLength me-3">
              Trạng thái
              <select className="ms-2 px-4" onChange={onChangeStatus}>
                <option name="is_active" defaultChecked value="is_active">
                  active
                </option>
                <option is_deleted="is_deleted" value="is_deleted">
                  deleted
                </option>
              </select>
            </div>
            <div className="form-group me-3 SearchProduct d-flex  align-items-center">
              <label className="m-0 me-2">Title</label>
              <input
                type="text"
                className="form-control"
                id="SearchTitleProductMockup"
                name="title"
                onChange={onChangeSearch}
                placeholder="Enter search Slider ..."
              />
              <FontAwesomeIcon icon={faSearch} className="SearchIcon" />
            </div>
          </div>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div>
              <PFTable>
                <SliderTableHead />
                <SliderTableBody sliders={sliders} />
              </PFTable>
            </div>
          )}
        </div>
      </div>
      <div className="PaginationSticky">
        <PFPagePagination
          page={page}
          pages={pages}
          onChangePage={_handleChangePage}
        />
      </div>
    </Fragment>
  )
}
