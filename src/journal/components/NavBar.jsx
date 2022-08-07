import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth/thunks";


export const NavBar = ({ drawerWidth = 240 }) => {

    //importamos la funcion useDispatch de Reax_redux para poder acceder a los metodos del authSlice.js mediante el store.js
    const dispatch = useDispatch();

    //funcion para realizar el logout
    const onLogout = () => {
        //mediante la constante dispatch obtenida en linea 10 llamamos al metodo startLogout
        //del archivo thunks.js para que el usuario pueda hacer logout
        dispatch( startLogout() );
    }

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
                    <IconButton
                        color='error'
                        onClick= { onLogout }
                        >
                        <LogoutOutlined />
                    </IconButton>

                </Grid>
            </Toolbar>
        </AppBar>

    )
}
