import { ToastOptions } from 'react-toastify';

export const toastOptions: ToastOptions = Object.freeze({
    position:        'top-right',
    autoClose:       5000,
    hideProgressBar: false,
    closeOnClick:    true,
    pauseOnHover:    true,
    draggable:       true,
    progress:        undefined,
});
