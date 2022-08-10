//este funtional component se muestra en el centro cuando hay algo seleccionado

import { SaveOutlined, UploadFileOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import Swal from "sweetalert2"
//importamos el estilo para el sweetalert2 manualmente
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startSaveNote, startUpLoadingFiles } from "../../store/journal/thunks"
import { ImageGallery } from "../components"


export const NoteView = () => {

    //usamos el useDispatch para usar los metodos del store.js
    const dispatch = useDispatch();

    //importamos useSelector de React-Redux para poder acceder al store.js
    //y usar el atributo active donde tenemos la nota activa en pantalla en ese momento
    //le cambiamos el nombre de active a note con active:note
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);

    //importamos el Custom Hook useForm que creamos en anteriores videos y ahora modificado con mas funcionalidades
    //como estado inical ponemos la variable note creada arriba, desestructuramos, onInputChange y formState son metodos del custom Hook useForm
    //si pulsamos otra nota al cambiar el contenido del note, hemos implementado en el customHook useForm un useEffect linea 24
    //para cuando cambie el estado inicial(el note) dispare el useEffect y cambie el estado al estado del note actual modificando los valores a los valores de la nota que corresponde

    const { body, title, date, onInputChange, formState } = useForm(note);

    //usamos el Hook de React useMemo con la dependencia el date, para formatear la fecha
    const dateString = useMemo(() => {

        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    //usamos el hook de react userRef, este mantendra la referencia html a la etiqueta input de abajo
    const fileInputRef = useRef();

    //utilizamos el Hook de React useEffect y como dependencia ponemos el formState,
    //para que cuando cualquier propiedad de este cambie haremos el dispatch de setActiveNote()
    //y actualizamos al formState actual
    useEffect(() => {

        dispatch(setActiveNote(formState));
    }, [formState]);

    //usamos useEffect de React para cuando se detecte un cambio en la propiedad  messageSaved de la nota
    //se dispare un alert mostrando que la nota ha sido modificada, para ello hemos desacargado de la pagina
    //sweetalert2 y instalado con yarn add sweetalert2
    useEffect(() => {

        //disparamos el alert si el messageSaved no es nulo, mayor que 0
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success') //usamos lo instaldo de sweetalert2,success es el icono
        }

    }, [messageSaved])


    const onSaveNote = () => {
        dispatch(startSaveNote()); //llamamos a la funcion startSaveNote del archivo thunks.js para grabar los cambios de una nota
    }

    //metodo para cargar las imagenes seleccionadas al ser pulsado el boton de cargar imagenes
    const onFileInputChange = ( { target }) => {
        
        //comprobamos si hay imagenes cargadas
        if( target.files === 0 ) return;

        //llamamos al metodo startUpLoadingFiles creado en store/journal/thunks para que se encargue de la
        //carga de archivos en cloudinary pasando como parametro los archivos seleccionados target.files
        dispatch( startUpLoadingFiles( target.files) ); 
    }

    return (
        <Grid
            container
            direction='rox'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
            // ponemos una animacion
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>

                {/* usamos la etiqueta input tradicional usamos el type file para que nos aparezca
                el boton para elegir un archivo del ordenador podemos poner otros tipos como text,
                check-box etc, con la propiedad multiple podemos seleccionar varias imagenes a la vez 
                hacemos referencia al hook de React useRef creado arriba fileInputRef, con esto hacemos una referencia
                al IconButton creado justo abajo y de esta manera aunque el input no aparece hace la funcion a traves del IconButton
                ya que en el icon buton llamamos al fileInputRef que es el hook useRef y le damos la funcionalidad del click
                luego llamamso a la funcion que se encarga de cargar las imagenes creada arriba onFileInputChange
                finalmente ponemos el display en none para que no aparezca*/}
                <input
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange= { onFileInputChange }
                    style= {{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled= { isSaving }
                    onClick= { ()=> fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>
                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}
                >
                    {/* usamos el icono de guardar(diskette) */}
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
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
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedió hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            {/* mandamos la galeria de imagenes que tenemos cargadas en note.imageUrls(notes es el atributo active de journlaSlice)
            le pasamos estas imagenes al componente ImageGallery como prop*/}
            <ImageGallery images={ note.imageUrls} />

        </Grid>
    )
}
