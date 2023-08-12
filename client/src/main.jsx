import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './Imported.css'
import { MyContextProvider } from './Context/MyContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MyContextProvider>,
)
