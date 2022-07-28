import { Box, Divider, Drawer, Toolbar, Typography } from "@mui/material"


export const SideBar = ({ drawerWidth = 240 }) => {
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
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
                }}>

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>Clemente Tiñena</Typography>
                </Toolbar>
                <Divider />

            </Drawer>

        </Box>
    )
}
