
//ponemos en este funcional component lo que queremos reutilizar para luego usarlo en 
//otros componentes, desestructuramos los children que usaran este AuthLayout
//y recibimos un parametro que sera el titulo en caso de que no venga es un String vacio
//lo usamos en los componetes LoginPage y RegisterPage

import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = ''}) => {
    return (


        //usamos material UI para el diseño, Grid es como un div pero con otras propiedades
        //en el atributo sx(lo que seria styles) usamos el backgroundcolor primary.main especifiado en purpleT heme.js de la carpeta theme
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >

            {/* Creamos otro Grid dentro del Gird principal
             el box-shadow(para sombrear la caja) lo especificamos en styles.css 
             con xs= {3} decimos que en pantallas pequeñas tendra 3 posiciones */}
            <Grid item
                className='box-shadow'
                xs={3}
                sx={{ 
                    // en pantallas medianas el contenedor blanco tendra 450 pixeles
                    width: { md: 450},
                    backgroundColor: 'white', 
                    padding: 3, 
                    borderRadius: 2 }}
            >

                <Typography variant='h5' sx={{ mb: 1 }}>{ title }</Typography>

                {/* Aqui iran los children del AuthLayout */}
                { children }

            </Grid>
        </Grid>

    )
}
