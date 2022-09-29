import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


export const HeaderComponent:FC = () => {
    const router = useRouter();

    return (
        <>
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
