import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useRouteError,
} from 'react-router-dom'
import './App.css'
import Albums, { loader as albumsLoader } from './routes/Albums'
import Users, { loader as usersLoader } from './routes/Users'
import User, { loader as userLoader } from './routes/User'
import Layout from './routes/Layout'
import Album, { loader as albumLoader } from './routes/Album'
import { Typography } from '@mui/material'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        loader: usersLoader,
        element: <Users />,
      },
      {
        path: '/users',
        loader: usersLoader,
        element: <Users />,
      },
      {
        path: '/users/:id',
        loader: userLoader,
        element: <User />,
      },
      {
        path: '/albums',
        loader: albumsLoader,
        element: <Albums />,
      },
      {
        path: '/albums/:id',
        loader: albumLoader,
        element: <Album />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">404</Typography>
        <Typography variant="h3">Page not found</Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1em',
          }}
        >
          <Typography variant="h5">Try this </Typography>
          <Link to={'/users/'}>
            <Typography variant="h5" style={{ color: 'black' }}>
              Users
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  )
}
