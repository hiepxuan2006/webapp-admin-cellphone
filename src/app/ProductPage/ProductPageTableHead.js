const ProductMockupTableHead = ({
  setProductChose,
  productChose = [],
  products = [],
}) => {
  const handleChange = (e) => {
    if (e.target.checked) {
      const productId = products.length && products.map((item) => item._id)
      setProductChose(productId)
    } else setProductChose([])
  }
  return (
    <thead className="">
      <tr>
        <th className="  col-1">
          <input
            checked={products.length === productChose.length}
            type="checkbox"
            onChange={handleChange}
          />
        </th>
        <th className="col-3">Sản phẩm</th>
        <th className="col-2">Giá</th>
        <th className="col-2">Danh mục</th>
        <th className="col-1  text-center">Trạng thái</th>
        <th className="col-2 text-center">Hành động</th>
      </tr>
    </thead>
  )
}

export default ProductMockupTableHead
