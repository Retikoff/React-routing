import { Typography } from '@mui/material'
import { Link, useLoaderData } from 'react-router-dom'

export const loader = async () => {
  const users = await fetch('https://jsonplaceholder.typicode.com/users').then(
    (response) => response.json()
  )
  return { users }
}

export default function Users() {
  const { users } = useLoaderData()

  return (
    <>
      <div>
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            style={{ color: 'black' }}
          >
            <Typography variant="subtitle1">{user.name}</Typography>
          </Link>
        ))}
      </div>
    </>
  )
}
