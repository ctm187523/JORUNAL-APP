import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { NavBar, SideBar } from "../components";


//le damos al componente lateral(SideBar) una medida de 240 pixeles
const drawerWidth = 240;

export const JournalLayout = ( { children } ) => {
    return (
        <Box sx={{ display: 'flex' }}>

            {/* Importamos el componente creado por nosotros Navbar y usamos la medida drawerwidth de la linea 5
            para pasarsela comor prop al Navbar para el ancho reservado para el Sidebar*/}
            <NavBar drawerWidth={ drawerWidth }/>

            {/* cargamos el Sidebar y pasamos como prop el drawerWidth */}

            <SideBar drawerWidth={ drawerWidth } />

            <Box
                component='main'
                // p es el padding del centro con el Navbar y el Sidebar
                sx={{ flexGrow: 1, p: 3 }}
            >

                {/* Mostramos el componente Toolbar de Material UI */}
               <Toolbar />

                {/* aqui renderizamos los hijos de este componente JournalLayout */}

                { children }

            </Box>
        </Box>
    )
}
