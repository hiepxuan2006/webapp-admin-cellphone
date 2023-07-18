import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import TableLoading from "../../helpers/TableLoading"

export const AccountBody = ({ accounts = [], loading }) => {
  return (
    <>
      {loading ? (
        <TableLoading columnQuantity={7} />
      ) : (
        <tbody>
          {accounts.length > 0 &&
            accounts.map((item, key) => {
              const rolesFormat = item.roles.map((item) => {
                return { value: item, label: item }
              })
              return (
                <tr className="" style={{ cursor: "pointer" }} key={key}>
                  <td>
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <p className="text-center">
                      {rolesFormat.map((item) => item.value).join(",")}
                    </p>
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
                        <Link
                          to={`/a/admin/account/detail/${item._id}`}
                          className="DropdownItem"
                        >
                          <FontAwesomeIcon
                            className="IconAction "
                            icon={faEye}
                          />
                          <p>View</p>
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              )
            })}
        </tbody>
      )}
    </>
  )
}
