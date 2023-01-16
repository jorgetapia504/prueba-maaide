import React from 'react'
import { IProduct } from '../../interfaces'
import { ProductCard } from './'

interface Props {
  products: IProduct[]
  title: string
}

export const ProductList: React.FC<Props> = ({ products, title }) => {
  return (
    <div className='flex p-4'>
      <div className='m-auto w-1270'>
        <h3 className='text-2xl mb-4'>{ title }</h3>
        <div className='flex justify-around gap-4 flex-wrap'>
          {
            products.map(product => (
              <ProductCard key={product._id} product={ product } />
            ))
          }
        </div>
      </div>
    </div>
  )
}