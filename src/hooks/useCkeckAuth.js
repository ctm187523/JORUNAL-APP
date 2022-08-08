import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logOut } from "../store/auth";
import { startLoadingNotes } from "../store/journal";


//creamos un custom hook para usarlo en AppRouter.jsx
export const useCkeckAuth = () => {

    //usamos useSelector para poder traer del store el authSlice y 
    //obtener el status para comprovar su estado 
    const { status } = useSelector(state => state.auth);

    //usamos el useDispatch para poder usar los metodos del authSlice
    const dispatch = useDispatch();

    //usamos el Hook de Reatc useEffect, esto nos permite tambien que al recargar el navegador
    //se mantenga el usuario que estaba autenticado
    useEffect(() => {

        //usamos la funcion de Firebase onAuthStateChanged que es una funcion que
        //esta pendiente de los cambios de estado de la autenticacion le pasamos
        //por parametro el FirebaseAuth del archivo firebase/config, retorna un observable
        //cuando la autenticacion cambia esta funcion se vuelve a disparar
        //como segundo parametro ponemos el callback que es la funcion que queremos ejecutar
        //caundo esta funcion reciba un cambio en la autenticacion
        onAuthStateChanged(FirebaseAuth, async (user) => {

            //preguntamos si no hay un usuario, en ese caso llamaos al logout del archivo authSlice
            if (!user) return dispatch(logOut());

            //en caso contrario llamamos al login de authSlice, antes desestructurando el user
            const { uid, email, displayName, photoUrl } = user;
            dispatch(login({ uid, email, displayName, photoUrl }));

            //llamamos a la funcion startLoadingNotes de journal/thunks para cargar las notas del usuario loggeado de firestore
            dispatch( startLoadingNotes());
        })

    }, []);

    //retorna el estatus donde podemos saber el estado de la autenticacion
    return status;
}
