
//tareas asincronas

import { singInWithGoogle } from "../../firebase/providers";
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
        if( !result.ok ) return dispatch ( logOut( result.errorMessage) );

        //si todo esta bien usamos la funcion login del archivo authSlice y le pasamos al
        //al archivo authSlice el resultado obtenido(result)
        dispatch ( login (result))

            
        
    }


}