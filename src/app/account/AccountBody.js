import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Select from "react-select"

export const AccountBody = ({ accounts = [] }) => {
  return (
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
                <Select
                  // onChange={(option) => {
                  //   handleChangeKeyword(option)
                  // }}
                  // isMulti
                  defaultInputValue={rolesFormat[0]}
                  isSearchable={false}
                  name="key_word"
                  options={rolesFormat}
                  className="basic-multi-select"
                  classNamePrefix="roles"
                  placeholder="roles ..."
                />
              </td>
              <td>
                <div className="h-100 d-flex justify-content-center gap-3 align-items-center">
                  <FontAwesomeIcon className="text-warning" icon={faTrash} />
                  <FontAwesomeIcon icon={faPen} />
                </div>
              </td>
            </tr>
          )
        })}
    </tbody>
  )
}
