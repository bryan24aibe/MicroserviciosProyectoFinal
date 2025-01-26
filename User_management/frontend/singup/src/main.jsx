import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Singup from './components/Singup/Singup'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Singup/>
  </StrictMode>,
)
