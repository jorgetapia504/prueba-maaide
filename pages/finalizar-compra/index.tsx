import React, { useState, useEffect } from 'react'
import { Shipping } from '../../components/products'
import { Button, Button2 } from '../../components/ui'
import { ICartProduct, ISell, IShipping } from '../../interfaces'
import { FreeShipping, NumberFormat } from '../../utils'
import Link from 'next/link'
import { AiOutlineLeft, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import Head from 'next/head'
import Cookies from 'js-cookie'
import axios from 'axios'

const CheckOut = () => {

  const [sell, setSell] = useState<ISell>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    region: '',
    city: '',
    cart: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')!) : [],
    shipping: 0,
    pay: '',
    state: 'Pago iniciado',
    total: 0,
    fbp: Cookies.get('_fbp'),
    fbc: Cookies.get('_fbc')
  })
  const [cart, setCart] = useState<ICartProduct[]>()
  const [shipping, setShipping] = useState<IShipping[]>()
  const [details, setDetails] = useState('hidden')

  const getCart = async () => {
    if (typeof window !== 'undefined') {
      const cartLocal = JSON.parse(localStorage.getItem('cart')!)
      setCart(cartLocal)
      setSell({ ...sell, total: cartLocal.reduce((bef: any, curr: any) => bef + curr.price, 0) })
      await axios.post(`${process.env.SERVER_URL}/information`, { cart: cartLocal, fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc') })
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  const inputChange = (e: any) => {
    setSell({ ...sell, [e.target.name]: e.target.value })
  }

  const shippingChange = (e: any) => {
    const cartLocal = JSON.parse(localStorage.getItem('cart')!)
    setSell({ ...sell, serviceShipping: e.target.className , shipping: e.target.value, total: cartLocal.reduce((bef: any, curr: any) => bef + curr.price, 0) + Number(e.target.value) })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await axios.post(`${process.env.SERVER_URL}/sells`, sell)
  }

  return (
    <>
      <Head>
        <title>Finalizar compra</title>
      </Head>
      <div className='sticky top-14 bg-gray-50 w-full p-4 shadow-md block 1010:hidden dark:bg-neutral-800 dark:border dark:border-neutral-700'>
        <div className={`mb-2 ${details}`}>
          <h2 className='text-lg mb-2 font-light'>Carrito</h2>
          {
            cart?.length !== 0
              ? cart?.map(product => (
                <div className='flex gap-2 justify-between mb-2' key={product._id}>
                  <div className='flex gap-2'>
                    <img className='w-20 border rounded-md' src={product.image} />
                    <div className='mt-auto mb-auto'>
                      <span>{product.name}</span>
                      {
                        product.variation
                          ? <span className='font-light'>{product.variation.variation}</span>
                          : ''
                      }
                    </div>
                  </div>
                  <div className='flex gap-2 mt-auto mb-auto'>
                    <span>${NumberFormat(product.price * product.quantity)}</span>
                    {
                      product.beforePrice
                        ? <span className='font-light text-sm line-through'>${NumberFormat(product.beforePrice * product.quantity)}</span>
                        : ''
                    }
                  </div>
                </div>
              ))
              : ''
          }
          <div className='pb-3 border-b dark:border-neutral-700'>
            <h2 className='mb-2 text-lg font-light'>Cupon de descuento</h2>
            <div className='flex gap-2'>
              <input type='text' placeholder='Cupon' className='border p-1 rounded font-light w-72 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              <Button2>Agregar</Button2>
            </div>
          </div>
          <div className='mt-2 mb-2 pb-2 border-b dark:border-neutral-700'>
            <div className='flex gap-2 justify-between mb-1'>
              <span className='font-light'>Subtotal</span>
              <span>${NumberFormat(sell.cart.reduce((bef, curr) => bef + curr.price * curr.quantity, 0))}</span>
            </div>
            <div className='flex gap-2 justify-between'>
              <span className='font-light'>Envío</span>
              <span>${NumberFormat(Number(sell.shipping))}</span>
            </div>
          </div>
        </div>
        <div className='flex gap-2 justify-between mb-2'>
          <span className='text-lg'>Total</span>
          <span className='text-lg'>${NumberFormat(sell.cart.reduce((bef, curr) => bef + curr.price * curr.quantity, 0) + Number(sell.shipping))}</span>
        </div>
        <button className='font-light flex gap-2' onClick={() => details === 'hidden' ? setDetails('block') : setDetails('hidden')}>{details === 'hidden' ? <AiOutlineDown className='mt-auto mb-auto' /> : <AiOutlineUp className='mt-auto mb-auto' /> } {details === 'hidden' ? 'Mostrar' : 'Ocultar'} resumen del pedido</button>
      </div>
      <div className='flex p-4'>
        <form className='w-1280 m-auto block 1010:flex'>
          <div className='w-full pr-0 1010:w-7/12 1010:pr-8'>
            <h1 className='text-3xl mb-6 font-light'>Finalizar compra</h1>
            <div className='mb-6'>
              <h2 className='text-lg mb-2 font-light'>Información de contacto</h2>
              <input type='email' placeholder='Email' name='email' onChange={inputChange} className='border mb-2 p-2 rounded font-light w-full text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              <div className='flex gap-2'>
                <input type='checkbox' />
                <span className='font-light text-sm'>Suscribirse a nuestra lista de emails</span>
              </div>
            </div>
            <div className='mb-6'>
              <h2 className='text-lg mb-2 font-light'>Dirección de envío</h2>
              <Shipping setShipping={setShipping} sell={sell} setSell={setSell} />
              <div className='flex gap-2 mb-2'>
                <input type='text' placeholder='Nombre' name='firstName' onChange={inputChange} className='border text-sm p-2 rounded font-light w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                <input type='text' placeholder='Apellido' name='lastName' onChange={inputChange} className='border text-sm p-2 rounded font-light w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <input type='text' placeholder='Dirección' name='address' onChange={inputChange} className='border text-sm p-2 rounded font-light w-full mb-2 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              <input type='text' placeholder='Departamento (Opcional)' name='details' onChange={inputChange} className='border text-sm p-2 rounded font-light w-full mb-2 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              <div className='flex gap-2'>
                <span className='mt-auto mb-auto text-sm font-light'>+56</span>
                <input type='text' placeholder='Teléfono' name='phone' onChange={inputChange} className='border text-sm p-2 rounded font-light w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
            </div>
            {
              shipping !== undefined
                ? (
                  <div className='mb-6'>
                    <h2 className='mb-2 text-lg font-light'>Envío</h2>
                    <div className='flex flex-col gap-1'>
                      {
                        FreeShipping.find(free => free === sell.city)
                          ? (
                            <div className='flex gap-2 justify-between p-2 border rounded-md dark:border-neutral-700'>
                              <div className='flex gap-2'>
                                <input type='radio' name='shipping' className='ENVIO EXPRESS' value='0' onChange={shippingChange} />
                                <p className='text-sm font-light mt-auto mb-auto'>Envío express</p>
                              </div>
                              <p className='text-sm font-light'>$0</p>
                            </div>
                          )
                          : ''
                      }
                      {
                        shipping.map(item => (
                            <div className='flex gap-2 justify-between p-2 border rounded-md dark:border-neutral-700' key={item.serviceDescription}>
                              <div className='flex gap-2'>
                                <input type='radio' name='shipping' className={item.serviceDescription} value={item.serviceValue} onChange={shippingChange} />
                                <p className='text-sm font-light mt-auto mb-auto'>{item.serviceDescription}</p>
                              </div>
                              <p className='text-sm font-light'>${NumberFormat(Number(item.serviceValue))}</p>
                            </div>
                          ))
                      }
                    </div>
                  </div>
                )
                : ''
            }
            {
              sell.serviceShipping
                ? (
                  <div className='mb-6'>
                    <h2 className='text-xl font-light mb-2'>Pago</h2>
                    {
                      sell.serviceShipping === 'ENVIO EXPRESS'
                        ? (
                          <div className='flex gap-2 p-3 border rounded-md mb-1 dark:border-neutral-700'>
                            <input type='radio' name='pay' value='Pago en la entrega' onChange={inputChange} />
                            <p className='font-light text-sm'>Pago en la entrega</p>
                          </div>
                        )
                        : ''
                    }
                    <div className='flex gap-2 p-3 border rounded-md mb-1 dark:border-neutral-700'>
                      <input type='radio' name='pay' value='WebPay Plus' onChange={inputChange} />
                      <p className='font-light text-sm'>WebPay Plus</p>
                    </div>
                    <div className='flex gap-2 p-3 border rounded-md dark:border-neutral-700'>
                      <input type='radio' name='pay' value='MercadoPago' onChange={inputChange} />
                      <p className='font-light text-sm'>MercadoPago</p>
                    </div>
                  </div>
                )
                : ''
            }
            <div className='flex gap-2 justify-between mt-auto mb-auto font-light'>
              <div className='mt-auto mb-auto'><Link href='/carrito'><span className='flex gap-2 text-sm'><AiOutlineLeft className='mt-auto mb-auto' />Regresar al carrito</span></Link></div>
              <button onClick={handleSubmit} className='pt-1.5 pb-1.5 pl-7 pr-7 rounded-md bg-main text-white'>Pagar</button>
            </div>
          </div>
          <div className='w-5/12 h-fit shadow-md rounded-md p-4 hidden sticky top-28 bg-gray-50 dark:border dark:border-neutral-700 dark:bg-neutral-800 1010:block'>
            <div className='mb-2 pb-2 border-b dark:border-neutral-700'>
              <h2 className='text-lg mb-2 font-light'>Carrito</h2>
              {
                cart?.length !== 0
                  ? cart?.map(product => (
                    <div className='flex gap-2 justify-between mb-2' key={product._id}>
                      <div className='flex gap-2'>
                        <img className='w-20 border rounded-md' src={product.image} />
                        <div className='mt-auto mb-auto'>
                          <span className='block'>{product.name}</span>
                          <span className='block font-light'>Cantidad: {product.quantity}</span>
                          {
                            product.variation
                              ? <span className='block font-light'>Variación: {product.variation.variation}</span>
                              : ''
                          }
                        </div>
                      </div>
                      <div className='flex gap-2 mt-auto mb-auto'>
                        <span>${NumberFormat(product.price * product.quantity)}</span>
                        {
                          product.beforePrice
                            ? <span className='font-light text-sm line-through'>${NumberFormat(product.beforePrice * product.quantity)}</span>
                            : ''
                        }
                      </div>
                    </div>
                  ))
                  : ''
              }
            </div>
            <div className='mb-2 pb-3 border-b dark:border-neutral-700'>
              <h2 className='mb-2 text-lg font-light'>Cupon de descuento</h2>
              <div className='flex gap-2'>
                <input type='text' placeholder='Cupon' className='border p-1 rounded font-light w-72 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                <Button2>Agregar</Button2>
              </div>
            </div>
            <div className='mb-2 pb-2 border-b dark:border-neutral-700'>
              <div className='flex gap-2 justify-between mb-1'>
                <span className='font-light'>Subtotal</span>
                <span>${NumberFormat(sell.cart.reduce((bef, curr) => bef + curr.price * curr.quantity, 0))}</span>
              </div>
              <div className='flex gap-2 justify-between'>
                <span className='font-light'>Envío</span>
                <span>${NumberFormat(Number(sell.shipping))}</span>
              </div>
            </div>
            <div className='flex gap-2 justify-between'>
              <span className='text-lg'>Total</span>
              <span className='text-lg'>${NumberFormat(sell.cart.reduce((bef, curr) => bef + curr.price * curr.quantity, 0) + Number(sell.shipping))}</span>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CheckOut