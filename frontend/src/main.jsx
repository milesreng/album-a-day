import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
 } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import HomeScreen from './screens/HomeScreen.jsx'
import WrappedScreen from './screens/WrappedScreen.jsx'
import ErrorScreen from './screens/ErrorScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route index={true} path='/dashboard' element={<WrappedScreen />} errorElement={<ErrorScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
