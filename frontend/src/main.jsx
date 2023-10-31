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
import DashboardScreen from './screens/DashboardScreen.jsx'
import TracksScreen from './screens/TracksScreen.jsx'
import ArtistsScreen from './screens/ArtistsScreen.jsx'

import ErrorScreen from './screens/ErrorScreen.jsx'

// add routes, we can use local storage to enable navigation and redirect if fails

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} errorElement={<ErrorScreen />} />
      <Route index={true} path='/dashboard' element={<DashboardScreen />} errorElement={<ErrorScreen />} />
      <Route index={true} path='/tracks' element={<TracksScreen />} errorElement={<ErrorScreen />} />
      <Route index={true} path='/artists' element={<ArtistsScreen />} errorElement={<ErrorScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
