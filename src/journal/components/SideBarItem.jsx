import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"


export const SideBarItem = ({ title= '', body, id, date, imageUrls= [] }) => {

    //importamos useDispatch para poder haceder a los metodos del store.js
    const dispatch = useDispatch();

    //creamos una funcion para que al pulsar una nota de la barra lateral la marque como activa
    //le pasamos como payload todos las variables de las notas
    const onClickNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls} ));
    }

    //usamos el Hook de React useMemo para evitar que el titulo si es muy largo
    //no pase de una sola linea, como dependencia ponemos al title, si el titulo cambia
    //ponemos un nuevo titulo, en la condicion ponemos que si es mayot que 17 ponemos
    //solo las 17 letras y le concatenamos 3 puntos suspensivos
    const newTitle = useMemo( ()=> {
        return title.length > 17
            ? title.substring(0,17) + '...'
            :  title
    },[ title ])

    return (
        <ListItem disablePadding>
            <ListItemButton onClick= { onClickNote }>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
