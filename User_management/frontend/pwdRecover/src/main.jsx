import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PwdRec from './components/Login/PwdRec'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PwdRec/>
  </StrictMode>,
)
