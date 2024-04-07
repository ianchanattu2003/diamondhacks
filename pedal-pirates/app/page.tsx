import { Map } from '@/components/Map'
// import { Arrow } from "./Arrow";
import './globals.css'
import { parseData } from '@/lib/parse-data'
import { Welcome } from '@/components/Welcome'

const SOURCE_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCyZWLvkB-ONwBelLDX800pnvUz7xXX6rd25LhdH8-NzQ9mtoXwoNZLpnQ7Coo7wUnMZ4bLcJqNjIp/pub?gid=213238627&single=true&output=tsv'

export default async function Home () {
  // Last part is to bypass the cache
  const reports = await fetch(SOURCE_URL + '&_=' + Math.random())
    .then(r => r.text())
    .then(parseData)
  return (
    <main>
      <Welcome />
      <Map
        corner1={{
          latitude: 32.8931662773903,
          longitude: -117.25442971188062
        }}
        corner2={{
          latitude: 32.86301957588197,
          longitude: -117.21767412641204
        }}
        zoom={17}
        reports={reports}
      />
    </main>
  )
}
