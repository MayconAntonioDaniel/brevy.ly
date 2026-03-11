import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RedirectPage from './RedirectPage.tsx'
import NotFound from './NotFoud.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/redirect/:shortUrl",
    element: <RedirectPage />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
