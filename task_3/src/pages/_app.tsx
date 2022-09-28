import { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/libs/style.css';


function MyApp({ Component, pageProps }: AppProps) {

  return <Component { ...pageProps } />
}

export default MyApp
