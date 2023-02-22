import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useState, useEffect } from 'react'
import CartContext from '../../context/cart/CartContext'
import { ICartProduct } from '../../interfaces'

interface Props {
  tempCartProduct: ICartProduct
}

export const ButtonAddToCart: React.FC<Props> = ({ tempCartProduct }) => {

  const {setCart} = useContext(CartContext)
  const [text, setText] = useState('Añadir al carrito')

  const addToCart = async () => {
    setText('Producto añadido')
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart')!)
      if (cart.find((product: ICartProduct) => product.name === tempCartProduct.name)) {
        const productIndex = cart.findIndex((product: ICartProduct) => product.name === tempCartProduct.name)
        cart[productIndex].quantity = tempCartProduct.quantity + cart[productIndex].quantity
        localStorage.setItem('cart', JSON.stringify(cart))
        setCart(JSON.parse(localStorage.getItem('cart')!))
      } else {
        const cartFinal = cart.concat(tempCartProduct)
        localStorage.setItem('cart', JSON.stringify(cartFinal))
        setCart(JSON.parse(localStorage.getItem('cart')!))
      }
    } else {
      localStorage.setItem('cart', `[${JSON.stringify(tempCartProduct)}]`)
      setCart(JSON.parse(localStorage.getItem('cart')!))
    }
    await axios.post(`${process.env.SERVER_URL}/add-cart`, { name: tempCartProduct.name, price: tempCartProduct.price, quantity: tempCartProduct.quantity, category: tempCartProduct.category, fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc') })
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
