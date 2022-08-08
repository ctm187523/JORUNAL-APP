import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDb } from "../firebase/config";

// esta funcion la llamamos en store/journal/thunks.js
export const loadNotes = async ( uid = '' ) => {

     //ponemos una condicion que si el uid del usuario no existe mandamos un error
     if ( !uid ) throw new Error('El UID del usuario no existe');

     //usamos la funcion collection de Firebase para hacer referencia a todas las notas del usuario loggeado
     //como primer parametro ponemos la configuracion FirebaseDb de config.js
     //como segundo parametro el uid del usuario concatenado con la ubicacion en Firebase en un template
    const collectionRef = collection( FirebaseDb,  `${ uid }/journal/notes`);

    //usamos la constante creada arriba para con el metodo getDocs de Firestore traernos las notas
    const docs = await getDocs(collectionRef);

    //con la informacion obtenida hacemos un forEach y obtenemos la funcion data(con los datos de las notas)
    //para ello primeramente creamos una constante notes que sera un array donde en el
    //almacenaremos el id y la data(haciendo un spread para esparcir toda la informacion)
    const notes = [];
    docs.forEach( doc => {
        notes.push({  id: doc.id, ...doc.data()});
    });
    return notes;
}