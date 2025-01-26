import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UpdateUser from './components/UpdateUser/UpdateUser'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UpdateUser/>
  </StrictMode>,
)
