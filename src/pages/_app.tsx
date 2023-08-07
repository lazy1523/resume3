import Layout from '@/components/sophon/layout/layout'
import Loading from '@/components/sophon/loading/loading'
import { Toaster } from '@/components/ui/toaster'
import '@/src/styles/globals.css'

import type { AppProps } from 'next/app'

import { RecoilRoot, useRecoilState } from 'recoil'
export default function App({ Component, pageProps }: AppProps) {

  const ComponentWithUser = ({ Component, pageProps }: AppProps) => {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <RecoilRoot>
      <ComponentWithUser Component={Component} {...pageProps} />
      <Toaster />
      {/*  解开注释即可启用全局loading 会破坏用户的心流  */}
      <Loading/>
    </RecoilRoot>
  )
}
