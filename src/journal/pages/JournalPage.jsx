
import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {
    return (

        //usamos el componente JornalLayout.jsx para tomar su estilos predefinidos
        <JournalLayout>

            {/* <Typography> dsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd</Typography> */}

            {/* Usamos el componente NothingSelected.jsx, es el componente que mostramos
            cuando no hay nada seleccionado */}
            <NothingSelectedView />

            {/* Usamos el componente NoteView.jsx cuando hay algo seleccionado*/}
            {/* <NoteView /> */}

            {/* creamos un boton flotante para añadir nuevas notas */}
            <IconButton
                size='large'
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
                <AddOutlined sx={{ fontSize: 30 }}/>
            </IconButton>

        </JournalLayout>



    )
}
