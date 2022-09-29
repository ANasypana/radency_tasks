import { NextPage } from 'next';
import { ErrorElement } from '../elements/error';

export const NotFoundPage:NextPage = () => {
    return (
        <ErrorElement
            statusCode={ 404 }
            title='The page you were looking for could not be found.'
        />
    );
};

export default NotFoundPage;
