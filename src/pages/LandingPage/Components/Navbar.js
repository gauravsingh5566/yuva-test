import React from 'react'
import logo from "../assests/Layer 2.svg"
import Avatar from "../assests/avatar.svg"
import { Link } from 'react-router-dom'
import "../Css/navbar.css"
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
const Navbar = () => {

  return (
    <>
        <div className="navbar">

            <nav className='container d-flex align-items-center justify-content-between px-3'>
                <img src={logo} alt="logo"/>

                <ul className='no-list-styel d-flex align-items-center gap-3 pt-3'>
                    <li> <Link to="#" className='fw-bolder'>Theme</Link> </li>
                    <li> <Link to="#" className='fw-bolder'>Engage</Link> </li>
                    <li> <Link to="#" className='fw-bolder'>Model G20</Link> </li>
                    <li> <Link to="#" className='fw-bolder'>G20 Orientation</Link> </li>
                    <li> <Link to="#" className='fw-bolder'>Team</Link> </li>
                </ul>

            <div className='side_items d-flex gap-3 align-items-center'>
                <div className="inputField p-2 rounded d-flex align-items-center">

                <SearchIcon sx={{color:'#9B9B9B'}}></SearchIcon>
                <input type="search" name="search" id="search" placeholder='Search'/>

            </div>
                <NotificationsIcon sx={{color:"#FFD233"}}></NotificationsIcon>
                <img src={Avatar} alt="avatar" />
            </div>

            </nav>
        </div>
    </>
  )
}

export default Navbar