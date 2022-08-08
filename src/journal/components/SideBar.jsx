import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";


export const SideBar = ({ drawerWidth = 240 }) => {

    //usamos useSelector para poder acceder a las variables del archivo authSlice mediante el store.js
    const { displayName  } = useSelector(state => state.auth);

     //usamos useSelector para poder acceder a las variables del archivo journalSlice mediante el store.js
     //seleccionamos las notas para que se muestren en el menu lateral
     const { notes } = useSelector(state => state.journal);

    return (

        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open={true}
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}>

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>{ displayName }</Typography>
                </Toolbar>
                <Divider />

                {/* Usamos List de material Ui */}
                <List>
                    {
                        //recorremos las notas obtenidas en la linea 13, usamos
                        //el componente creado SideBarItem para mostrar las notas en el menu lateral
                        //le pasamos la prop de note con un spread para esparcir todas sus varaibles
                        notes.map(note =>
                           <SideBarItem key={note.id} {...note}/>
                        )
                    }

                </List>

            </Drawer>

        </Box>
    )
}
