/* eslint-disable jsx-a11y/alt-text */
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TableLoading from "../../helpers/TableLoading"
import { formattedNumber } from "../../helpers/formatCurentcy"
import { useState } from "react"
import { ModalImagePwoduct } from "./ModalImagePwoduct"
import { confirmDialog } from "../../helpers/alertConfirm"
import { deleteProducts } from "../../services/api/productService"
import { toast } from "react-toastify"
import { Dropdown, DropdownButton, Form } from "react-bootstrap"
const ProductPageBody = ({
  products = [],
  loading,
  setProductChose,
  productChose = [],
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
    const isConfirm = await confirmDialog()
    if (isConfirm) {
      const { data, success, message } = await deleteProducts(id)
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
  return (
    <>
      {loading ? (
        <TableLoading columnQuantity={4} />
      ) : (
        <>
          {products.length &&
            products.map((item, key) => {
              return (
                <>
                  <tr key={key}>
                    <td className="d-flex align-items-center ">
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
                        <p>{item.title}</p>
                      </div>
                    </td>
                    <td>
                      {item.retail_price && formattedNumber(item.retail_price)}
                    </td>
                    <td>
                      <Form.Select aria-label="Default select example">
                        <option disabled defaultChecked>
                          Danh mục
                        </option>
                        <option disabled>One</option>
                        <option disabled>Two</option>
                        <option disabled>Three</option>
                      </Form.Select>
                    </td>
                    <td>
                      <p className={item.is_active ? "active" : "disable"}>
                        {item.is_active ? "active" : "disable"}
                      </p>
                    </td>
                    <td className="text-center d-flex justify-content-center gap-3">
                      <div className="ActionIcon ActionIconDel">
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={() => handleDelete(item._id)}
                        />
                      </div>
                      <div className="ActionIcon ActionIconEdit">
                        <FontAwesomeIcon icon={faPen} />
                      </div>
                    </td>
                  </tr>
                  <ModalImagePwoduct
                    show={show}
                    images={imagePreview}
                    setShow={setShow}
                    product={item}
                  />
                </>
              )
            })}
        </>
      )}
    </>
  )
}

export default ProductPageBody
