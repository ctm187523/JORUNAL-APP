
//codigo copiado de Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVH_nIyp10sqDy32_nnFtjytJBDiRSkMQ",
  authDomain: "react-cursos-ce84a.firebaseapp.com",
  projectId: "react-cursos-ce84a",
  storageBucket: "react-cursos-ce84a.appspot.com",
  messagingSenderId: "350551085973",
  appId: "1:350551085973:web:0b8f9686c47f3641ba9c9c"
};

// Initialize Firebase, importamos de Firebase initializeAppp
export const FirebaseApp = initializeApp(firebaseConfig);

//importamos getAuth de firebase/auth para la autenticacion
export const FirebaseAuth = getAuth ( FirebaseApp );

//importamos getFirestore de Firestore para la configuracion de la base de datos
export const FirebaseDb = getFirestore ( FirebaseApp );
