import { FC } from 'react';
import { IErrorPage } from '../../types';

export const ErrorElement:FC<IErrorPage>  = ({ statusCode, title, }) => (
    <div className="error">
        <div className="container error__container">
            <div className='error__text-container'>
                <h1 className = 'error__title'>{statusCode}</h1>
                <h4 className = 'error__subtitle'>{title}</h4>
                <div>
                    <a href = '/' className='error__btn'>Go To Homepage</a>
                </div>
            </div>
        </div>
    </div>
);
