
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,  //active seria la nota activa en ese monento
       
    },
    reducers: { //los reducers siempre tienen que ser sincronos para acciones asincronas usamos el archivo thunks.js

        //cambia el estado de isSaving a true para que no se pueda dar al boton de agregar de nuevo mientras se salva una nota
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        //añadimos una nueva nota al ser pulsado el boton flotante
        addNewEmptyNote: (state, action) => {

            //añadimos al array notes la nueva nota 
            state.notes.push(action.payload);
            state.isSaving = false; //cambiamos a false el isSaving del state

        },
        //cargamos la nota activa que se acaba de cargar, al crear una nueva nota en active se muestra la nota que se acaba de insertar
        //tambien se llama esta funcion al seleccionar una nota del menu lateral
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        //cargamos todas las notas que se encuentran en firebase del usuario loggeado
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        //actualizamos la nota modificada
        updateNote: (state, action) => { //el payload es la nota actualizada
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                //verificamos cual ha sido la nota modificada en el payload para que sea modificado segun su id
                // si coincide retorna la nota modificada y sale del bucle
                if (note.id === action.payload.id) {
                    return action.payload;
                }

                return note;
            });

            //cambiamos la propiedad de este sliceJournal y ponemos en la propiedad state.messageSaved
            //el texto correspondiente para luego ser observado y si el state.messageSaved no es null
            //muester el mensaje de que ha sido actualizada la nota correctamente
            state.messageSaved = `${action.payload.title}, actualizada correctamente;`;
        },

        //incluimos en la propiedad active en su atributo imageUrls las imagenes cargadas a cloudinary
        //como atributo esparcimos las imagenes que ya teniamos mas las obtenidas nuevas en el payload
        //estas imagenes al pulsar el boton de guardar se guardaran tambien en firestore dentro del active en imageUrls
        setPhotosToActiveNote(state, action) {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },

        //metodo para borrar las notas almacenadas al hacer logOut
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        //metodo encargado de borrar una nota, para borrar las imagenes de la nota seleccionada
        //en cloudinary lo vemos en el testing de la seccion 21, video 320
        deleteNoteById: (state, action) => {

            state.active = null; //ponemos el active en null para que al ser null JournalPage.jsx visualize el componente de NothingSelectedView en lugar de NoteView 
            //usamos la funcion filter de javaScript para eliminar la nota que es igual al payload pasado por la funcion startDeletingNote de store/journal/thunks
            //con filter creamos de nuevo el state.notes pero sin pasarle la nota seleccionada
            state.notes = state.notes.filter((item ) => item.id !== action.payload);     
        },

    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;