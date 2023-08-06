/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import queryString from "query-string"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PFTable from "../../Components/Tables/PFTable"
import { PFPagePagination } from "../../helpers/PFPagePagination"
import { getProducts, relationProduct } from "../../services/api/productService"
import ProductPageBody from "./ProductPageBody"
import ProductPageTableHead from "./ProductPageTableHead"
import { ModalImagePwoduct } from "./ModalImagePwoduct"
import { getCategories } from "../../services/api/categoryApiService"
import { Dropdown, Form } from "react-bootstrap"
import { confirmDialog } from "../../helpers/alertConfirm"
import { toastAlert } from "../../helpers/toast"
import { Fragment } from "react"

const ProductContainer = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [title, setTitle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [productChose, setProductChose] = useState([])
  const [isReload, setReload] = useState(false)
  let timer = null

  const _getProducts = async () => {
    try {
      const params = { page, limit, title, category }
      setLoading(true)
      const paramString = queryString.stringify(params, {
        skipNull: true,
        skipEmptyString: true,
      })
      const { data, success, message } = await getProducts(paramString)

      if (!success) throw new Error(message)
      setProducts(data)
      setLoading(false)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const _getCategory = async () => {
    const { data, success, message } = await getCategories()
    if (!success) throw new Error(message)
    setCategories(data)
  }

  useEffect(() => {
    _getCategory()
  }, [])
  useEffect(() => {
    _getProducts()
  }, [page, limit, title, isReload, category])
  const _handleChangePage = (page) => {
    setPage(page)
  }

  const handleChangeLimit = (e) => {
    setLimit(e.target.value)
  }

  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
  }
  const onChangeSearch = (e) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      setTitle(e.target.value)
      setPage(1)
    }, 800)
  }
  const handleRelation = async () => {
    const isConfirm = await confirmDialog()
    if (!isConfirm) return
    const { success, message, data } = await relationProduct({
      relations: productChose,
    })
    if (!success) toastAlert("error", "Thất bại")
    else {
      toastAlert("success", "Thành công")
      setProductChose([])
    }
  }
  return (
    <Fragment>
      <div className="ProductPage">
        <div className="ProductPageHeader d-flex gap-5 SectionInner">
          <h1>Products</h1>
          <Link to={"/a/admin/key_word"}>
            <button className="px-2">Key word</button>
          </Link>
          <Link to={"/a/admin/product/create"}>
            <button className="px-2">Create Product</button>
          </Link>
        </div>
        <div className="SectionInner">
          <div className="ProductHeader d-flex align-items-center">
            <div className="me-3 d-flex align-items-center gap-3">
              <h3>Hành động</h3>
              <Dropdown size="lg">
                <Dropdown.Toggle
                  disabled={!productChose.length}
                  variant="secondary"
                  id="dropdown-basic"
                >
                  Hành động
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    disabled={productChose.length < 2}
                    onClick={() => handleRelation()}
                  >
                    Relation
                  </Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
                  <Dropdown.Item>Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="TableLength me-3 d-flex align-items-center justify-content-center ">
              <h3>Hiển thị</h3>
              <select className="ms-2 px-4" onChange={handleChangeLimit}>
                <option value="10">10 rows</option>
                <option value="20">20 rows</option>
                <option value="50">50 rows</option>
                <option value="100">100 rows</option>
              </select>
            </div>
            <div className="TableLength me-3 d-flex align-items-center justify-content-center">
              <h3>Danh mục</h3>
              <select onChange={handleChangeCategory} className="ms-2 px-4">
                <option value="" defaultChecked>
                  Chọn danh mục
                </option>
                {categories.length > 0 &&
                  categories.map((category, key) => {
                    return (
                      <option key={key} value={category._id}>
                        {category.label}
                      </option>
                    )
                  })}
              </select>
            </div>
            {/* <div className="filter-price me-3 d-flex align-items-center justify-content-center">
              <h3>Price</h3>
            </div> */}
            <div className="form-group me-3 SearchProduct d-flex  align-items-center">
              <label className="m-0 me-2">Tên sản phẩm</label>
              <input
                onChange={onChangeSearch}
                type="text"
                className="form-control"
                id="SearchTitleProductMockup"
                name="title"
                placeholder="Enter search product..."
              />
              <FontAwesomeIcon icon={faSearch} className="SearchIcon" />
            </div>
          </div>
        </div>
        <div className="SectionInner">
          <div>
            <PFTable>
              <ProductPageTableHead
                productChose={productChose}
                setProductChose={setProductChose}
                products={products}
              />
              <ProductPageBody
                loading={loading}
                products={products}
                productChose={productChose}
                setProductChose={setProductChose}
                setReload={setReload}
                isReload={isReload}
              />
            </PFTable>
          </div>
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

export default ProductContainer
