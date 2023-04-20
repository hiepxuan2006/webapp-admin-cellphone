/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
// import VariantImageModal from './VariantImageModal'
// import FeatureImage from '../../../../../../shared/FeatureImage'
import { uploadImage } from "../../../../services/api/createApiServices"
import { VariantImageModal } from "./VariantImageModal"

const VariantImageContainer = (props) => {
  const [show, setShow] = useState(false)
  const [image_urls, setImage_urls] = useState("")

  const _toggleModal = () => {
    // this.setState(prevState => ({isOpen: !prevState.isOpen}))
  }
  const { variant, changeVariant, showBtn, setShowBtn } = props
  const handleChange = async (e) => {
    e.preventDefault()

    const file = e.target.files[0]
    const form_data = new FormData()
    form_data.append("image", file)
    const { success, data } = await uploadImage(form_data)
    if (success) {
      setImage_urls([`${data[0].secure_url}`])

      setShowBtn(true)
    }
  }
  useEffect(() => {
    changeVariant(variant, "image_path", image_urls)
  }, [image_urls])

  return (
    <td className="VariantImage d-flex gap-3 ">
      <div
        className="d-inline-block cursor-pointer"
        onClick={() => _toggleModal()}
      >
        <span class="hiddenFileInput">
          <input
            type="file"
            name="image"
            // disabled={image_urls ? true : false}
            onChange={handleChange}
          />
        </span>
      </div>

      <VariantImageModal
        showBtn={showBtn}
        show={show}
        image_urls={image_urls}
        setShow={setShow}
        {...props}
      />
    </td>
  )
}

export default VariantImageContainer
