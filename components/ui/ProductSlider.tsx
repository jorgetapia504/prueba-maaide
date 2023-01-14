import React from 'react'
import { Slide } from 'react-slideshow-image'

import styles from './css/ProductSlider.module.css'
import 'react-slideshow-image/dist/styles.css'

interface Props {
  images: string[]
}

export const ProductSlider: React.FC<Props> = ({ images }) => {
  return (
    <Slide
      easing='ease'
      duration={7000}
      indicators
    >
      {
        images.map(image => {
          return (
            <div className={styles['each-slide']} key={ image }>
              <div className='fadeIn' style={{
                backgroundImage: `url(${ image })`,
                backgroundSize: 'cover'
              }}>

              </div>
            </div>
          )
        })
      }
    </Slide>
  )
}