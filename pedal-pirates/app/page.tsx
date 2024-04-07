import { Map } from '@/components/Map'
// import { Arrow } from "./Arrow";
import "./globals.css";
import PropTypes from "prop-types";

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

interface Props {
    property1: "variant-2" | "variant-3" | "default";
    className: any;
}

const Card = ({ property1, className }: Props): JSX.Element => {
    return (
        <div className={`card ${property1} ${className}`}>
            {["default", "variant-2"].includes(property1) && (
                <>
                    <p className="vehicle-default">
                        <span className="text-wrapper">Vehicle: </span>
                        <span className="span">
                            Default
                            <br />
                        </span>
                        <span className="text-wrapper">Location: </span>
                        <span className="span">
                            (X, Y)
                            <br />
                        </span>
                        <span className="text-wrapper">Date Occurred: </span>
                        <span className="span">
                            Default
                            <br />
                        </span>
                        <span className="text-wrapper">Time Occurred: </span>
                        <span className="span">
                            Default
                            <br />
                        </span>
                        <span className="text-wrapper">Details: </span>
                        <span className="span">
                            Default
                            <br />
                        </span>
                        <span className="text-wrapper">Source:</span>
                        <span className="span"> Default</span>
                    </p>
                    <div className="overlap-group">
                        <div className="ellipse" />
                        <div className="div">
                            {property1 === "default" && <>🚲</>}

                            {property1 === "variant-2" && <>🛴</>}
                        </div>
                    </div>
                </>
            )}

            {property1 === "variant-3" && (
                <div className="overlap-group-2">
                    <p className="was-your-ride-jacked">
                        <span className="text-wrapper-2">
                            Was your ride jacked here?
                            <br />
                        </span>
                        <span className="text-wrapper-3">Mark it on the map.</span>
                    </p>
                    <div className="ellipse-2" />
                    <div className="text-wrapper-4">❌</div>
                </div>
            )}
        </div>
    );
};

Card.propTypes = {
    property1: PropTypes.oneOf(["variant-2", "variant-3", "default"]),
};

