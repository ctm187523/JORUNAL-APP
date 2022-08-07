import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';



//constante para enviar al useForm de abajo como initialState
const formData = {
    email: '',
    password: '',
    displayName: ''
}

//creamos un objeto para validar la entrada de datos del registro
//este objeto se lo mandaremos al useForm como determinar si los datos 
//introducidos son correctos, creamos un array en cada validacion donde el
//primer elemento es la validacion y el segundo el mensaje de error
//pasamos el formValidations como segundo argumento del useForm
//hemos modificado el useForm original, en las validaciones podemos hacerlas tan complejas como queramos incluso usando expresiones regulares
const formValidations = {
    email: [(value) => value.includes('@'), 'El email debe de tener una arroba'],
    password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],

}

export const RegisterPage = () => {

    //creamos la constante dispatch para usar el metodo useDispatch de React-Redux y poder 
    //acceder a los metodos del authSlice.js introducido en el store.js
    const dispatch = useDispatch();

    //usamos el Hook de React useState para que la empezar de cero el registro
    //y los campos esten vacios no muestre de inicio los errores
    const [formSubmitted, setformSubmitted] = useState(false)

    //usamos el Hook de React useSelector, useSelector es un Hook que nos permite extraer datos del store de Redux utilizando una función selectora
    const { status, errorMessage } = useSelector(state => state.auth);

    //usamos el Hook de React useMemo y memorizamos el estatus para verificar que esta en checking
    //y la dependencia va a ser el status
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);


    //usamos el custom Hook que creamos en videos anteriores useForm modificandolo
    const {
        displayName, email, password, onInputChange, formState,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        setformSubmitted(true); //hasta que no se postea el formulario formSubmitted esta en false ver linea 31

        if (!isFormValid) return; //comrpovamos si isFormValid del customHook use form es no valido, si no es valido que se salga del metodo
        //usamos la constante dispatch creada en linea 10 y como parametro mandamos la funcion startCreatingUserWithEmailPassword del archivo thunks.js
        //pasandole por parametro el formState del Custom Hook useForm
        dispatch(startCreatingUserWithEmailPassword(formState));
    }


    return (

        //usamos el componente AuthLayout que contiene codigo comun para las interfaces
        <AuthLayout title="Crear cuenta">

            {/* usamos el valor obtenido isFormValid del custom Hook useForm linea 30, lo comentamos solo era de prueba */}
            {/* <h1>FormValid: { isFormValid ? 'Valido': 'Incorrecto'}</h1> */}

            <form
                onSubmit={onSubmit}
                // ponemos una animacion
                className='animate__animated animate__fadeIn animate__faster'
            >
                <Grid container>
                    {/* con xs={ 12 } decimos que en pantalla pequeña tome las 12 posiciones osea todo como en bootstrap el total son 12 posiciones 
                        mt:2 es margin top de 2*/}
                    {/* con xs={ 12 } decimos que en pantalla pequeña tome las 12 posiciones osea todo como en bootstrap el total son 12 posiciones 
                        mt:2 es margin top de 2*/}
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder='Nombre completo'
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            //usamos material UI para usar error, en rojo en caso de error si la variable displayNameValid es false
                            //y helperText en caso de error sale una texto de ayuda con un mensaje personalizado
                            //usamos las dos admiraciones !! par comvertirlo en un valor booleano, mostramos el error si el displayName es valido
                            //le decimos que se dispare solo si formSubmitted es true que es despues de ser posteado y no muestre de inicio los mensajes de error con los campo vacios
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder='correo@google.com'
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            //usamos material UI para usar error, en rojo en caso de error si la variable displayNameValid es false
                            //y helperText en caso de error sale una texto de ayuda con un mensaje personalizado
                            //usamos las dos admiraciones !! par comvertirlo en un valor booleano, mostramos el error si el displayName es valido
                            //le decimos que se dispare solo si formSubmitted es true que es despues de ser posteado y no muestre de inicio los mensajes de error con los campo vacios
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder='contraseña'
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            //usamos material UI para usar error, en rojo en caso de error si la variable displayNameValid es false
                            //y helperText en caso de error sale una texto de ayuda con un mensaje personalizado
                            //usamos las dos admiraciones !! par comvertirlo en un valor booleano, mostramos el error si el displayName es valido
                            //le decimos que se dispare solo si formSubmitted es true que es despues de ser posteado y no muestre de inicio los mensajes de error con los campo vacios
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    {/* aqui le decimos que para espacios pequeños(xs) ocupe los 12 espacios 
                      */}
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

                        <Grid
                            item
                            xs={12}
                            // con la propiedad displayName le decimos que solo se muestre el Alert
                            //usando la doble negacion para que se convierta en booleano si no hay nada
                            //el display sera un estring vacio en caso contrario sera none y en css display none se usa
                            //para que no se muestre
                            display={!!errorMessage ? '' : 'none'}
                        >
                            {/* usamos el componente de material Alert para que muestre el errorMessage*/}
                            <Alert severity='error'> {errorMessage} </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                //desabilitamos el boton si esta realizando la utenticacion liena 46 creamos la constante isCheckingAuthentication
                                disabled={isCheckingAuthentication}
                                type="submit"
                                variant='contained'
                                fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        {/* usamos la etiqueta Link de react-router-dom(linea 1) y el Link de Material UI(linea 2)
                            donde decimos que herede el color 
                            y al pulsarlo se dirija al comopoente register*/}
                        <Link component={RouterLink} color='inherit' to="/auth/login">
                            ingresar
                        </Link>

                    </Grid>

                </Grid>

            </form>

        </AuthLayout>

    )
}
