
//proveedores de autenticacion, en nuestro caso google ver video 274

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
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


//creamos un nuevo proveedor que sera el de registrarse con usuario i password
export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        //debemos insertar los nuevos usarios registrados a Firebase, usando la funcion
        //createUserWithEmailAndPassword de Firebase, le pasamos por argumento FireBaseAuth del archivo 
        //config.js , seguidamente del email y del password
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        //desestructuramos de la respuesta recibida(resp.user) el uid y el photoUrl
        const { uid, photoURL } = resp.user;
        console.log(resp);

        //usamos el metodo updateProfile de Firebase para actualizar al usuario creado anteriormente concreateUserWithEmailAndPassword
        //como parametro pasamos al usuario usando FirebaseAuth del archivo config.js
        //con esta funcion obtenemos el usuario actual gracias al metodo antes utilizado createUserWithEmailAndPassword
        //y seguidamente actualizamos(segundo parametro de updateProfile) insertando el displayName ya que antes solo teniamos email y password
        await updateProfile(FirebaseAuth.currentUser, { displayName });


        return {
            ok: true,
            uid, photoURL, email, displayName
        }


    } catch (error) {

        return { 
            ok: false, 
            errorMessage: error.message
         }

    }

}

//peticion a Firebase para autenticar el registro de un usuario registrado
export const loginWithEmailPassword = async ({ email, password }) => {

    try {
        //utilizamos la funcion signInWithEmailAndPassword de Firebase
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        //obtenemos el usuario(user) de la informacion recibida y lo desestructuramos con
        //la informacion que queramos obtener
        const { displayName, photoURL, uid } = result.user;


        //retornamos la informacion recibida
        return {
            ok: true,
            //informacion del usuario
            displayName, photoURL, uid
        }


    } catch (error) {


        return {
            ok: false, 
            errorMessage: error.message
        }

    }

}

//llamaoms al logout de Firebase para que un usuario pueda hacer logout
export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut();
}