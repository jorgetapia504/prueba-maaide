import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SWRConfig } from 'swr'
import { MainLayout } from '../components/layouts'
import CartProvider from '../context/cart/CartProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <ThemeProvider attribute='class'>
        <CartProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </CartProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}
