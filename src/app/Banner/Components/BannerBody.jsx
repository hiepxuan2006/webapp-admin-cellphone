import {
  faCheck,
  faClose,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Fragment } from "react"
import { Dropdown } from "react-bootstrap"
import TableLoading from "../../../helpers/TableLoading"

export const BannerBody = ({ banners = [], limit, page, loading }) => {
  return (
    <>
      {!loading ? (
        banners.length > 0 &&
        banners.map((item, key) => {
          return (
            <tbody key={key}>
              <tr>
                <td>{(page - 1) * limit + key + 1}</td>
                <td>
                  <Fragment>
                    <img src={item.image} alt="" />
                  </Fragment>
                </td>
                <td>
                  <p>{item.category ? item.category.name : ""}</p>
                </td>
                <td className="text-center">
                  {item.is_active ? (
                    <p className="active">
                      <FontAwesomeIcon icon={faCheck} />
                    </p>
                  ) : (
                    <p>
                      <FontAwesomeIcon icon={faClose} />
                    </p>
                  )}
                </td>
                <td className="text-center">
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
                        // onClick={(e) => handleDelete(item._id)}
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
        })
      ) : (
        <TableLoading columnQuantity={7} />
      )}
    </>
  )
}
