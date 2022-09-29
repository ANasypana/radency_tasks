import { NextPage } from 'next';
import { ErrorElement } from '../elements/error';

export const ErrorPage:NextPage = () => {
    return (
        <ErrorElement
            statusCode={ 404 }
            title='Unknown client Error.'
        />
    );
};

export default ErrorPage;
