import React from 'react';
import  Navbar  from './Navbar';
import "../Css/Home.css";
import arrow from "../assests/Vector.svg";
import doubleArrow from "../assests/BLueVector.svg";
// import girlsvg from "../assests/girl.svg";
import greenPolygon from "../assests/GreenPolygon 2.svg";
import polygonThree from "../assests/Polygon3.svg";
import rectangle from "../assests/Rectangle.svg";
import star from "../assests/Star.svg";
import stars from "../assests/stars.svg";
import wifi from "../assests/wifi.svg";
import curvedIcon from "../assests/curvedyellowicon.svg";
import TimeToLearn from './TimeToLearn';
import EngageItems from "./EngageItems";
import frame from "../assests/institute/Frame 3849.svg";
import institute from "../assests/institute/Institute Sidebar.svg";
import SecEngageItems from "./SecondEngage";
import ExpSection from "./ExpSection";
import CounterSec from "./CounterSec";
import Universities from "./Universities";
import Testimonial from "./Testimonial";
import SubscribeSec from './SubscribeSec';
import Footer from "./Footer";
import { useGlobalContext } from 'global/context';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const {userData, token} = useGlobalContext()
    const navigate = useNavigate()
    const handleLogin = ()=>{
        navigate('/login')
    }
    const data = [
        {
            heading:"Model United Nations.",
            para:"An advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations.",
            imgUrl:[frame,institute]
        }
    ]
  return (
    <>
     {!token  &&   <header>
            <main className='pt-5'>
                <div className="container">
                    <div className="d-flex flex-md-column flex-lg-row">
                        <div className="leftmain py-5">
                            <h1 className='fw-bolder mainHeading'>Unleashing the Power of Youth</h1>
                            <p>An advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics,finance, and international relations.</p>

                        <div className="buttons">

                            <button onClick={handleLogin} className='text-white text-start rounded-3 px-2 py-1 d-flex justify-content-between align-items-center my-2 pb-2'>
                             <span>Log in as a student</span> 
                             <div className="arrow" >
                             <img src={arrow} alt="arrow" />
                             <img src={arrow} alt="arrow" />
                             </div>
                             </button>

                            <div className='mainbtn d-flex  justify-content-between'>
                                <button onClick={handleLogin}  className='border-0 text-start rounded-3 px-2 py-1 d-flex justify-content-between align-items-center my-2d-flex pb-2'> 
                                <span>For Institute</span> 
                                    <div className="arrow" >
                                    <img src={doubleArrow} alt="arrow" />
                                    <img src={doubleArrow} alt="arrow" />
                                </div>
                                </button>

                                <button onClick={handleLogin}  className='border-0 text-start rounded-3 px-2 py-1 d-flex justify-content-between align-items-center my-2d-flex pb-2'> 
                                <span>For Teacher</span> 
                                    <div className="arrow" >
                                    <img src={doubleArrow} alt="arrow" />
                                    <img src={doubleArrow} alt="arrow" />
                                </div>
                                </button>
                            </div>
                        </div>

                    </div>



                    <div className="rightmain">

                        {/* <img src={girlsvg} alt="HeroSecGirl" /> */}
                        <img src={greenPolygon} alt="polygon" />
                        <img src={polygonThree} alt="polygon" />
                        <img src={rectangle} alt="polygon" />
                        <img src={star} alt="polygon" />
                        <img src={stars} alt="polygon" />
                        <img src={wifi} alt="polygon" />
                        <img src={curvedIcon} alt="polygon" />

                    </div>
                </div>
                </div>
            </main>
        </header>}

        {/* ==========================time to learn section================= */}

        <section className='yuvamanthanSection py-5'>
            <TimeToLearn></TimeToLearn>
        </section>
        
    {/* ==========================engage with event sectoin======================== */}

    <section className='engageSection p-5'>
        <div className='container'>
            <h2 className='text-center'>Engage with Events</h2>
            <p className='text-center'>An advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics</p>
            
            <EngageItems data={data}></EngageItems>
            <SecEngageItems data={data}></SecEngageItems>

            <EngageItems data={data}></EngageItems>
            <SecEngageItems data={data}></SecEngageItems>
            
            
        </div>

    </section>

    {/* ================================Experience Section ======================================== */}

    <section className='experienceSection'>
        <ExpSection></ExpSection>
    </section>

    {/* =======================counter section======================= */}

    <section className='counterSection py-5'>
        <CounterSec></CounterSec>
    </section>

    {/* =======================univercity  section======================= */}

    <section className='univercitySection py-5'>
        <Universities></Universities>
    </section>

    {/* =======================Testimonial  section======================= */}

    <section className='testimonialSectin py-5'>
        <Testimonial></Testimonial>
    </section>

    {/* =======================Subscribe  section======================= */}

    {/* <section className='testimonialSectin py-5'>
        <SubscribeSec></SubscribeSec>
    </section> */}

    {/* =======================footer section======================= */}

    {/* <footer className='footer pt-5'>
        <Footer></Footer>
    </footer> */}


    </>
  )
}

export default Home