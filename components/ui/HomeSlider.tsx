import React from 'react'
import { Slide } from 'react-slideshow-image'

import styles from './css/HomeSlider.module.css'
import 'react-slideshow-image/dist/styles.css'

interface Props {
  images: string[]
}

export const HomeSlider: React.FC<Props> = ({ images }) => {
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
              <div className='h-400 lg:h-500 xl:h-600 2xl:h-700' style={{
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