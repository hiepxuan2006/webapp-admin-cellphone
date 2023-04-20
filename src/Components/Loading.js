import React from "react"
import { Spinner } from "react-bootstrap"

export const Loading = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="LoadingHome">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  )
}
