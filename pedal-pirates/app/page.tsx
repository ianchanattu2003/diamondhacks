import { Map } from '@/components/Map'
// import { Arrow } from "./Arrow";
import './globals.css'
import { parseData } from '@/lib/parse-data'

const SOURCE_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCyZWLvkB-ONwBelLDX800pnvUz7xXX6rd25LhdH8-NzQ9mtoXwoNZLpnQ7Coo7wUnMZ4bLcJqNjIp/pub?gid=213238627&single=true&output=tsv'

export default async function Home () {
  const reports = await fetch(SOURCE_URL)
    .then(r => r.text())
    .then(parseData)
  return (
    <main>
      <div className='frame'>
        <div className='overlap-group'>
          <img className='vector' alt='Vector' src='vector.svg' />
          <div className='text-wrapper'>Pedal Pirates</div>
          <div className='div'>Protect your wheels from</div>
          <div className='rectangle' />
          <p className='p'>
            Stay one step ahead of bike and scooter theft by knowing when and
            where incidents occur on campus, sourced by UCPD reports and
            crowd-sourced by students.
          </p>
        </div>
        {/* <Arrow className="arrow-instance" /> */}
        <div className='text-wrapper-2'>Designed for DiamondHacks 2024</div>
      </div>
      {/* <Arrow className="arrow-instance" /> */}
      <div className='text-wrapper-2'>Designed for DiamondHacks 2024</div>
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
        {reports.map((report, i) => ({
          key: i,
          location: report.location,
          element: report.object
        }))}
      </Map>
    </main>
  )
}
