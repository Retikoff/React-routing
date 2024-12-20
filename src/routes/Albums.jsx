import { Typography } from '@mui/material'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'

export const loader = async () => {
  const albums = await fetch(
    'https://jsonplaceholder.typicode.com/albums'
  ).then((response) => response.json())
  return { albums }
}

export default function Albums() {
  const { albums } = useLoaderData()

  return (
    <>
      <div>
        {albums.map((album) => (
          <Link key={album.id} to={`/albums/${album.id}`}>
            <Typography variant="subtitle1" style={{ color: 'black' }}>
              {album.title}
            </Typography>
          </Link>
        ))}
      </div>
    </>
  )
}
