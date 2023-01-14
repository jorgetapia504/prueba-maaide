import React from 'react'
import { ICartProduct, IProduct } from '../../interfaces'
import { NumberFormat } from '../../utils'
import { Button, ItemCounter } from '../ui'

interface Props {
  product: IProduct,
  tempCartProduct: ICartProduct,
  setTempCartProduct: any
}

export const ProductDetails: React.FC<Props> = ({ product, tempCartProduct, setTempCartProduct }) => {

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( (currentProduct: any) => ({
      ...currentProduct,
      quantity
    }))
  }

  return (
    <div className='fixed bottom-0 flex w-full z-40 p-4'>
      <div className='m-auto p-4 block bg-white shadow-det rounded-md gap-2 w-800 justify-around dark:bg-neutral-900 dark:border dark:border-neutral-800 sm:flex'>
        <div className='flex mb-2 justify-around gap-2 sm:mb-0'>
          <img className='w-20 h-20 mt-auto mb-auto' src={product.images[0]} />
          <div className='mt-auto mb-auto'>
            <h3 className='text-lg'>{product.name}</h3>
            <div className='flex gap-1'>
              <p>${NumberFormat(product.price)}</p>
              {
                product.beforePrice
                  ? <p className='line-through text-sm'>${NumberFormat(product.beforePrice)}</p>
                  : ''
              }
            </div>
            {
              product.variations
                ? <select className='border p-1 rounded-md font-light'>
                  <option>Seleccionar vartiación</option>
                  {
                    product.variations.map(variation => (
                      <option key={variation.variation}>{variation.variation}</option>
                    ))
                  }
                </select>
                : ''
              }
          </div>
        </div>
        <div className='flex justify-around gap-2'>
          <div className='mt-auto mb-auto'>
            <ItemCounter
              currentValue={ tempCartProduct.quantity }
              updatedQuantity={ onUpdateQuantity }
              maxValue={ product.stock }
            />
          </div>
          <div className='mt-auto mb-auto'>
            <Button>Añadir al carrito</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
