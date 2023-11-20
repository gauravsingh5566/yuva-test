import React from 'react';
import "../Css/footer.css";
import yuva from "../assests/yuvamanthan top 4.svg";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CopyrightIcon from '@mui/icons-material/Copyright';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    const date = new Date().getFullYear();

  return (
    <>
        <div className="container text-white">
            <div className="footerItems">
                <div className="d-block d-md-flex justify-content-md-between ">
                    <div className='footerBox boxOne px-3'>
                        <img src={yuva} alt="yuva" />

                        <p className='footerDiscription'>A platform to drive change by creating awareness on issues that matter and build capacity to navigate the changing economic scenarios.</p>

                        <p className='footerTitle' style={{fontSize:"17px"}}>Follow Us On</p>
                        <div className='icons d-flex gap-3 justify-content-between align-items-center'>
                            <FacebookIcon sx={{height:'43px', width:'43px',cursor:'pointer'}} />
                            <LinkedInIcon sx={{height:'43px', width:'43px',cursor:'pointer'}}/>
                            <TwitterIcon  sx={{height:'43px', width:'43px',cursor:'pointer'}} />
                            <InstagramIcon sx={{height:'43px', width:'43px',cursor:'pointer'}} />
                            <YouTubeIcon sx={{height:'43px', width:'43px',cursor:'pointer'}} />
                        </div>
                    </div>
                    <div className='footerBox box'>
                        <p  className='footerTitle mt-4'>Events</p>
                        <p className='footerPara mb-1'>Model G20</p>
                        <p className='footerPara mb-1'>Model G20</p>
                        <p className='footerPara mb-1'>Model G20</p>
                      
                    </div>
                    <div className='footerBox box'>
                        <p  className='footerTitle mt-4'>Events</p>
                        <p className='footerPara mb-1'>Model G20</p>
                        <p className='footerPara mb-1'>Model G20</p>
                        <p className='footerPara mb-1'>Model G20</p>
                    </div>
                    <div className='footerBox box'>
                        <p  className='footerTitle mt-4'>Events</p>
                        <p className='footerPara mb-1'>Model G20</p>
                        <p className='footerPara mb-1'>Model G20</p>
                        <p className='footerPara mb-1'>Model G20</p>
                    </div>
                    <div className='footerBox box'>
                        <p className='footerTitle mt-4'>Events</p>
                        <p className='footerPara mb-1'>Model G20</p>
                        <p className='footerPara mb-1'>Model G20</p>
                        <p className='footerPara mb-1'>Model G20</p>
                    </div>
                 
                </div>
            </div>
            <div className="lowerFooter mt-3 d-flex align-items-center pt-3">
            <p className='footerbottom'>
                Copyright <CopyrightIcon/> {date}
            </p>
            <p className='footerbottom'>All Rights Reserved. Registration on or use of this site constitutes acceptance of our Terms and Conditions Privacy Policy Accessibility Statement</p>
            </div>
        </div>
    </>
  )
}

export default Footer