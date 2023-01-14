import React, { useState } from 'react'
import { ICartProduct, IProductsOffer } from '../../interfaces'
import { NumberFormat } from '../../utils'
import { Button2 } from '../ui'

interface Props {
  offer: IProductsOffer
}

export const ProductOffer: React.FC<Props> = ({ offer }) => {

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    name: offer.products[0].name,
    image: offer.products[0].image,
    price: offer.price,
    beforePrice: offer.products[0].beforePrice,
    slug: offer.products[0].slug,
    variation: offer.products[0].variations?.length ? offer.products[0].variations[0] : undefined,
    quantity: 1
  })

  const productChange = (e: any) => {
    offer.products.map(product => {
      if (product.name === e.target.value) {
        setTempCartProduct({...tempCartProduct,
          name: product.name,
          image: product.image,
          beforePrice: product.beforePrice,
          slug: product.slug,
          variation: product.variations?.length ? product.variations[0] : undefined
        })
      }
    })
  }

  const variationChange = (e: any) => {
    const product = offer.products.find(product => product.name === e.target.name)
    const variation = product?.variations?.find(variation => variation.variation === e.target.value)
    setTempCartProduct({...tempCartProduct,
      variation: variation
    })
  }

  return (
    <div className='flex mb-2'>
      {
        tempCartProduct.variation
          ? <img className='w-24 h-24 mr-1 mt-auto mb-auto mobile2:w-28 mobile2:h-28 mobile:w-32 mobile:mr-2 mobile:h-32' src={tempCartProduct.variation.image} />
          : <img className='w-24 h-24 mr-1 mt-auto mb-auto mobile2:w-28 mobile2:h-28 mobile:w-32 mobile:mr-2 mobile:h-32' src={tempCartProduct.image} />
      }
      <div className='mt-auto mb-auto'>
        {
          offer.products.length === 1
            ? <h3 className='text-lg'>{tempCartProduct.name}</h3>
            : <select onChange={productChange} className='text-sm p-1 border rounded-md font-light mobile:text-base dark:border-neutral-500'>
              {
                offer.products.map(product => <option className='font-light' key={product.slug}>{product.name}</option>)
              }
            </select>
        }
        <div className='flex gap-2'>
          <p>${NumberFormat(tempCartProduct.price)}</p>
          <p className='text-sm line-through font-light'>${NumberFormat(tempCartProduct.beforePrice!)}</p>
        </div>
        {
          tempCartProduct.variation !== undefined
            ? <select className='text-sm p-1 border rounded-md block mb-1 font-light mobile:text-base  dark:border-neutral-500' name={tempCartProduct.name} onChange={variationChange}>
              {
                offer.products.map(product => {
                  if (tempCartProduct.name === product.name) {
                    return product.variations?.map(variation => <option className='font-light' key={variation.variation}>{variation.variation}</option>)
                  }
                  return null
                })
              }
            </select>
            : ''
        }
        <Button2>Añadir al carrito</Button2>
      </div>
    </div>
  )
}
