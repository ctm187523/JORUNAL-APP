
//proveedores de autenticacion, en nuestro caso google ver video 274

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

//funcion para autenticar con google
export const singInWithGoogle = async () => {

    try {

        //creamos una variable(result) donde con el await primeramente importamos
        //de firebase signInWithPopup(aparace un pop ip para autenticar con google) y le pasamos por argumento FireBaseAuth del archivo 
        //config.js linea 25 y el proveedor que en este caso es googleProvider podria se
        //Facebook o otros
        const result = await signInWithPopup(FirebaseAuth, googleProvider);

        //obtenemos las credencialales como el token usando GoogleAuthProvider de Firebase lo comentamos porque no lo usamos
        //const credentials = GoogleAuthProvider.credentialFromResult( result );

        //obtenemos el usuario(user) de la informacion recibida y lo desestructuramos con
        //la informacion que queramos obtener
        const { displayName, email, photoURL, uid } = result.user;

        //retornamos la informacion recibida
        return {
            ok: true,
            //informacion del usuario
            displayName, email, photoURL, uid
        }


    } catch (error) {

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}
