import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Page imports
import Root from "./pages/index";
import Movies from './pages/Movies';


/**
 * Routing object that defines all pages
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'movies',
        element: <Movies />
      },
      {
        path: 'series'
      },
      {
        path: 'favourites'
      }
    ]
  }
]);

/**
 * Main react script
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
