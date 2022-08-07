
//tareas asincronas

import { ConstructionOutlined } from "@mui/icons-material";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDb } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "./journalSlice";

export const startNewNote = () => {

    //MIRAR EN FIRESTORE EN REGLAS COMO SE HA CONFIGURADO PARA PERMITIR EL ACCESO 
    //A LOS USUARIOS AUTENTICADOS allow read,write: if request.auth != null

    //con dispatch accedemos a los metodos de los slices del store y con el getState a los estados
    //debemos acceder al uid del usuario gracias al getState
    return async (dispatch, getState) => {

        //hacemos dispatch al metodo savingNewNote() de jornalSlice.js para dambiar el estado del isSaving a true y asi usarlo
        //para desabilitar el boton de agregar nota mientras se salva una nota
        dispatch( savingNewNote());

        //obtenemos el uid del usuario logeado desestructurando el getState().auth y que lo busque dentro del slice auth
        const { uid } = getState().auth;

        //para almacenar en cloud firestore usamos el uid del usuario
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //usamos el metodo doc del firestore y dentro de el, el metodo tambien de firestore collectio
        //donde como parametro le pasamos el FirebaseDb de nuestro archivo firebase/config.js donde tenemos la configuracion de la base de datos
        //como segundo parametro pasamos un template string con el uid del usuario y la estructura que tendra la base de datos
        const newDoc = doc(collection(FirebaseDb, `${uid}/journal/notes`));

        //pasamos la nueva nota usando el metodo setDoc de Firebase
        //el primer parametro es la referencia que es la constante newDoc creada arriba
        //y el segundo parametro es la nota a alamcenar
        await setDoc(newDoc, newNote);

        //creamos la propiedad id de la nota en firestore a la newNote desde el id de newDoc
        newNote.id = newDoc.id;

        //usamos el dispatch para llamar al metodo addNewEmptyMode del journalSlice.js
        //como payload pasamos el newNote
        dispatch(addNewEmptyNote(newNote));

        //usamos el dispatch para llamar al metodo setActiveNote del journalSlice.js
        //como payload pasamos el newNote
        dispatch(setActiveNote( newNote));

        //dispatch( savingNewNote());
    }
}