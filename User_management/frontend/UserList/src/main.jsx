import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Users from './components/Home/Users'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Users/>
  </StrictMode>,
)
