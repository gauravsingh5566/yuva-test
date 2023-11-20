import React, { useContext, useEffect, useId, useState } from "react";
import ClubProfileLeft from "./components/ClubProfileLeft";
import ClubProfileRight from "./components/ClubProfileRight";
// import  './contextFolder/clubContextApi'
import { ClubContext, MyProvider } from "./TimelineClub";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "global/context";
import axios from "axios";
import { apiJson, apiJsonAuth } from "api";
// import MyProvider from './contextFolder/clubContextApi'
// import MyProvider from "./contextFolder/clubContextApi"
const ClubProfile = () => {
  const location = useLocation();
  const { userId } = useParams();
  const isInstitute = location.pathname.includes("institute");
  const { userData } = useContext(UserContext);
  const [existUser, setExistUser] = useState(false);
  const createClubUser = () => {
    // console.log("here we call create")
    if (isInstitute) {
      apiJsonAuth
        .post("club/club-institute", {
          id: userId,
        })
        .then((res) => {
          setExistUser(true);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else{
      apiJsonAuth
        .post("club/club-student", {
          id:userId,
        })
        .then((res) => {
          setExistUser(true);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const checkIfUserExist = () => {
    // apiJsonAuth.get('club/checkIfUserExitAsClubUser/'+userData.id+'/'+isInstitute?'institute':'student')

    apiJsonAuth.get(`club/checkIfUserExitAsClubUser/${userId}/${isInstitute ? "institute" : "student"}`).then((res) => {
      if (res.data.result === false) {
        // console.log("pppppppppppppppppppppppppppppppppppp", res.data.result)

        createClubUser();
      } else {
        setExistUser(true);
      }
    });
  };

  useEffect(() => {
    // console.log("inside thississsisi")
    checkIfUserExist();
    window.scrollTo(0, 0);
  }, []);

  return (
    <MyProvider>
      <div className="container mt-4 ">
        <div className="row p-relative">
          <div className="col-12 col-xl-8">
            <div>{existUser && <ClubProfileLeft existUser={existUser} isInstitute={isInstitute} userId={userId} />}</div>
          </div>

          <div className="col-xl-4 h-100 p-relative z-0">
            <div className="sticky-top">
              <ClubProfileRight />
            </div>
          </div>
        </div>
      </div>
    </MyProvider>
  );
};

export default ClubProfile;
