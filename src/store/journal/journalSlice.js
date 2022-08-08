
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        //active seria una nota
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], //arreglo de https con las imagenes
        // }
    },
    reducers: { //los reducers siempre tienen que ser sincronos para acciones asincronas usamos el archivo thunks.js

        //cambia el estado de isSaving a true para que no se pueda dar al boton de agregar de nuevo mientras se salva una nota
        savingNewNote: ( state ) => {
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
        },
        //cargamos todas las notas que se encuentran en firebase del usuario loggeado
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {

        },
        updateNote: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        },

    }
});


// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote } = journalSlice.actions;