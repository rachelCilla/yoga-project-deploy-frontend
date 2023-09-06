import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";
// import "../css/success.css";
import { useNavigate } from "react-router-dom";

const SuccessCard = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-white/30 flex justify-center items-center ">
      <div className=" p-5 bg-white h-4/6  h-4/6 z-5 drop-shadow-2xl rounded-xl text-gray-900 border-2 border-gray-500 m-0 ">
        <div className="title-inner  h-full  w-full text-center">
          <Link to="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="w-8 h-8 absolute top-0 right-0 transform m-3 hover:bg-gray-100 text-gray-800 border border-gray-400 rounded shadow"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
          <h1 className="mt-1 font-mont font-semibold text-primary5 text-center text-2xl text-slate-600 lg:text-6xl   ">
            Registration Successful!{" "}
          </h1>

          <Player
            className="  object-scale-down h-36 lg:h-72"
            loop
            autoplay
            src="https://lottie.host/d8db3bb5-ba5e-4b20-9062-44f3a1bf1c19/F873f08uB4.json"
          />
          <p className="font-mont text-primary4  font-semibold  text-lg lg:text-2xl text-center ">
            You are now able to add poses to your Favorites List!
          </p>
          <p className="font-mont text-primary4 text-md  lg:text-xl text-center ">
            You can find your saved poses at any time under "My Favorites"
          </p>
          {/* <button onClick={() => navigate(-1)}>
            Nevermind, take me back!{" "}
          </button> */}
          <Link
            to="/home"
            className=" text-primary5 font-semibold mt-5 bg-primary2/50 border-2 border-primary2 font-mont  p-2 lg:p-3  shadow hover:bg-primary2/10 focus:ring-4 focus:ring-gray-200 text-md lg:text-xl  rounded-lg  "
          >
            Return to the Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
