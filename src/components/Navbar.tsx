import React from "react";
import Anime from "react-anime";
import logo from "../logo.svg";

type NavbarProps = {
  title: string;
};

function Navbar({ title }: NavbarProps) {
  return (
    <div className="Navbar h-30 flex py-10 space-x-6 items-center">
      <div className="logo w-16">
        <Anime
          easing="easeInOutExpo"
          duration={2000}
          delay={2000}
          loop={true}
          //delay={(el: number, index: number) => index * 240}
          className=""
          rotate="1turn"
        >
          <img src={logo} className="logoSVG object-contain" alt="logo" />
        </Anime>
      </div>
      <p className="text-white font-bold text-4xl invisible md:visible">
        {title}
      </p>
      <span className="grow inline-block align-middle ">
        <div className="flex justify-end">
          <div>
            <button className="flex flex-row items-center bg-navy-300 hover:bg-navy-200 text-white font-normal py-2 px-4 rounded shadow-lg">
              <img className="object-cover h-4 pr-2" src="../icons/link.png" />
              Connect Wallet
            </button>
          </div>
        </div>
      </span>
    </div>
  );
}

export default Navbar;
