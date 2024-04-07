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
