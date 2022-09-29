import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getMessage } from '../lib/redux/selectors';
import { messageActions } from '../lib/redux/actions';
import { toastOptions } from '../constans/toastOptions';
import { useAppDispatch } from '../lib/redux/init/store';
import { ToastTheme } from '../types';

export const useToastMessage = () => {
    const message = useSelector(getMessage);
    const dispatch = useAppDispatch();
    const nitify = (note: string, type: ToastTheme) => toast[ type ](note, toastOptions);

    useEffect(() => {
        if (message?.message) {
            nitify(message.message, message.type);
            dispatch(messageActions.resetMessage());
        }
    }, [message?.message]);
};
