import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsFillMoonFill, BsFillSunFill, BsBag } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
import { FiMenu } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import { NavbarCart } from '../cart'

interface Props {
  menu: any,
  setMenu: any,
  setIndex: any,
  setLink: any
}

export const FixedNavbar: React.FC<Props> = ({ menu, setMenu, setIndex, setLink }) => {
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [cart, setCart] = useState(false)

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

  return (
    <>
    <div className='w-full z-50 fixed'>
      <div className='border-b flex bg-white w-full pl-2 pr-2 dark:bg-neutral-900 dark:border-neutral-800'>
        <div className='m-auto w-1440 flex justify-between sticky'>
          {
            theme === 'system'
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
            <CiUser className='mt-auto mb-auto text-2xl cursor-pointer' />
            <BsBag onMouseEnter={() => setCart(true)} onMouseLeave={() => setCart(false)} className='mt-auto mb-auto text-xl ml-1 cursor-pointer h-full' />
            {renderThemeChanger()}
          </div>
          <div className='flex gap-4 530:hidden'>
            <CiUser className='mt-auto mb-auto text-2xl cursor-pointer' />
            <BsBag className='m-auto text-xl ml-1 cursor-pointer h-full' onMouseEnter={() => setCart(true)} onMouseLeave={() => setCart(false)} />
            {renderThemeChanger()}
            {
              menu === 'ml-520'
                ? <button onClick={() => {
                    setMenu('ml-0')
                    setIndex('z-30')
                    setLink('block')
                  }}>
                  <FiMenu className='text-2xl' />
                </button>
                : <button onClick={() => {
                    setMenu('ml-520')
                    setTimeout(() => {
                      setIndex('-z-10')
                      setLink('hidden')
                    }, 100)
                  }}>
                  <IoCloseOutline className='text-2xl' />
                </button>
            }
          </div>
        </div>
      </div>
      {
        cart === true
          ? (
          <div className='w-full flex absolute'>
            <div className='w-1440 flex m-auto'>
              <div className='ml-auto flex w-96' onMouseEnter={() => setCart(true)} onMouseLeave={() => setCart(false)}>
                <NavbarCart />
              </div>
            </div>
          </div>
          )
          : ''
      }
    </div>
    </>
  )
}