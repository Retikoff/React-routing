import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'
import { Typography } from '@mui/material'

export default function Layout() {
  return (
    <>
      <header style={{ display: 'flex', gap: '1rem' }}>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? 'link-active' : 'link-default'
          }
        >
          <Typography variant="h5">Users</Typography>
        </NavLink>
        <NavLink
          to="/albums"
          end={true}
          className={({ isActive }) =>
            isActive ? 'link-active' : 'link-default'
          }
        >
          <Typography variant="h5">Albums</Typography>
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
