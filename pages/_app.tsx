import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <ThemeProvider attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}
