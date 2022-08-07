//pantalla de carga

import { CircularProgress, Grid } from "@mui/material"

export const CheckingAuth = () => {
    return (

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >

            <Grid container
                direction='row'
                justifyContent='center'
                >
                    {/* creamos un circulo de progreso de carga con material UI */}
                    <CircularProgress color='warning'/>
            </Grid>

        </Grid>

    )
}
