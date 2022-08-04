
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
        login: (state, action) => {

        },
        logOut: (state, payload) => {

        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
        
    }
});


// Action creators are generated for each case reducer function
export const { login, logOut, checkingCredentials } = authSlice.actions;