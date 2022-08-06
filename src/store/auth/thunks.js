
//tareas asincronas

import { registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logOut } from "./authSlice";


export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

    }
}

export const startGoogleSignIn = () => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

        //llamamos al metodo singInWithGoogle creado en el archivo providers linea 10
        const result = await singInWithGoogle();
        //si recibimos result.ok en false llamamos a la funcion logOut de authSlice
        //mandamos como payload el errorMessage recibido en el result
        if (!result.ok) return dispatch(logOut(result.errorMessage));

        //si todo esta bien usamos la funcion login del archivo authSlice y le pasamos al
        //al archivo authSlice el resultado obtenido(result)
        dispatch(login(result))

    }

}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

        //llamamos al metodo registerUserWithEmailPassword del archivo providers linea 50
        //una vez obtenida la informacion la desestructuramos con ok, uid, photoURL
        const { ok, uid, photoURL, errorMessage  } = await registerUserWithEmailPassword({ email, password, displayName });

        //si el ok es false, algo salio mal usamos dispatch para llamar a la funcion logOut de authSlice.js y 
        //pasarle como argumento el error
        if( !ok ) return dispatch( logOut( {errorMessage}));

        //si todo sale bien logueamos al usuario usando dispatch para llamar a la funcion login de authSlice.js
        dispatch( login( { uid, displayName, email, photoURL }))
   

    }


}