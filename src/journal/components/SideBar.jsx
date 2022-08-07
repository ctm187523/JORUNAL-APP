import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"


export const SideBar = ({ drawerWidth = 240 }) => {

    //usamos useSelector para poder acceder a las variables del archivo authSlice mediante el store.js
    const { displayName  } = useSelector(state => state.auth)

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
                        ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text =>

                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={ text } />
                                        <ListItemText secondary={ 'esto es un ejemplo solo para que se vea algo'} />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        )
                    }

                </List>

            </Drawer>

        </Box>
    )
}
