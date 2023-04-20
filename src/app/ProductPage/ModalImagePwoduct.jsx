import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { EffectCards } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-cards"
import _ from "lodash"
export const ModalImagePwoduct = ({ show, setShow, images = [] }) => {
  const handleClose = () => {
    setShow(false)
  }

  return (
    <Modal show={show} fullscreen={true} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="d-flex align-items-center justify-content-center ModalFullscreen">
        <div className="ModalBody">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {images.length &&
              images.map((item, key) => {
                return (
                  <SwiperSlide key={key}>
                    <img src={item} alt="" />
                  </SwiperSlide>
                )
              })}
          </Swiper>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
