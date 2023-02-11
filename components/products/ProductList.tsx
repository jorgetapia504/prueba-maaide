import React, { useEffect, useState } from 'react'
import { IProduct } from '../../interfaces'
import browser from 'browser-detect'
import { SafariProductList, OtherProductList } from './'

interface Props {
  products: IProduct[]
  title: string
}

export const ProductList: React.FC<Props> = ({ products, title }) => {

  const [browserName, setBrowserName] = useState('')

  useEffect(() => {
    setBrowserName(browser().name!)
  }, [])

  return (
    <div>
      {
        browserName === 'safari'
          ? <SafariProductList products={products} title={title} />
          : <OtherProductList products={products} title={title} />
      }
    </div>
  )
}