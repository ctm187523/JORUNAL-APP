import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { JournalApp } from './JournalApp'
import { store } from './store'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* creamos el provider para usar redux y como parametro le pasamos el store.js creado*/}
    <Provider store={ store }>
      {/* creamos el BrowserRouter para usar las rutas de navegacion */}
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
