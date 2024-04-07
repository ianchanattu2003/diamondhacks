import { Map } from '@/components/Map'

export default function Home () {
  return (
    <main>
      <Map
        corner1={{ latitude: 32.89200731774405, longitude: -117.244353794265 }}
        corner2={{
          latitude: 32.87017208243561,
          longitude: -117.21780945830383
        }}
        zoom={17}
      />
    </main>
  )
}
