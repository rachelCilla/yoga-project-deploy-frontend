import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import PosesCard from "./FavoritesPosesCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function FavoritePosesList({}) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [apiData, setApiData] = useState(null);

  const userEmail = cookies.Email;
  const location = useLocation();
  const loggedIn = location.state;

  const getPoseData = async (pose) => {
    return axios
      .get(`https://yoga-api-nzy4.onrender.com/v1/poses?name=${pose}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const getAllFavorites = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/favorite_poses/${userEmail}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      //   console.log(data)
      //   {id: '704b8964-c577-476c-ba67-ff499fce0263', user_email: 'a', pose_name: 'Extended Side Angle', date: '2023-09-07T17:04:09.275Z'}

      return data;

      // const dataNames = data.map((obj) => obj.pose_name);
      // const uniqueDataNames = [...new Set(dataNames)];
      //     //  uniqueDataNames = ['Boat', 'Half Boat', 'Chair', 'Crow', 'Dolphin', 'Side Plank', 'Plank']
      // const fetchAllPoseData = async () => {
      //         await Promise.all(uniqueDataNames.map(pose => getPoseData(pose)));

      // };
    } catch (err) {
      console.log(err);
    }
  };

  // IMMEDIATELY CALLED
  useEffect(() => {
    getAllFavorites()
      .then((data) => {
        const dataNames = data.map((obj) => obj.pose_name);

        const uniqueDataNames = [...new Set(dataNames)];

        const fetchAllPoseData = async () => {
          // console.log('unique', uniqueDataNames)=['Boat', 'Half Boat', 'Chair', 'Crow', 'Dolphin', 'Side Plank', 'Plank']
          const poseData = await Promise.all(
            uniqueDataNames.map((poseName) => getPoseData(poseName))
          );
          //           console.log("posedata", poseData);

          // {id: 18, english_name: 'Extended Side Angle', sanskrit_name_adapted: 'Utthita Parsvakonasana', sanskrit_name: '
          const filteredPoseData = poseData.filter((pose) => pose !== null);
          setApiData(filteredPoseData);
          //   console.log(apiData)
        };

        fetchAllPoseData();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-grayBlueDarker  w-screen h-screen px-10">
      <h1 className=" text-5xl text-white font-mont p-4 mt-20 text-center ">
        Favorite Poses List
      </h1>

      {loggedIn && (
        <>
          <h3 className="text-white text-xl lg:text-2xl text-center text-primary font-mont">
            {" "}
            User: {userEmail}
          </h3>
          {apiData !== null &&
            apiData.map((poseObj) => (
              <div style={{ margin: "3rem" }} key={poseObj.id}>
                <PosesCard selectedPose={poseObj} />
              </div>
            ))}
          {apiData.length === 0 && (
            <div className="text-white text-2xl text-center">
              You currently have no favorites
            </div>
          )}
        </>
      )}

      {!loggedIn && (
        <div className="flex flex-col">
          <h3 className="text-xl text-white font-mont  p-3  ">
            {" "}
            To view your favorite poses, please log in or create an account to
            start saving your favorites.
          </h3>
          <Link className="mx-auto" to="/auth">
            <button className="btn btn-secondary">Login or Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
}
