import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import HomePage from './pages/home'
import RegisterPage from './pages/register'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="" element={<HomePage />} />
    <Route path="/register" element={<RegisterPage />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
