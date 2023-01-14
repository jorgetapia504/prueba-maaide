import Head from 'next/head'
import Link from 'next/link'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { FixedNavbar, Footer, Navbar } from '../ui'

interface Props {
  title: string
  description: string
  image?: string
}

export const MainLayout: React.FC<PropsWithChildren<Props>> = ({ children, title, description, image }) => {

  const [scrollPosition, setScrollPosition] = useState(0)
  const [menu, setMenu] = useState('ml-520')
  const [index, setIndex] = useState('-z-10')
  const [link, setLink] = useState('hidden')

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name='description' content={ description } />
        <meta name='og:title' content={ title } />
        <meta name='og:description' content={ description } />
        {
          image && (
            <meta name='og:image' content={ image } />
          )
        }
      </Head>
      {
        scrollPosition >= 30.5
          ? <FixedNavbar menu={menu} setMenu={setMenu} setIndex={setIndex} setLink={setLink} />
          : ''
      }
      <Navbar menu={menu} setMenu={setMenu} setIndex={setIndex} setLink={setLink} />
      {
        scrollPosition >= 30.5
          ? <div className={`${index} w-full fixed flex -mt-8 h-full`}>
            <div className='w-1/6' onClick={() => setMenu('ml-520')} />
            <div className={`${menu} transition-all duration-200 bg-white w-5/6 p-4 dark:bg-neutral-900`}>
              <Link className={`mt-auto mb-auto font-light ${link}`} href='/'>Inicio</Link>
              <Link className={`mt-auto mb-auto font-light ${link}`} href='/tienda'>Tienda</Link>
            </div>
          </div>
          : <div className={`${index} w-full fixed flex h-full`}>
            <div className='w-1/6' onClick={() => setMenu('ml-520')} />
            <div className={`${menu} transition-all duration-200 bg-white w-5/6 p-4 dark:bg-neutral-900`}>
              <Link className={`mt-auto mb-auto font-light ${link}`} href='/'>Inicio</Link>
              <Link className={`mt-auto mb-auto font-light ${link}`} href='/tienda'>Tienda</Link>
            </div>
          </div>
      }
      { children }
      <Footer />
    </>
  )
}
