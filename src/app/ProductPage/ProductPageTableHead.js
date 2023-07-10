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
        <th className="col-3">Product</th>
        <th className="col-1">Price</th>
        <th className="col-1">Category</th>
        <th className="col-1 text-center">Special</th>
        <th className="col-1  text-center">Status</th>
        <th className="col-1 text-center">Actions</th>
        <th className="col-1 text-center">Actions</th>
      </tr>
    </thead>
  )
}

export default ProductMockupTableHead
