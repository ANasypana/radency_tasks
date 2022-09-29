import { FC } from 'react';
import { Audio } from  'react-loader-spinner';
import { useNotes } from '../../hooks';
import { MainTable } from './TableMain';
import { SummaryTable } from './SummaryTable';
import { ButtonSwitch } from './ButtonSwitch';


export const NotesList: FC = () => {
    const {
        summary, showNotes, isLoading, removeNone,
        archiveNote, switchToArchive, switchToActive, selectNote, active,
    } = useNotes();

    return (
        <div className = 'notes'>
            { isLoading
                && <Audio
                    color = '#4D7CFE'
                    height = '80'
                    width = '80' />
            }
            { !isLoading && showNotes.length > 0
                && <MainTable
                    notes = { showNotes }
                    removeNone = { removeNone }
                    selectNote = { selectNote }
                    archiveNote = { archiveNote } />
            }
            { !isLoading
                && (active.length > 0 && (showNotes.length === 0 || showNotes[ 0 ]?.archived))
                && <ButtonSwitch clickHandler = { switchToActive } />

            }
            { !isLoading && summary.length > 0
                && <SummaryTable summary = { summary } showArchives = { switchToArchive } />
            }
        </div>
    );
};

