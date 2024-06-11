import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DateResult } from './components/DateResult/DateResult';
import { DayDetail } from './components/DayDetail/DayDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/trip/:id',
    element: <DateResult />,
  },
  {
    path: '/trip/:tripId/day/:date',
    element: <DayDetail />,
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />,
);
