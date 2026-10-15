import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AvatarPreview from './AvatarPreview.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {new URLSearchParams(location.search).has('avatar') ? <AvatarPreview /> : <App />}
  </StrictMode>,
)
