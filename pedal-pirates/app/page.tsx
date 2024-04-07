import Image from "next/image";
// import { Arrow } from "./Arrow";
import "./globals.css";

export default function Home() {
  return (
    Frame()
  );
}

const Frame = (): JSX.Element => {
    return (
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
    );
};

