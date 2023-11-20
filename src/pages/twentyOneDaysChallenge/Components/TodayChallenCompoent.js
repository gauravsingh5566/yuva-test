import React, { useEffect, useState } from "react";
import environment from "../assests/Group 386.svg";
import "../Css/challengeday.css";
import groupimg from "../assests/Group 381.svg";
import uploadimg from "../assests/Upload to the Cloud.svg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const TodayChallenCompoent = () => {
  const navigate = useNavigate();
  const params = useParams();
  // const todayid = params?.id;
  const [currentDay, setCurrentDay] = useState();
  const [uploadedFileName, setUploadedFileName] = useState('');

  const setData = (id) => {
    setCurrentDay(id);
  };

  useEffect(() => {
    setData(params?.id);
    console.log(currentDay);
  }, [params?.id]);

  const data = [
    {
      id: 1,
      day: "Day 1",
      work: "Completed",
      para: "GameDay this is the high game play",
      credits: 23 + " credits",
    },
    {
      id: 2,
      day: "Day 2",
      work: "Completed",
      para: "GameDay",
      credits: 23 + " credits",
    },
    {
      id: 3,
      day: "Day 3",
      work: "not Completed",
      para: "GameDay",
      credits: 23 + " credits",
    },
    {
      id: 4,
      day: "Day 4",
      work: "incompleted",
      para: "GameDay",
      credits: 23 + " credits",
    },
    {
      id: 5,
      day: "Day 5",
      work: "Completed",
      para: "GameDay this is the high game play",
      credits: 23 + " credits",
    },
  ];
  const [imagePreview, setImagePreview] = useState(null);
  const upload = (e)=>{
    setUploadedFileName(e.target.files[0].name)
    const file = e.target.files[0]

        if (file){
      // Create a URL for the image preview
      const objectURL = URL.createObjectURL(file);
      setImagePreview(objectURL);
    }
  }

  const navigation =()=>{
    if(params.id == 5 && uploadedFileName){
      navigate("/twenty-one-day/Today-Challenge/congress");
    }else{
      navigate("/twenty-one-day/gameday");
    }
  }

  const submit = (e)=>{
    e.preventDefault()
  }

  return (
    <>
      <div className="challengeDays p-3">
        <div className="challengehead position-relative d-flex justify-content-between align-items-center">
          <img
            src={environment}
            alt="environment"
            width="146px"
            height="59px"
          />
          <div className="d-flex align-items-center gap-2"> 
          <span className="backArrow"> <ArrowBackIosIcon sx={{color:"#7700FF"}} onClick={()=>navigate("/twenty-one-day/gameday")}/> </span>
          <h4 className="my-3">Today's challenge</h4>
          </div>

          <p>
            <img src={groupimg} alt="logo" className="pe-2" /> <span>50</span>
            creadits
          </p>
        </div>

        <div className="todayChallenge">

          <div className="challnDays d-flex justify-content-between align-items-center">
            {
              data?.map((val) => {
              if (val?.id == currentDay) {
                return (
                  <>
                    <div className="dayVal text-white"> {val.day}</div>
                    <div className="daypara align-align-self-lg-stretch">
                      <p>{val.work}</p>
                      <p>{val.para}</p>
                    </div>
                    <div className="daycredits">
                      <p>{val.credits}</p>
                    </div>
                  </>
                );
              }
            })
            }
          </div>
        </div>

        <form className="pastChallenge" onSubmit={(e)=>submit(e)}>
          <div className="upload mt-5 text-center position-relative">
            <img src={uploadimg} alt="uploadimg" />
              <input type="file" name="file" id="file" onChange={(e)=>upload(e)}  />
            <p>
              Drag file here or click to <span>{uploadedFileName? uploadedFileName :'Select file to upload'}</span> proof of activity
            </p>
            {
              uploadedFileName?
            <img src={imagePreview} alt="uploadedImg" width="50%" height="300px" style={{objectFit:"cover", objectPosition:"center"}} />:null
            }

          </div>

          <div className="experience">
            <p className="mt-5">Share your experience</p>
              <input type="text" placeholder="Eg - I am very happy to share that i have used stairs instead of
              an elevator, it was tough using stairs all the day, but have loose
              my wait too. So its not only eco friendly activity but healthy
              activity." />

            <div className="d-flex justify-content-between expbtns">
              <button className="border-0">Later</button>
              <button className="border-0" 
              
              onClick={()=>navigation()}>

              Submit</button>
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default TodayChallenCompoent;
