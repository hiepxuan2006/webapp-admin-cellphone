// import productValidator from './productValidator'

function generate() {
  return Array.prototype.reduce.call(
    arguments,
    function (a, b) {
      let ret = []
      a.forEach(function (a) {
        b.forEach(function (b) {
          ret.push(a.concat([b]))
        })
      })
      return ret
    },
    [[]]
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (attributes) {
  const canGenerate = Object.values(attributes).filter(Boolean).length === 0

  if (canGenerate) return []

  const attributesReformatted = attributes.map((attribute) => {
    return attribute.values.map((attValue) => {
      return {
        name: attValue.name,
        value: attValue.value,
        position: attValue.position,
        slug: attValue.slug,
      }
    })
  })

  let variants = generate(...attributesReformatted)

  variants = variants.map((options, index) => {
    return {
      is_selected: true,
      is_default: index === 0,
      sku: "",
      retail_price: 0,
      options: options,
      technique: "",
      is_sale: false,
      sale: 0,
      quantity: 0,
    }
  })
  return variants
}
