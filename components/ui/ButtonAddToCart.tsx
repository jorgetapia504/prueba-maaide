import React, { useContext, useState } from 'react'
import CartContext from '../../context/cart/CartContext'
import { ICartProduct } from '../../interfaces'

interface Props {
  tempCartProduct: ICartProduct
}

export const ButtonAddToCart: React.FC<Props> = ({ tempCartProduct }) => {

  const {setCart} = useContext(CartContext)
  const [text, setText] = useState('Añadir al carrito')

  const addToCart = () => {
    setText('Producto añadido')
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart')!)
      const cartFinal = cart.concat(tempCartProduct)
      localStorage.setItem('cart', JSON.stringify(cartFinal))
      setCart(cartFinal)
    } else {
      localStorage.setItem('cart', `[${JSON.stringify(tempCartProduct)}]`)
      setCart(`[${tempCartProduct}]`)
    }
    setTimeout(() => {
      setText('Añadir al carrito')
    }, 3000)
  }

  return (
    <button onClick={addToCart} className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white'>
      {text}
    </button>
  )
}
