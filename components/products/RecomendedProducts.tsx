import React, { useEffect, useState } from 'react'
import { IProduct } from '../../interfaces'
import browser from 'browser-detect'
import { SafariRecomendedProducts, OtherRecomendedProducts } from './'

interface Props {
  products: IProduct[]
  title: string
}

export const RecomendedProducts: React.FC<Props> = ({ products, title }) => {

  const [browserName, setBrowserName] = useState('')

  useEffect(() => {
    setBrowserName(browser().name!)
  }, [])

  return (
    <div>
      {
        browserName === 'safari'
          ? <SafariRecomendedProducts products={products} title={title} />
          : <OtherRecomendedProducts products={products} title={title} />
      }
    </div>
  )
}