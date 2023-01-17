import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { BsFillMoonFill, BsFillSunFill, BsBag } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
import { NavbarCart } from '../cart'
import { FiMenu } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import { AiOutlineRight } from 'react-icons/ai'

interface Props {
  menu: any,
  setMenu: any,
  setIndex: any,
  index: any
}

export const Navbar: React.FC<PropsWithChildren<Props>> = ({ children , menu, setMenu, setIndex, index }) => {

  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [cart, setCart] = useState('hidden')

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderThemeChanger = () => {
    if ( !mounted ) return null
    const currentTheme = theme === 'system' ? systemTheme : theme
    if ( currentTheme === 'dark' ) {
      return (
        <button onClick={() => setTheme('light')}><BsFillMoonFill className='text-slate-600' /></button>
      )
    } else {
      return (
        <button onClick={() => setTheme('dark')}><BsFillSunFill className='text-slate-500' /></button>
      )
    }
  }

  useEffect(() => {
    if (index === 'flex') {
      setMenu('w-5/6 p-6')
    }
  }, [index])

  return (
    <>
    <div className='w-full'>
      <div className='bg-main text-white flex pt-1 pb-1 pl-2 pr-2 text-center'>
        <p className='m-auto text-15'>Envío gratis en 24 horas para todo Santiago</p>
      </div>
      <div style={{ top: '-1px' }} className='sticky border-b flex bg-white w-full transition-all duration-200 z-30 dark:bg-neutral-900 dark:border-neutral-800'>
        <div className='m-auto w-1440 flex justify-between z-40 pl-2 pr-2'>
          {
            !mounted
              ? ''
              : theme === 'system'
              ? systemTheme === 'dark'
                ? <Link href='/'><img className='w-44' src='https://res.cloudinary.com/blasspod/image/upload/v1664841660/blaspod/jjfme7pn7hnlhniuiab3.png' /></Link>
                : <Link href='/'><img className='w-44' src='https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png' /></Link>
              : theme === 'dark'
                ? <Link href='/'><img className='w-44' src='https://res.cloudinary.com/blasspod/image/upload/v1664841660/blaspod/jjfme7pn7hnlhniuiab3.png' /></Link>
                : <Link href='/'><img className='w-44' src='https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png' /></Link>
          }
          <div className='hidden gap-6 530:flex'>
            <Link className='mt-auto mb-auto font-light' href='/'>Inicio</Link>
            <Link className='mt-auto mb-auto font-light' href='/tienda'>Tienda</Link>
            <Link className='mt-auto mb-auto font-light' href='/contacto'>Contacto</Link>
            <CiUser className='mt-auto mb-auto text-2xl cursor-pointer' />
            <BsBag className='m-auto text-xl ml-1 cursor-pointer h-full' onMouseEnter={() => setCart('flex')} onMouseLeave={() => setCart('hidden')} />
            {renderThemeChanger()}
          </div>
          <div className='flex gap-4 530:hidden'>
            <CiUser className='mt-auto mb-auto text-2xl cursor-pointer' />
            {
              cart === 'hidden'
                ? <BsBag className='m-auto text-xl ml-1 cursor-pointer h-full' onClick={() => setCart('flex')} />
                : <IoCloseOutline className='m-auto text-xl ml-1 cursor-pointer h-full' onClick={() => setCart('hidden')} />
            }
            {renderThemeChanger()}
            {
              menu === 'w-0 pl-0 pr-0 pt-6 pb-6'
                ? <button onClick={() => {
                    setIndex('flex')
                  }}>
                  <FiMenu className='text-2xl' />
                </button>
                : <button onClick={() => {
                    setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
                    setTimeout(() => {
                      setIndex('hidden')
                    }, 100)
                  }}>
                  <IoCloseOutline className='text-2xl' />
                </button>
            }
          </div>
        </div>
        <div className={`${cart} w-full z-50 absolute top-14`}>
          <div className='w-1440 flex m-auto'>
            <div className='ml-auto flex w-80 400:w-96' onMouseEnter={() => setCart('flex')} onMouseLeave={() => setCart('hidden')}>
              <NavbarCart />
            </div>
          </div>
        </div>
        <div className={`${index} w-full absolute z-30 justify-between 530:hidden`} style={{ top: '61px', height: 'calc(100vh - 91.33px)' }}>
          <div className='w-1/6' onClick={() => {
            setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
            setTimeout(() => {
              setIndex('hidden')
            }, 100)
          }} />
          <div className={`${menu} transition-all duration-200 shadow-md bg-white overflow-hidden dark:border dark:border-neutral-800 dark:bg-neutral-900`}>
            <Link className={`mb-4 font-light flex pb-2 border-b`} href='/'>Inicio<AiOutlineRight className='ml-auto text-lg' /></Link>
            <Link className={`mb-4 font-light flex pb-2 border-b`} href='/tienda'>Tienda<AiOutlineRight className='ml-auto text-lg' /></Link>
            <Link className={`mb-4 font-light flex pb-2 border-b`} href='/contacto'>Contacto<AiOutlineRight className='ml-auto text-lg' /></Link>
          </div>
        </div>
      </div>
      { children }
    </div>
    </>
  )
}
