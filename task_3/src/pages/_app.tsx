import { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/libs/style.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

//Hooks
import { useStore } from '../lib/redux/init/store';


function MyApp({ Component, pageProps }: AppProps) {

  const store = useStore(pageProps.initialReduxState);

  return (
          <Provider store = { store }>
            <Component { ...pageProps } />
          </Provider>
      );
};

export default MyApp;
