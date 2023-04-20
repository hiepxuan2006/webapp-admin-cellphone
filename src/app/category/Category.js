import { useEffect, useState } from "react"
import { Col, Dropdown, Row } from "react-bootstrap"
import "react-dropdown-tree-select/dist/styles.css"
import { Link } from "react-router-dom"
import {
  deleteCategory,
  getCategories,
  getCategoryChildren,
} from "../../services/api/categoryApiService"
import MenuItem from "./createCategory/MenuItem"
import PFTable from "../../Components/Tables/PFTable"
import CategoryTableBody from "./CategoryTableBody"
import CategoryTableHead from "./CategoryTableHead"
import { confirmDialog } from "../../helpers/alertConfirm"
import { toastAlert } from "../../helpers/toast"

const Category = () => {
  const [categories, setCategories] = useState([])
  const [selectedCheckbox, setSelectedCheckbox] = useState("")
  const [categoryChose, setCategoryChose] = useState([])
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  useEffect(() => {
    const _fetchCategories = async () => {
      setLoading(true)
      const { data, success, message } = await getCategories()
      setLoading(false)
      if (!success) throw new Error(message)
      setCategories(data)
      setCategoryChose(data)
    }
    _fetchCategories()
  }, [reload])
  useEffect(() => {
    const _fetchCategories = async () => {
      setLoading(true)
      const { data, success, message } = await getCategoryChildren(
        selectedCheckbox
      )
      setLoading(false)
      if (!success) throw new Error(message)
      setCategoryChose(data)
    }
    if (selectedCheckbox) _fetchCategories()
  }, [selectedCheckbox])

  const handleClickDelete = async () => {
    const isConfirm = await confirmDialog()
    if (!isConfirm) return
    setLoading(true)
    const { success, message } = await deleteCategory(selectedCheckbox)

    if (!success) {
      setLoading(false)
      toastAlert("error", message)
      return
    }
    setLoading(false)
    setReload(!reload)
    toastAlert("success", "Thành công!")
  }
  return (
    <div className="CategoryPage">
      <div className="ProductPageHeader d-flex align-items-center justify-content-between mb-4 ">
        <div className="d-flex justify-content-between">
          <h2 style={{ minWidth: "200px" }}>Danh mục sản phẩm</h2>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              disabled={selectedCheckbox ? false : true}
            >
              Thao tác
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleClickDelete}>Xóa</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Sửa</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Link to={"create"} className="d-flex justify-content-end ">
          <button className="px-2">Thêm danh mục</button>
        </Link>
      </div>

      <Row>
        <Col md={3}>
          <div className="SectionInner">
            <h1 className="mb-5">Danh sách danh mục</h1>
            <div>
              {categories.map((item, index) => (
                <tr>
                  <td>{/* <input type="checkbox" name="" id="" /> */}</td>
                  <td>
                    <ul className="" style={{ listStyle: "none" }}>
                      <MenuItem
                        key={item.id}
                        item={item}
                        selectedCheckbox={selectedCheckbox}
                        setSelectedCheckbox={setSelectedCheckbox}
                      />
                    </ul>
                  </td>
                </tr>
              ))}
            </div>
          </div>
        </Col>
        <Col md={9}>
          <div className="SectionInner TableCategory">
            <PFTable>
              <CategoryTableHead />
              <CategoryTableBody
                setReload={setReload}
                reload={reload}
                loading={loading}
                data={categoryChose}
              />
            </PFTable>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Category
