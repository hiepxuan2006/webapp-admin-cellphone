import React, { Fragment, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { getAllBanner } from "../../services/api/bannerService"
import { toastAlert } from "../../helpers/toast"
import { useState } from "react"
import PFTable from "../../Components/Tables/PFTable"
import { BannerHead } from "./Components/BannerHead"
import { BannerBody } from "./Components/BannerBody"
import queryString from "query-string"
import { PFPagePagination } from "../../helpers/PFPagePagination"

export const Banner = () => {
  const [banners, setBanners] = useState([])
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const bannerRef = useRef(null)
  const _getAllBanner = async () => {
    setLoading(true)
    const params = { limit, page }
    const paramsStr = queryString.stringify(params, {
      skipNull: true,
      skipEmptyString: true,
    })
    const { data, success, message } = await getAllBanner(paramsStr)
    setLoading(false)
    if (!success) {
      toastAlert("error", message)
      return
    }
    const { data: banner, page: paged, limit: limited, pages: count } = data
    setPage(paged)
    setLimit(limited)
    setPages(count)
    setBanners(banner)
  }
  useEffect(() => {
    _getAllBanner()
  }, [page, limit])

  const _handleChangePage = (page) => {
    setPage(page)
  }

  return (
    <Fragment>
      <div className="Banner" ref={bannerRef}>
        <div className="SectionInner d-flex gap-3">
          <h1>Danh sách banner</h1>
          <Link to="/a/admin/banner/create">
            <button className="btn btn-success"> Thêm mới banner</button>
          </Link>
        </div>
        <div className="SectionInner">
          <PFTable>
            <BannerHead />
            <BannerBody
              banners={banners}
              limit={limit}
              page={page}
              loading={loading}
            />
          </PFTable>
        </div>
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
