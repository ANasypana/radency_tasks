import { GetServerSidePropsContext } from 'next';
import { notesActions } from '../actions';
import { serverDispatch } from '../halpers/serverDispatch';
import { InitializeStore } from './store';
import { INoteModel, ISummary } from '../../../types';


export const initialDispatcher = async (notes: INoteModel[], summary: ISummary[], store: InitializeStore) => {
    await serverDispatch(store, (dispatch) => {
       /* dispatch(notesActions.getNotesAsync(`http://${context?.req?.headers?.host}`));*/
        dispatch(notesActions.setNotes(notes));
        dispatch(notesActions.setSummary(summary));
    });

    return {
        store,
    };

};

