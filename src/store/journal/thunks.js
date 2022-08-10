
//tareas asincronas

import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDb } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote} from "./journalSlice";

export const startNewNote = () => {

    //MIRAR EN FIRESTORE EN REGLAS COMO SE HA CONFIGURADO PARA PERMITIR EL ACCESO 
    //A LOS USUARIOS AUTENTICADOS allow read,write: if request.auth != null

    //con dispatch accedemos a los metodos de los slices del store y con el getState a los estados
    //debemos acceder al uid del usuario gracias al getState
    return async (dispatch, getState) => {

        //hacemos dispatch al metodo savingNewNote() de jornalSlice.js para cambiar el estado del isSaving a true y asi usarlo
        //para desabilitar el boton de agregar nota mientras se salva una nota
        dispatch(savingNewNote());

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
        dispatch(setActiveNote(newNote));

    }
}

//creamos una nueva funcion para cargar las notas de firestore, esta funcion es llamada
//desde el custom Hook hooks/useCheckAuth
export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        //obtenemos el uid del usuario logeado desestructurando el getState().auth y que lo busque dentro del slice auth
        const { uid } = getState().auth;

        //ponemos una condicion que si el uid del usuario no existe mandamos un error
        if ( !uid ) throw new Error('El UID del usuario no existe');

        //llamamos al metodo loadNotes de helpers/loadNotes.js
        const notes = await loadNotes(uid);

        //llamamos al metodo setNotes del archivo journalSlice.js para que se carguen las notas
        dispatch(setNotes(notes));
    }
}

//metodo para grabar la nota con los cambios efectuados
export const startSaveNote = () => {
    return async(dispatch, getState) => {

        dispatch( setSaving() ); //llamamos a setSaving de journalSlice

        const { uid } = getState().auth;
        const { active:note } = getState().journal; // cambiamos el nombre de active a note y del sliceJournal recuperamos la nota activa

        const noteToFireStore = { ...note }; //esparcimos los atributos de la nota(spread)

        //usamos delete de javaScript para eliminar la propiedad id
        delete noteToFireStore.id; 

        //creamos la referencia al documento como hicimos en los metodos de arriba añadiendo el id
        const docRef = doc( FirebaseDb,  `${ uid }/journal/notes/${ note.id }`);

        //creamos los cambios usando setDoc de Firestore le mandamos como primer parametro la referencia completa
        //incluyendo el id del objeto a modificar, como segundo parametro el noteToFireStore que incluye la nota exceptuando
        //el id para ya que no es un elmento propio del objeto y por ultimo con el tercer parametro
        //merge: true hacemos que si los campos que mandamos no existian en el original, se mantienen los del original
        await setDoc(docRef, noteToFireStore, { merge: true});
        
        //llamamos al metodo del journalSlice.js para que modifique la nota actualizada dentro del array de notas
        dispatch( updateNote ( note )); 
    }
}

export const startUpLoadingFiles = ( files = [] ) => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() ); //llamamos a setSaving de journalSlice

        //usamos el archivo fileUpload.js creado en la carpeta helpers para hacer la peticion POST
        //a cloudinary para almacenar las imagenes seleccionadas, mandandoselas por argumento a la funcion
        //await fileUpload(files[0]);

        //cremos un array  de todos las promesas  que tenemos que cargar
        const fileUploadPromises = [];

        //usamos un forof para iterar todas las promesas(imagenes) que incluiremos en el archivo creado arriba fileUploadPromises
        //usando el metodo fileUpload del archivo fileUpload.js
        //simplemente creamos el arreglo de promesas no las estamos disparando, simplemente las alamcenamos
        for (const file of files) {
            fileUploadPromises.push( fileUpload(file) );
        }

        //usamos el metodo Promise de javaScript que espera el arreglo de Promesas
        //cuando resuelve obtendremos un nuevo arreglo con cada una de las resoluciones
        //de las promesas en un mismo orden, esto lo hacemos para que se haga la peticion de todas
        //las imagenes a la vez
        const  photosUrls = await Promise.all( fileUploadPromises)

        //almacenamos estos urls de las imagenes obtenidas de cloudinary en el metodo
        //setPhotosToActiveNote del arichivo journalSlice.js pasandole por parametro
        //la constante photosUrls con los links de las imagenes cargadas a cloudinary
        dispatch( setPhotosToActiveNote(photosUrls) );
    }
}