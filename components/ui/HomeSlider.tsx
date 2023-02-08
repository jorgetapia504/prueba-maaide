import React, { useState } from 'react'
import { Button } from './Button'
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from "./css/HomeSlider.module.css"
import { Pagination, Navigation } from "swiper"
import { useRef } from 'react';

export const HomeSlider = () => {

  const sliderRef = useRef(null)

  const handleTouchStart = () => {
    document.body.style.overflowY = 'hidden'
  }

  const handleTouchEnd = () => {
    document.body.style.overflowY = 'scroll'
  }

  return (
    <div ref={sliderRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <Swiper
        className={styles.mySwiper}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <div className='h-400 flex bg-gradient-to-r from-cyan-500 to-blue-500 xl:h-600 2xl:h-700'>
            <div className='w-1280 m-auto'>
              <h1 className='text-5xl text-white font-bold mb-2'>ENCUÉNTRA OFERTAS DE HASTA UN 40% DE DESCUENTO</h1>
              <p className='font-light text-white text-lg mb-4'>Aprovecha nuestras increibles ofertas solo por tiempo limitado.</p>
              <Link href='/ofertas'><Button>Ver ofertas</Button></Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-400 flex bg-gradient-to-r from-cyan-500 to-blue-500 xl:h-600 2xl:h-700'>
            <div className='w-1280 m-auto'>
              <h1 className='text-5xl text-white font-bold mb-2'>ENCUÉNTRA OFERTAS DE HASTA UN 40% DE DESCUENTO</h1>
              <p className='font-light text-white text-lg mb-4'>Aprovecha nuestras increibles ofertas solo por tiempo limitado.</p>
              <Button>Ver ofertas</Button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}