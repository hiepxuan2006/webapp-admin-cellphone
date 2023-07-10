/* eslint-disable jsx-a11y/alt-text */
import {
  faCheckDouble,
  faClose,
  faEdit,
  faPen,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { ModalImagePwoduct } from "./ModalImagePwoduct"
import { confirmDialog } from "../../helpers/alertConfirm"
import { formattedNumber } from "../../helpers/formatCurentcy"
import {
  changeStatusSpecial,
  deleteProducts,
} from "../../services/api/productService"
import { Dropdown, Spinner } from "react-bootstrap"
import { toast } from "react-toastify"
const ProductPageBody = ({
  products = [],
  loading,
  setProductChose,
  productChose = [],
  setReload,
  isReload,
}) => {
  const [show, setShow] = useState(false)
  const [imagePreview, setImagePreview] = useState([])
  const handleChange = (e, value) => {
    const newProductsChose = productChose.length
      ? productChose.filter((item) => item !== value._id)
      : []

    if (e.target.checked) {
      setProductChose([...productChose, value._id])
    } else {
      setProductChose([...newProductsChose])
    }
  }

  const handleDelete = async (id) => {
    const isConfirm = await confirmDialog({
      title: "bạn có muốn xóa sản phẩm ?",
    })
    if (isConfirm) {
      const { success, message } = await deleteProducts(id)
      if (!success) throw new Error(message)

      toast("🦄Successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      window.location.reload()
    }
  }

  const handleStatusSale = async (item) => {
    const { _id, special } = item
    const isConfirm = await confirmDialog({
      title: "thay đổi trạng thái sản phẩm ?",
    })
    if (isConfirm) {
      const { success } = await changeStatusSpecial({
        id: _id,
        status: !special,
      })
      if (success) setReload(!isReload)
    }
  }
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {products.length &&
            products.map((item, key) => {
              return (
                <tbody key={key}>
                  <tr>
                    <td>
                      <input
                        checked={productChose.includes(item._id)}
                        type="checkbox"
                        onChange={(e) => handleChange(e, item)}
                      />
                    </td>

                    <td>
                      <div className="d-flex">
                        <div className="ImageProduct me-3">
                          <img
                            onClick={() => {
                              setImagePreview(item.images)
                              setShow(true)
                            }}
                            src={item.images[0]}
                          />
                        </div>
                        <p className="NameProduct">{item.title}</p>
                      </div>
                    </td>
                    <td>
                      <p>
                        {item.retail_price &&
                          formattedNumber(item.retail_price)}
                      </p>
                    </td>
                    <td>
                      <p>{item.category[0].name}</p>
                    </td>
                    <td>
                      <p
                        className="StatusSpecial"
                        onClick={() => handleStatusSale(item)}
                      >
                        {item.special ? (
                          <FontAwesomeIcon
                            className="StatusActive"
                            icon={faCheckDouble}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="StatusDisable"
                            icon={faClose}
                          />
                        )}
                      </p>
                    </td>
                    <td>
                      <p className={item.is_active ? "active" : "disable"}>
                        {item.is_active ? "active" : "disable"}
                      </p>
                    </td>
                    <td>
                      <div className="text-center d-flex justify-content-center gap-3">
                        <div className="ActionIcon ActionIconDel">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={() => handleDelete(item._id)}
                          />
                        </div>
                        <div className="ActionIcon ActionIconEdit">
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <div className="DropdownItem">
                            <FontAwesomeIcon
                              className="IconAction "
                              icon={faEdit}
                            />
                            <p>Edit</p>
                          </div>
                          <div
                            onClick={(e) => handleDelete(item._id)}
                            className="DropdownItem"
                          >
                            <FontAwesomeIcon
                              className="IconAction "
                              icon={faTrash}
                            />
                            <p>Delete</p>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                </tbody>
              )
            })}
        </>
      )}
      <ModalImagePwoduct show={show} images={imagePreview} setShow={setShow} />
    </>
  )
}

export default ProductPageBody
