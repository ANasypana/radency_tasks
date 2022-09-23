import { FC } from 'react';
import cn from 'classnames';
import Audio from  'react-loader-spinner';
import { useNotes } from '../../hooks';
import { MainTable } from './TableMain';
import { SummaryTable } from './SummaryTable';
import { ButtonSwitch } from './ButtonSwitch';


export const NotesList: FC = () => {
    const {
        summary, showNotes, isLoading, removeNotes, removeNone, archiveNotes,
        archiveNote, switchToArchive, switchToActive, selectNote, active,
    } = useNotes();

    const styles = cn(
        'list',
        {
            empty: !isLoading && summary.length === 0 && active.length === 0,
        },
    );

    return (
        <div className = { styles }>
            <div className = 'notes'>
                { isLoading
                    && <Audio
                        color = '#4D7CFE'
                        height = '80'
                        width = '80'
                        type = 'Audio' />
                }
                { !isLoading && showNotes.length > 0
                    && <MainTable
                        notes = { showNotes }
                        removeNone = { removeNone }
                        selectNote = { selectNote }
                        archiveNote = { archiveNote }
                        removeNotes = { removeNotes }
                        archiveNotes = { archiveNotes } />
                }
                { !isLoading
                    && (active.length > 0 && (showNotes.length === 0 || showNotes[ 0 ]?.archived))
                    && <ButtonSwitch clickHandler = { switchToActive } />

                }
                { !isLoading && summary.length > 0
                    && <SummaryTable summary = { summary } showArchives = { switchToArchive } />
                }
            </div>
        </div>
    );
};

