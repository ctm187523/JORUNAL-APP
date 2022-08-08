
import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {

    //llamamos al useDispatch() ppara acceder a los metodos del journalSlice almacenado en el store.js
    const dispatch = useDispatch();

    //llamamos al metodo useSelector para poder acceder a las states de los slices del store en este caso del journalSlice.js
    const { isSaving, active } = useSelector(state => state.journal);

    //metodo para crear una nueva nota al hacer click en el boton flotante
    const onClickNewNote = () => {

        dispatch(startNewNote()); //con la constante dispatch creada arriba llamamos al metodo startNewNote del archivo journal/thunks.js, los archivos thunks tiene acceso al store
    }

    return (

        //usamos el componente JornalLayout.jsx para tomar su estilos predefinidos
        <JournalLayout>

            {/* Usamos el componente NothingSelected.jsx,cuando no hay nada seleccionado 
         Usamos el componente NoteView.jsx cuando hay algo seleccionado 
         podriamos poner en la condicion active === null pero usamos !!active
         y de esta manera lo transformamos en un booleano*/}

            {
                (!!active)
                    ? <NoteView />
                    : <NothingSelectedView />
            }


            {/* creamos un boton flotante para añadir nuevas notas */}
            <IconButton
                // llamamos al metodo onClickNewNote
                onClick={onClickNewNote}
                size='large'
                disabled={isSaving}
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                {/* usamos el icono de material UI AddOutLined */}
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>

        </JournalLayout>



    )
}
