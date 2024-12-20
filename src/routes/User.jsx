import { useLoaderData, Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export const loader = async ({ params: { id } }) => {
  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  ).then((response) => response.json())

  const userAlbums = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${id}`
  ).then((r) => r.json())

  return { user, userAlbums }
}

export default function User() {
  const { user, userAlbums } = useLoaderData()

  return (
    <>
      <div>
        <Typography variant="h5" style={{ marginLeft: '1em' }}>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" style={{ opacity: '50%' }}>
          Username: {user.username}
        </Typography>
        <Typography variant="subtitle1" style={{ opacity: '50%' }}>
          Email: {user.email}
        </Typography>
        <Typography variant="subtitle1" style={{ opacity: '50%' }}>
          Phone: {user.phone}
        </Typography>
        <Typography variant="subtitle1" style={{ opacity: '50%' }}>
          Site: {user.website}
        </Typography>
      </div>

      <Typography variant="h5" style={{ marginLeft: '1em' }}>
        Albums
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {userAlbums.map((album) => (
          <Link
            to={`/albums/${album.id}`}
            key={album.id}
            style={{ color: 'black' }}
          >
            <Typography variant="subtitle1">{album.title}</Typography>
          </Link>
        ))}
      </div>
    </>
  )
}
