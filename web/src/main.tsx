import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RedirectPage from './RedirectPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/redirect/:shortUrl",
    element: <RedirectPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
