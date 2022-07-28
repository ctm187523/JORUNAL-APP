import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"

export const JournalApp = () => {
    return (
        //usamos el componente AppTheme de la carpeta theme para usar material UI, al envolverlo afecta a todos los componentes contenidos
        <AppTheme>
             <AppRouter />
        </AppTheme>
           
        
    )
}
