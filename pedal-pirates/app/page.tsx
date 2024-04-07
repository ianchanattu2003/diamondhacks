import { Map } from '@/components/Map'
// import { Arrow } from "./Arrow";
import "./globals.css";

export default function Home () {
  return (
    <main>
      <div className="frame">
            <div className="overlap-group">
                <img className="vector" alt="Vector" src="./wheel.svg" />
                <div className="text-wrapper">Pedal Pirates</div>
                <div className="div">Protect your wheels from</div>
                <div className="rectangle" />
                <p className="p">
                    Stay one step ahead of bike and scooter theft by knowing when and where incidents occur on campus, sourced by
                    UCPD reports and crowd-sourced by students.
                </p>
            </div>
            {/* <Arrow className="arrow-instance" /> */}
            <div className="text-wrapper-2">Designed for DiamondHacks 2024</div>
        </div>
      <Map
        corner1={{ latitude: 32.89200731774405, longitude: -117.244353794265 }}
        corner2={{
          latitude: 32.87017208243561,
          longitude: -117.21780945830383
        }}
        zoom={17}
      />
  </main>
  );
}
