import { NextPage } from 'next';
import { ErrorElement } from '../elements/error';

export const ServerErrorPage:NextPage = () => {
    return (
        <ErrorElement
            statusCode={ 500 }
            title='There is some server error.'
        />
    );
};

export default ServerErrorPage;
