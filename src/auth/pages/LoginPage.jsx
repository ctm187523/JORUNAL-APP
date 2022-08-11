import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';


const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    //usamos useSelector de React-redux para obtener el state el estado actual del objeto
    //usamos el state.auth del store ver linea  9 del archivo store.js y obtenemos desarializando
    //el status para ver el estado si esta autenticado o no 
    const { status, errorMessage } = useSelector(state => state.auth)

    //usamos useDispatch de react-reduc para poder utilizar los metodos 
    const dispatch = useDispatch();

    //usamos el custom Hook que creamos en videos anteriores useForm, usamos la constante formData creada arriba en la linea 10
    const { email, password, onInputChange } = useForm(formData);

    //usamos el Hook useMemo de React para memorizar el resultado del status obtenido en la linea 21
    //comprovamos mediante un booleano si el estatus es checking,la dependencia sera el status
    //para que si el status cambia obtenga el nuevo valor
    const isAuthenticated = useMemo(() => status === 'checking', [status])

    //metodo para autenticar los datos introducidos en el login
    const onSubmit = (event) => {
        event.preventDefault();

        //llamamos al metodo startLoginWithEmailPassword del archivo thunks.js pasandole el email y el password
        dispatch(startLoginWithEmailPassword({ email, password }));

    }

    //funcion para validar el login con google
    const onGoogleSignIn = () => {
        console.log('onGoogleSign');

        //llamamos al metodo startGoogleSignIn para autenticarnos con google del archivo thunks.js pasandole el email y el password
        dispatch(startGoogleSignIn());

    }

    return (

        //usamos el componente AuthLayout que contiene codigo comun para las interfaces
        <AuthLayout title="Login">

            <form
                onSubmit={onSubmit}
                // ponemos una animacion
                className='animate__animated animate__fadeIn animate__faster'
            >
                <Grid container>
                    {/* con xs={ 12 } decimos que en pantalla pequeña tome las 12 posiciones osea todo como en bootstrap el total son 12 posiciones 
                        mt:2 es margin top de 2*/}
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder='correo@google.com'
                            fullWidth
                            name="email"
                            value={email}
                            //llamamos a la funcion onInputChange del CustomHook useFrom
                            onChange={onInputChange}

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
                            //llamamos a la funcion onInputChange del CustomHook useFrom
                            onChange={onInputChange}
                        />
                    </Grid>

                    {/* creamos un nuevo Grid para crear una alerta en caso de que no funcione la autenticacion    */}
                    <Grid
                        container
                        // con la propiedad displayName le decimos que solo se muestre el Alert
                        //usando la doble negacion para que se convierta en booleano si no hay nada
                        //el display sera un estring vacio en caso contrario sera none y en css display none se usa
                        //para que no se muestre
                        display={!!errorMessage ? '' : 'none'}
                        sx={{ mt: 1 }}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            {/* usamos el componente de material Alert para que muestre el errorMessage*/}
                            <Alert severity='error'> {errorMessage} </Alert>
                        </Grid>

                    </Grid>

                    {/* aqui le decimos que para espacios pequeños(xs) ocupe los 12 espacios 
                        y para no tan pequeños(sm) ocupe 6 en espacios no tan pequeños saldra un boton al lado del otro
                        y en espacios pequeños uno de bajo del otro*/}
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                // usamos la variable isAuthenticated creada en la linea 30 para desabilitar el boton en caso de que este en checking
                                disabled={isAuthenticated}
                                type="submit"
                                variant='contained'
                                fullWidth>
                                Login
                                </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                // usamos la variable isAuthenticated creada en la linea 30 para desabilitar el boton en caso de que este en checking
                                disabled={isAuthenticated}
                                onClick={onGoogleSignIn}
                                variant='contained'
                                fullWidth>
                                {/* ponemos el icono de google y con Typography ponemos google 
                                    con un margin left de 1*/}
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>

                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        {/* usamos la etiqueta Link de react-router-dom(linea 1) y el Link de Material UI(linea 2)
                            donde decimos que herede el color 
                            y al pulsarlo se dirija al comopoente register*/}
                        <Link component={RouterLink} color='inherit' to="/auth/register">
                            crear una cuenta
                             </Link>

                    </Grid>

                </Grid>

            </form>

        </AuthLayout>

    )
}
