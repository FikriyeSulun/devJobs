import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Detail from './pages/Detail.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'Jobs/:id',
        element: <Detail/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
