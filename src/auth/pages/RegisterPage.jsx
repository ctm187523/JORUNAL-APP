import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';

//constante para enviar al useForm de abajo como initialState
const formData = {
    email: 'Pepe@gmail.com',
    password: '123456',
    displayName: 'Pepe Gotera'
}

//creamos un objeto para validar la entrada de datos del registro
//este objeto se lo mandaremos al useForm como determinar si los datos 
//introducidos son correctos, creamos un array en cada validacion donde el
//primer elemento es la validacion y el segundo el mensaje de error
//pasamos el formValidations como segundo argumento del useForm
//hemos modificado el useForm original
const formValidations = {
    email: [ (value) => value.includes('@'), 'El email debe de tener una arroba'],
    password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
    displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio'],

}

export const RegisterPage = () => {

    //usamos el custom Hook que creamos en videos anteriores useForm
    const { 
        displayName, email, password, onInputChange, formState,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(formState)
    }
    return (

        //usamos el componente AuthLayout que contiene codigo comun para las interfaces
        <AuthLayout title="Crear cuenta">

            <form onSubmit={onSubmit}>
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
                            error= { !displayNameValid }
                            helperText={ displayNameValid }
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
                        />
                    </Grid>

                    {/* aqui le decimos que para espacios pequeños(xs) ocupe los 12 espacios 
                      */}
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12}>
                            <Button
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
