import Head from 'next/head'
import React, { useState } from 'react'
import { Button } from '../../components/ui'
import { IContactData } from '../../interfaces'

const ContactPage = () => {

  const [formContact, setFormContact] = useState<IContactData>({
    firstName: '',
    email: '',
    message: ''
  })

  const inputChange = (e: any) => {
    setFormContact({ ...formContact, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Head>
        <title>Contacto</title>
      </Head>
      <div className='flex p-4'>
        <div className='m-auto w-1280 block gap-16 1010:flex'>
          <div className='w-full m-auto mb-10 1010:w-1/2 1010:mb-auto'>
            <h1 className='text-5xl mb-2 mt-6 1010:mt-0'>Contacto</h1>
            <p className='font-light'>Para cualquier pregunta o consulta que tengas, no dudes en ponerte en contacto con nosotros a traves del siguiente formulario, desde el chat del sitio web o desde nuestras redes sociales.</p>
          </div>
          <div className='w-full m-auto mt-6 mb-6 650:w-560 1010:w-1/2'>
            <div className='rounded-md shadow-2xl p-4 420:p-6 650:p-10'>
              <h2 className='text-2xl mb-4'>Para ponerte en contacto con nosotros llena el siguiente formulario</h2>
              <form>
                <input type='text' placeholder='Nombre' name='firstName' onChange={inputChange} className='p-2 text-sm font-light w-full rounded border mb-3' />
                <input type='email' placeholder='Email' name='email' onChange={inputChange} className='p-2 text-sm font-light w-full rounded border mb-3' />
                <textarea placeholder='Mensaje' name='message' onChange={inputChange} className='p-2 font-light text-sm w-full rounded border h-20' />
                <input type='file' className='font-light text-sm mt-2 mb-4 block w-full' />
                <button onClick={(e) => {
                  e.preventDefault()
                  console.log(formContact)
                }}>
                  <Button>Enviar</Button>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage