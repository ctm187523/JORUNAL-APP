//este funtional component se muestra en el centro cuando hay algo seleccionado

import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"

export const NoteView = () => {
    return (
       <Grid container direction='rox' justifyContent='space-between' alignItems='center' sx={{ mb:1 }}>
           <Grid item>
               <Typography fontSize={ 39} fontWeight='light' >28 agosto 2022</Typography>
           </Grid>
           <Grid item>
               <Button color="primary" sx={{ padding: 2 }}>
                   {/* usamos el icono de guardar(diskette) */}
                   <SaveOutlined sx={{ fontSize:30, mr:1 }}/>
                   Guardar
               </Button>
           </Grid>
           <Grid container>
               <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Titulo"
                sx={{ border: 'none', mb: 1 }}
               />

                <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedió hoy?"
                minRows= { 5 }
               />
           </Grid>

           {/* Galeria de imagenes , usamos el componete ImageGallery.jsx*/}
           <ImageGallery />

       </Grid>
    )
}
