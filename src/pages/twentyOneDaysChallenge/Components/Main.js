import React from 'react';
import environment from '../assests/Group 386.svg';
import "../Css/main.css";
import { Link, useNavigate,} from 'react-router-dom';

const Main = () => {
const navigate = useNavigate();
  return (
    <>
        <div className="mainContent position-relative">
            <img src={environment} alt="environment" width="553px" height="288px" />
            <p className='text-center w-75 m-auto'>Each day’s activity is based on a person’s habit of using elevators, and plastic bags or forgetting to switch off electrical appliances when not in use. If small steps are taken by each individual to avoid wastage, then it could create a bigger impact.</p>

            <div className="d-flex justify-content-center">
            <button onClick={()=> navigate("/twenty-one-day/gameday")} className='mt-4 text-decoration-none text-center '>Start Game</button>
            </div>

            <hr className='w-75 m-auto mt-5'/>

            <div className="lowerContent">
                <p className='text-center my-4'>How to Play</p>

                <div className="tasks row text-center w-75 m-auto">
                    <div className="col-lg-3">
                        <p className='text-start text-white one'>1</p>
                        <p className='secondpara'>Take a daily assigned challenge</p>
                    </div>
                    <div className="col-lg-3">
                        <p className='text-start text-white one'>2</p>
                        <p className='secondpara'>Complete the challenge by doing activity</p>
                    </div>
                    <div className="col-lg-3">
                        <p className='text-start text-white one'>3</p>
                        <p className='secondpara'>Take a selfie of a challenge</p>
                    </div>
                    <div className="col-lg-3">
                        <p className='text-start text-white one'>4</p>
                        <p className='secondpara'>Upload the selfie</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Main