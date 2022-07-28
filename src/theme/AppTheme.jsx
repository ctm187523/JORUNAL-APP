
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { purpleTheme } from './purpleTheme';

export const AppTheme = ({ children }) => { //creamos con el children un high Order component, un componente que tendra otro componente
    return (
        // usamos material UI(MUI) con ThemeProvider hemos puesto como tema(theme) el archivo creado por nosotros purpleTheme.js en la carpeta theme
        <ThemeProvider theme={purpleTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            { children}
        </ThemeProvider>
    )
}
