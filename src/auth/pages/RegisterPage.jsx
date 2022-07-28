import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link } from '@mui/material';
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout';


export const RegisterPage = () => {
    return (

        //usamos el componente AuthLayout que contiene codigo comun para las interfaces
        <AuthLayout title="Crear cuenta">

            <form>
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
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder='correo@google.com'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder='contraseña'
                            fullWidth
                        />
                    </Grid>

                    {/* aqui le decimos que para espacios pequeños(xs) ocupe los 12 espacios 
                      */}
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12}>
                            <Button variant='contained' fullWidth>
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
