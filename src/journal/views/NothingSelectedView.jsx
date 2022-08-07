
//este functional component contenido en la carpeta views, las vistas hacen referencia
//a lo que esta en el centro no es ni el NavBar ni el SideBar, se muestra cuando no hay
//nada seleccionado

import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
    return (


        //usamos material UI para el diseño, Grid es como un div pero con otras propiedades
        //en el atributo sx(lo que seria styles) usamos el backgroundcolor primary.main especifiado en purpleT heme.js de la carpeta theme
        <Grid
            // ponemos una animacion
            className='animate__animated animate__fadeIn animate__faster'
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3 }}
        >
            <Grid item xs={12}>
                {/* usamos el icono StartOutlined */}
                <StarOutline sx={{ fontSize: 100, color: 'white' }} />
            </Grid>
            <Grid item xs={12}>
                {/* usamos el icono StartOutlined */}
                <Typography variant='h5' color='white'>Selecciona o crea una entrada</Typography>
            </Grid>

        </Grid>
    )
}
