import { FC } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useToastMessage } from '../../hooks'


export const HeaderComponent:FC = () => {
    useToastMessage();
    const router = useRouter();

    return (
        <>
            <ToastContainer newestOnTop transition = { Slide } />
            <nav>
                <Link href = '/'>
                    <a className = { router.pathname === '/' ?  'active' : '' }>
                        Notes
                    </a>
                </Link>
            </nav>
        </>

    );
};
