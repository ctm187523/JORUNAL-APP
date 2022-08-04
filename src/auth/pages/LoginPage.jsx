import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link } from '@mui/material';
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth/thunks';


export const LoginPage = () => {

    //usamos useDispatch de react-reduc para poder utilizar los metodos 
    const dispatch = useDispatch();

    //usamos el custom Hook que creamos en videos anteriores useForm
    const { email, password, onInputChange } = useForm({
        email:'Pepe@gmail.com',
        password: '123456'
    });

    //metodo para autenticar los datos introducidos en el login
    const onSubmit = ( event ) => {
        event.preventDefault();
        console.log( {email, password} );

        dispatch ( checkingAuthentication() );
        
    }

    //funcion para validar el login con google
    const onGoogleSignIn = () => {
        console.log('onGoogleSign');

        dispatch ( startGoogleSignIn () );
      
    }

    return (

        //usamos el componente AuthLayout que contiene codigo comun para las interfaces
        <AuthLayout title="Login">

            <form onSubmit= { onSubmit }>
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
                            value={ email }
                            //llamamos a la funcion onInputChange del CustomHook useFrom
                            onChange= { onInputChange }

                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder='contraseña'
                            fullWidth
                            name="password"
                            value={ password }
                            //llamamos a la funcion onInputChange del CustomHook useFrom
                            onChange= { onInputChange }
                        />
                    </Grid>

                    {/* aqui le decimos que para espacios pequeños(xs) ocupe los 12 espacios 
                        y para no tan pequeños(sm) ocupe 6 en espacios no tan pequeños saldra un boton al lado del otro
                        y en espacios pequeños uno de bajo del otro*/}
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button type="submit" variant='contained' fullWidth>
                                Login
                                </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button onClick={ onGoogleSignIn } variant='contained' fullWidth>
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
