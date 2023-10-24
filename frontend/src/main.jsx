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
import SearchScreen from './screens/SearchScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import DashboardScreen from './screens/DashboardScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route index={true} path='/search' element={<SearchScreen />} />
      <Route index={true} path='/login' element={<LoginScreen />} />
      <Route index={true} path='/dashboard' element={<DashboardScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
