import React, { useContext, useState } from 'react'
import CartContext from '../../context/cart/CartContext'
import { ICartProduct } from '../../interfaces'

interface Props {
  tempCartProduct: ICartProduct
}

export const Button2AddToCart: React.FC<Props> = ({ tempCartProduct }) => {

  const {setCart} = useContext(CartContext)

  const addToCart = () => {
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart')!)
      const cartFinal = cart.concat(tempCartProduct)
      localStorage.setItem('cart', JSON.stringify(cartFinal))
      setCart(cartFinal)
    } else {
      localStorage.setItem('cart', `[${JSON.stringify(tempCartProduct)}]`)
      setCart(`[${tempCartProduct}]`)
    }
  }

  return (
    <button onClick={addToCart} className='pt-1.5 pb-1.5 rounded-md bg-main text-white text-sm pl-3 pr-3 450:pr-6 450:pl-6 580:pr-8 580:pl-8'>
      Añadir al carrito
    </button>
  )
}
