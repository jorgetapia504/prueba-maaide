import React from 'react'
import { BsTruck, BsCreditCard2Back } from 'react-icons/bs'
import { IoIosTimer } from 'react-icons/io'

export const Subscribe = () => {
  return (
    <>
      <div className='w-full bg-neutral-100 pl-4 pr-4 flex transition-all duration-200 dark:bg-neutral-700/60'>
        <form className='m-auto w-1270 mt-16 mb-16'>
          <h3 className='mb-4 text-xl text-center'>Suscribete para recibir ofertas exclusivas, sorteos y promociones</h3>
          <div className='flex'>
            <input type='email' placeholder='Email' className='p-2 w-full' />
            <button className='pt-2 pb-2 pl-10 pr-10 bg-neutral-800 text-white'>Envíar</button>
          </div>
        </form>
      </div>
      <div className='w-full m-auto flex bg-neutral-800 pl-4 pr-4 pt-10 pb-10'>
        <div className='w-1270 m-auto flex flex-wrap gap-4 justify-between'>
          <div className='flex gap-2'>
            <BsTruck className='text-white text-4xl' />
            <p className='text-white m-auto font-light'>Envío gratis a todo Santiago</p>
          </div>
          <div className='flex gap-2'>
            <IoIosTimer className='text-white text-4xl' />
            <p className='text-white m-auto font-light'>Recibe en 24 y 48 horas</p>
          </div>
          <div className='flex gap-2'>
            <BsCreditCard2Back className='text-white text-4xl' />
            <p className='text-white m-auto font-light'>Pago seguro</p>
          </div>
        </div>
      </div>
    </>
  )
}
