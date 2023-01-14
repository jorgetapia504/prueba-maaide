import Link from 'next/link'
import React from 'react'
import { Button } from '../ui'

export const NavbarCart = () => {
  return (
    <div className='ml-auto p-4 rounded-md shadow-md bg-white z-40 w-96 dark:bg-neutral-900'>
      <h4 className='text-center mb-3 text-xl pb-2 border-b w-full dark:border-neutral-800'>Carrito</h4>
      <p className='font-light mb-2'>No tienes productos añadidos al carrito</p>
      <Link href='/tienda'><Button>Ir a la tienda</Button></Link>
    </div>
  )
}
