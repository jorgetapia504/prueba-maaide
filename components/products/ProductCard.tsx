import React, { useMemo, useState } from 'react'
import { IProduct } from '../../interfaces'
import NextLink from 'next/link'
import Image from 'next/image'
import { NumberFormat } from '../../utils'
import { Button } from '../ui'
import Link from 'next/link'

interface Props {
  product: IProduct
}

export const ProductCard: React.FC<Props> = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const productImage = useMemo(() => {
    return isHovered
      ? product.images[1]
      : product.images[0]
  }, [isHovered, product.images])

  return (
    <div className='w-36 580:w-56 420:w-44'>
      <NextLink href={`productos/${ product.slug }`} prefetch={ false }>
        <img
          src={ productImage } alt={ productImage }
          onLoad={ () => setIsImageLoaded(true) }
          onMouseEnter={ () => setIsHovered(true) }
          onMouseLeave={ () => setIsHovered(false) }
          className='w-44 580:w-52'
          style={{ borderRadius: '8px' }}
        />
      </NextLink>
      <div style={{ display: isImageLoaded ? 'block' : 'none' }}>
        <NextLink href={`productos/${ product.slug }`} prefetch={ false }>
          <p className='text-xl mt-2'>{ product.name }</p>
        </NextLink>
        <div className='flex gap-2 mt-1 mb-1'>
          <p>${ NumberFormat(product.price) }</p>
          {
            product.beforePrice
              ? <p className='text-sm line-through'>${ NumberFormat(product.beforePrice) }</p>
              : ''
          }
        </div>
        {
          product.variations
            ? <button className='pt-2 pb-2 pl-3 pr-3 text-sm rounded-md bg-main text-white 580:pl-5 580:pr-5 420:text-base 420:pl-4 420:pr-4'><Link href={`/${product.slug}`}>Seleccionar variación</Link></button>
            : <button className='pt-2 pb-2 pl-3 pr-3 text-sm rounded-md bg-main text-white 580:pl-5 580:pr-5 420:text-base 420:pl-4 420:pr-4'>Añadir al carrito</button>
        }
      </div>
    </div>
  )
}