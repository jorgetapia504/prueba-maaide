import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import styles from "./css/ProductSlider.module.css"
import { Navigation, Pagination } from "swiper"

interface Props {
  images: string[]
}

export const ProductSlider: React.FC<Props> = ({ images }) => {
  return (
    <>
      <Swiper
        className={styles.mySwiper}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
      >
        {
          images.map(image => {
            return (
              <SwiperSlide key={ image }>
                <img src={image} className='m-auto' />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  )
}