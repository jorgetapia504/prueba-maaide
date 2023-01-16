import Head from 'next/head'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Footer, Navbar } from '../ui'

interface Props {
  title: string
  description: string
  image?: string
}

export const MainLayout: React.FC<PropsWithChildren<Props>> = ({ children, title, description, image }) => {

  const [scrollPosition, setScrollPosition] = useState(0)
  const [menu, setMenu] = useState('w-0 pl-0 pr-0 pt-6 pb-6')
  const [index, setIndex] = useState('hidden')

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
      <Navbar menu={menu} setMenu={setMenu} setIndex={setIndex} index={index}>
        { children }
      </Navbar>
      <Footer />
    </>
  )
}
