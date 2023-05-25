import Loading from '@/components/sophon/loading/loading'
import { Toaster } from '@/components/ui/toaster'
import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <Toaster />
      <Loading/>
    </RecoilRoot>
  )
}
