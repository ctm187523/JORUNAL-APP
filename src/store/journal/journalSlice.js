
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        //active serie una nota
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
        addNewEmptyNote: (state, action) => {

            //añadimos a la variable notes del state el action.payload recibido por parametro
            state.notes.push(action.payload);
            state.isSaving = false; //cambiamos a false el isSaving del state

        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {

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