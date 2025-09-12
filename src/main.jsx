import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './variables.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import "./fonts/Nunito-VariableFont_wght.ttf"
import "./fonts/Nunito-Italic-VariableFont_wght.ttf"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
