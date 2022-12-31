import type { AppProps } from 'next/app';
import { ColorsProvider } from '../context/colors';
import '../scss/styles.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorsProvider>
      <Component {...pageProps} />
    </ColorsProvider>
  )
}
