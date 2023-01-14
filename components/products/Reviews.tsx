import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { IProduct } from '../../interfaces/'

interface Props {
  stars: number
  quantity: number
  product: IProduct
}

export const Reviews: React.FC<Props> = ({ stars, quantity, product }) => {
  return (
    <div className='flex gap-1 mb-2'>
      <p className='mr-1 font-light'>{(stars / quantity).toFixed(1)}</p>
      {stars / quantity === 0
        ? <BsStar className='text-lg text-yellow-400' />
        : stars / quantity <= 0.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars / quantity === 1
        ? <BsStar className='text-lg text-yellow-400' />
        : stars / quantity <= 1.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars / quantity === 2
        ? <BsStar className='text-lg text-yellow-400' />
        : stars / quantity <= 2.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars / quantity === 3
        ? <BsStar className='text-lg text-yellow-400' />
        : stars / quantity <= 3.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars / quantity === 4
        ? <BsStar className='text-lg text-yellow-400' />
        : stars / quantity <= 4.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      <p className='font-light'>({product.reviews?.length})</p>
      <p className='text-sm underline font-light ml-2 cursor-pointer mobile2:text-base'>Calificar producto</p>
    </div>
  )
}

export const NoReviews = () => {
  return (
    <div className='flex gap-1 mb-2'>
      <p className='mr-1'>0</p>
      <BsStar />
      <BsStar />
      <BsStar />
      <BsStar />
      <BsStar />
    </div>
  )
}
