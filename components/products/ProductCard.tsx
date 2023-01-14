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
    <div>
      <NextLink href={`productos/${ product.slug }`} prefetch={ false }>
        <Image
          src={ productImage } alt={ productImage }
          onLoad={ () => setIsImageLoaded(true) }
          onMouseEnter={ () => setIsHovered(true) }
          onMouseLeave={ () => setIsHovered(false) }
          width={250}
          height={250}
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
            ? <Button><Link href={`/${product.slug}`}>Seleccionar variación</Link></Button>
            : <Button>Añadir al carrito</Button>
        }
      </div>
    </div>
  )
}