import React from "react"
import ReactPaginate from "react-paginate"
export const PFPagePagination = ({ page, pages, onChangePage }) => {
  const _handlePageChange = (data) => {
    const { selected } = data

    onChangePage(selected + 1)
  }
  // if (pages <= 1) return null
  return (
    <div className="PagePagination Pagination">
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pages}
        forcePage={page - 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={_handlePageChange}
        containerClassName="pagination"
        pageClassName="page-item"
        previousClassName="Previous page-item"
        nextClassName="Next page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  )
}
