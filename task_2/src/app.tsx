// Core
import { FC } from 'react';
import {
    Navigate, Outlet, Route, Routes,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

// Components
import {
    NotesManagerPage, ProfilePage,
} from './pages';
import { Navigation } from './components';


// Instruments
import { useToastMessage } from './hooks';
import { book } from './navigation/book';


export const App: FC = () => {
    useToastMessage();

    return (
        <>
            <ToastContainer newestOnTop transition = { Slide } />
            <Navigation />
            <Routes>
                <Route path = '/' element = { <Outlet /> }>
                    <Route path = { book.notesManager } element = { <NotesManagerPage /> } />
                    <Route path = { book.profile } element = { <ProfilePage /> } />
                </Route>
                <Route
                    path = '*'
                    element = { <Navigate to = { book.notesManager } replace /> } />
            </Routes>
        </>
    );
};
