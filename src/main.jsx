import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import {EmployeeProvider} from "./context/EmployeeContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmployeeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EmployeeProvider>
  </StrictMode>,
)
