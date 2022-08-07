
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCkeckAuth } from "../hooks"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/"

export const AppRouter = () => {

   //usamos el custom hook creamos por nosotros useCkeckAuth para 
   //conocer el estado(status) de la autenticacion
   const status = useCkeckAuth();

    //si el status esta en checking retornamos el componente CheckingAuth 
    //para que muestre el circulo de carga
    if( status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>

            {/* si estamos autenticados mostramos el componente <JournalRoutes/>
            en caso contrario mostramos el <AuthRoutes/> */}
            {
                (status === 'authenticated')
                ?  <Route path="/*" element= { <JournalRoutes />}/>
                :  <Route path="/auth/*" element= { <AuthRoutes />}/>
            }

            {/* en caso de encontrarnos en otra ruta ponemos una ruta por defecto , el login*/}
            <Route path='/*' element= { <Navigate to='/auth/login' />} />

        </Routes>
    )
}
