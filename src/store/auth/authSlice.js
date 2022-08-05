
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        //comprovamos con status el estado de autenticacion el checking es comprovacion del estado
        status: 'not-authenticated', //'authenticated, 'checking'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {

            //recibimos la informacion del archivo thunks.js y con el pauload ponemos
            //los valores obtenidos cambiando el estado 
            state.status = 'authenticated', //'authenticated, 'checking'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;

        },
        logOut: (state, { payload }) => {

            //reseteamos los valores
            state.status = 'not-authenticated', //'authenticated, 'checking'
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload.errorMessage;

        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
        
    }
});


// Action creators are generated for each case reducer function
export const { login, logOut, checkingCredentials } = authSlice.actions;