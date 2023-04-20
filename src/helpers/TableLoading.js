import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function TableLoading(props) {
    const {columns, columnQuantity, imageIndex} = props
    const mappedColumns = columns.length ? columns : new Array(columnQuantity).fill(null)

    return (
        <tbody className='TableLoading'>
        <tr>
            {mappedColumns.map((column, i) => (
                <td key={i}>
                        <span
                            className={classnames('table-loading-placeholder Cell', {
                                ImageCell: imageIndex.find(item => item === i),
                            })}
                        />
                </td>
            ))}
        </tr>
        <tr>
            {mappedColumns.map((column, id) => (
                <td key={id}>
                        <span
                            className={classnames('table-loading-placeholder Cell', {
                                ImageCell: imageIndex.find(item => item === id),
                            })}
                        />
                </td>
            ))}
        </tr>
        <tr>
            {mappedColumns.map((column, id) => (
                <td key={id}>
                        <span
                            className={classnames('table-loading-placeholder Cell', {
                                ImageCell: imageIndex.find(item => item === id),
                            })}
                        />
                </td>
            ))}
        </tr>
        </tbody>
    )
}

TableLoading.defaultProps = {
    columns: [],
    columnQuantity: 0,
    imageIndex: [],
}

TableLoading.propTypes = {
    columns: PropTypes.array,
    columnQuantity: PropTypes.number,
    imageIndex: PropTypes.array,
}

export default TableLoading
