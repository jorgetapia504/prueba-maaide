import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { ProductList, ShippingCart } from '../../components/products'
import { Button, Spinner } from '../../components/ui'
import { useProducts } from '../../hooks'
import { ICartProduct } from '../../interfaces'
import { NumberFormat } from '../../utils'

const CartPage = () => {

  const [cart, setCart] = useState<ICartProduct[]>()
  const [shippingCost, setShippingCost] = useState(0)

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')!))
  }, [])

  const { products, isLoadingProducts } = useProducts('/products')

  return (
    <>
      <Head>
        <title>Carrito</title>
      </Head>
      <div className='p-4 flex'>
        <div className='m-auto w-1280'>
          <h1 className='text-3xl font-light mb-4'>Carrito</h1>
          <div className='block gap-8 1010:flex'>
            <div className='w-full 1010:w-7/12'>
              {
                cart?.map(product => (
                  <div className='flex gap-2 mb-2 justify-between' key={product._id}>
                    <div className='flex gap-2'>
                      <img className='w-28 rounded-md 450:w-32' src={product.image} />
                      <div className='mt-auto mb-auto'>
                        <h2 className='font-light text-lg'>{product.name}</h2>
                        <div className='flex gap-2'>
                          <span className='font-light'>${NumberFormat(product.price)}</span>
                          {
                            product.beforePrice
                              ? <span className='text-sm font-light line-through'>${NumberFormat(product.beforePrice)}</span>
                              : ''
                          }
                        </div>
                        {
                          product.variation
                            ? <span className='font-light'>{product.variation.variation}</span>
                            : ''
                        }
                      </div>
                    </div>
                    <div className='flex border border-main w-fit h-fit mt-auto mb-auto rounded-md'>
                      {
                        product.quantity > 1
                        ? <button className='pt-1 pb-1 pl-3 pr-2 text-main text-sm' onClick={() => {
                          const index = cart.findIndex((item: ICartProduct) => item.name === product.name)
                          const productEdit: ICartProduct = cart[index]
                          const updateProduct: ICartProduct = { ...productEdit, quantity: productEdit.quantity - 1 }
                          cart[index] = updateProduct
                          const updateCart = JSON.stringify(cart)
                          localStorage.setItem('cart', updateCart)
                          setCart(JSON.parse(localStorage.getItem('cart')!))
                        }}>-</button>
                        : <button className='pt-1 pb-1 pl-3 pr-2 text-main/50 cursor-not-allowed text-sm'>-</button>
                      }
                      <span className='text-main m-auto w-4 text-center text-sm'>{product.quantity}</span>
                      {
                        product.quantity < product.stock!
                        ? <button className='pt-1 pb-1 pl-2 pr-3 text-main text-sm' onClick={() => {
                          const index = cart.findIndex((item: ICartProduct) => item.name === product.name)
                          const productEdit: ICartProduct = cart[index]
                          const updateProduct: ICartProduct = { ...productEdit, quantity: productEdit.quantity + 1 }
                          cart[index] = updateProduct
                          const updateCart = JSON.stringify(cart)
                          localStorage.setItem('cart', updateCart)
                          setCart(JSON.parse(localStorage.getItem('cart')!))
                        }}>+</button>
                        : <button className='pt-1 pb-1 pl-2 pr-3 text-main/50 cursor-not-allowed'>+</button>
                      }
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='w-full 1010:w-5/12'>
              <div className='bg-gray-50 p-4 rounded-md shadow-md 450:p-6 dark:bg-neutral-800 dark:border dark:border-neutral-700'>
                <div className='mb-2 pb-2 border-b dark:border-neutral-700'>
                  <div className='mb-4 border-b pb-4 dark:border-neutral-700'>
                    <ShippingCart setShippingCost={setShippingCost} />
                  </div>
                  <div className='flex gap-2 justify-between mb-1'>
                    <span className='font-light'>Subtotal</span>
                    {
                      cart?.length
                        ? <span>${NumberFormat(cart.reduce((bef, curr) => bef + curr.price * curr.quantity, 0))}</span>
                        : ''
                    }
                  </div>
                  <div className='flex gap-2 justify-between'>
                    <span className='font-light'>Env??o</span>
                    <span>${NumberFormat(shippingCost)}</span>
                  </div>
                </div>
                <div className='flex gap-2 justify-between'>
                  <span className='text-lg'>Total</span>
                  {
                    cart?.length
                      ? <span className='text-lg'>${NumberFormat(cart.reduce((bef, curr) => bef + curr.price * curr.quantity, 0) + Number(shippingCost))}</span>
                      : ''
                  }
                </div>
                <div className='mt-3 ml-auto w-full flex'>
                  <Link className='pt-1.5 pb-1.5 w-full rounded-md bg-main text-white' href='/finalizar-compra'><button className='w-full'>Finalizar compra</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        isLoadingProducts
          ? (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
          : <ProductList products={ products } title='M??s Vendidos' />
      }
    </>
  )
}

export default CartPage