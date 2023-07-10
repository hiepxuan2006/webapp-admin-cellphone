import React, { Fragment, useRef } from "react"
import { useReactToPrint } from "react-to-print"
export const ReactPdfPrint = ({ children }) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
  })
  return (
    <Fragment>
      <div className="ReactPdfPrint" ref={componentRef}>
        {children}
      </div>
      <button onClick={handlePrint}>click</button>
    </Fragment>
  )
}
