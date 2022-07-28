import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"


export const NavBar = ({ drawerWidth = 240 }) => {
    return (

        // usamos AppBar de material ui
        <AppBar
            position='fixed'
            sx={{
                // en pantallas pequeñas decimos que el ancho del Navbar sera el 100% del ancho 
                //menos la medida recibida por props que sera reservada para el ancho del SideBar
                //ml es margin left que en pantallas pequeñas solo haya una separacion del drawerWidth
                //en resumen en pantallas pequeñas no deja el espacio para el SideBar ya que puede salir
                //con un menu(toggle) y en pantallas mas grandes deja el espacio para el sideBar
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            {/* usamos ToolBar de material ui */}
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    // hacemos con display: { sm: 'none' } que el boton solo aparezca en pantallas pequeñas
                    sx={{ mr: 2, display: { sm: 'none' } }}>
                    <MenuOutlined />
                </IconButton>

                <Grid
                    container
                    direction='row'
                    justifyContent='space-between' alignItems='center'>
                        <Typography variant='h6' noWrap component='div'> JournalApp</Typography>
                        <IconButton color='error'>
                            <LogoutOutlined />
                        </IconButton>

                </Grid>
            </Toolbar>
        </AppBar>

    )
}
