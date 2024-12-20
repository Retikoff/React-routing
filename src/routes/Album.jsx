import { Typography } from '@mui/material'
import { Suspense } from 'react'
import { Await, useLoaderData, Link } from 'react-router-dom'

export const loader = ({ params: { id } }) => {
  const albumPromise = fetch(
    `https://jsonplaceholder.typicode.com/albums/${id}`
  ).then((r) => r.json())

  //api выкидывает 504 и 502 из за чего большая часть картинок не отображается, пофиксить или понять в чем проблема не смог
  const photosPromise = fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
  ).then((r) => r.json())

  return { albumPromise, photosPromise }
}

export default function Album() {
  const { albumPromise, photosPromise } = useLoaderData()

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={albumPromise} errorElement={<div>Giga oooops</div>}>
          {(album) => (
            <div>
              <Typography variant="h5" style={{ marginLeft: '1em' }}>
                {album.title}
              </Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{ opacity: '50%', marginLeft: '1em' }}
                >
                  Created by user with id:
                </Typography>
                <Link to={`/users/${album.userId}`}>
                  <Typography style={{ color: 'black' }}>
                    {album.userId}
                  </Typography>
                </Link>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Await
          resolve={photosPromise}
          errorElement={<div>Smth went wrong</div>}
        >
          {(photos) => {
            return (
              <div
                style={{
                  display: 'flex',
                  gap: '1em',
                  flexWrap: 'wrap',
                }}
              >
                {photos.map((photo) => {
                  return <img src={photo.thumbnailUrl} key={photo.id} />
                })}
              </div>
            )
          }}
        </Await>
      </Suspense>
    </>
  )
}
