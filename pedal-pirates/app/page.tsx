import { Map } from '@/components/Map'

export default function Home () {
  return (
    <main>
      <Map
        corner1={{
          latitude: 32.888901451546175,
          longitude: -117.24270726605512
        }}
        corner2={{
          latitude: 32.87566564968557,
          longitude: -117.22207895251772
        }}
        zoom={17}
      >
        {[
          {
            key: 'hey',
            location: {
              latitude: 32.881119420115574,
              longitude: -117.23750570191042
            },
            element: '💖GEISEL💖'
          },
          {
            key: 'hey3',
            location: {
              latitude: 32.888901451546175,
              longitude: -117.24270726605512
            },
            element: '!!!!📸!!!!'
          },
          {
            key: 'hey4',
            location: {
              latitude: 32.87566564968557,
              longitude: -117.22207895251772
            },
            element: '!!!!🙏!!!!'
          },
          {
            key: 'hey2',
            location: {
              latitude: 32.87975382609173,
              longitude: -117.23693370592645
            },
            element: '🧋pc plaza🧋'
          }
        ]}
      </Map>
    </main>
  )
}
