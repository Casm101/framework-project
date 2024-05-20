// Module imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Page imports
import Root from "./pages/index";
import Movies from './pages/Movies';
import Series from './pages/Series';
import Anime from './pages/Anime';

// Global style imports
import './styles/global.scss';


/**
 * Routing object that defines all pages
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Movies />
      },
      {
        path: 'tv-series',
        element: <Series />
      },
      {
        path: 'anime',
        element: <Anime />
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
