import { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import { HeaderComponent, ListOfNotesComponent } from '../components';
import { AppView } from '../views/app';
import {INoteModel, ISummary} from '../types';
import { initialDispatcher } from '../lib/redux/init/intialDispatcher';
import { initializeStore } from '../lib/redux/init/store';


interface IProps {
    notes: INoteModel[];
}


const Home:NextPage<IProps> = () => {

    return (
        <AppView
            header = { <HeaderComponent /> }
            content = { <ListOfNotesComponent /> }
        />
    );
};

export const getServerSideProps:GetServerSideProps = async (context) => {
    const notes = await axios.get<INoteModel[]>(`http://${context?.req?.headers?.host}/api/notes`);
    const summary  = await axios.get<ISummary[]>(`http://${context?.req?.headers?.host}/api/notes/stats`);
    if(!!notes.data && !!summary.data) {
        const { store } = await initialDispatcher(notes.data, summary.data, initializeStore());
        const initialReduxState = store.getState();
        return {
            props: {
                initialReduxState
            }
        };
    };

    return {
        props: {

        }
    };

};

export default Home;
