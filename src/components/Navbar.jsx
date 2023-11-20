import { ArrowForwardTwoTone, ArrowRight, MenuOpen, Person } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import { useGlobalContext } from "global/context";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import RegisterAsk from "pages/Auth/logincomps/RegisterAsk";
import { AvatarMenu } from "./navigation";

const Navbar = ({ handleDrawerToggle, sidePanelOpen }) => {
  const { token, removeToken, removeUser, userData } = useGlobalContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handlelogout = () => {
    removeToken();
    removeUser();
    toast.dismiss();
    toast.success("Logged out successfully");
    navigate("/");
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    toggleDrawer("left", false)();
  }, [pathname]);

  // FOr Register Button
  const [showRegisterPopup, setshowRegisterPopup] = useState(false);
  const handleClose = () => setshowRegisterPopup(false);
  const handleShow = () => setshowRegisterPopup(true);
  return (
    <>
      <nav className={`navbar sticky-top py-0 navbar-expand-xl bg-white  ${token ? "logged-navbar" : ""}`}>
        <div className="container">
          <div className="d-flex align-items-center">
            <IconButton onClick={handleDrawerToggle} className={`border rounded p-2 fs-3  me-2 ${!token && "d-lg-none"}`}>
              {sidePanelOpen ? <MenuOpen className="fs-3 text-dark" /> : <MenuIcon className="fs-3 text-success" />}
            </IconButton>
            {!token ? (<NavLink className="navbar-brand" to={"/"}>
              <img style={{ maxHeight: 60, position: "relative", maxWidth: "60vw", zIndex: 200, objectFit: "contain" }} className="img-responsive py-2" src={"/logo.png"} alt="G20india" />
            </NavLink>): null}
            
          </div>
          {token && (
            <div className="d-xl-none">
              <AvatarMenu handlelogout={handlelogout} />
            </div>
          )}
          <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
            <>
              <ul className="navbar-nav ms-5 mb-2 mb-lg-0 mx-5 justify-content-around">
                <li className="nav-item">
                  <Link className="nav-link fw-bolder  text-capitalize navbar-title" to="/model-g20">
                    Model G20
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link  text-capitalize navbar-title" to="/course/detail/g20-orientation-course">
                    G20 Orientation
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-capitalize navbar-title" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Themes
                  </Link>
                  <div
                    className="dropdown-menu"
                    style={{
                      minWidth: "800px",
                      left:"0px"
                      // // right: "-150px",
                      // right: "0px",
                    }}>
                    <div className="special-nav-row row row-cols-2">
                      <div className="col">
                        <h5 className="px-3">Main Themes</h5>
                        <Link className="dropdown-item" to="/future-of-work">
                          <span className="design">
                            <ArrowRight />
                          </span>
                          <span className="text-initial">Future of Work</span>
                        </Link>
                        <Link className="dropdown-item" to="/peacebuilding-and-reconciliation">
                          <span className="design">
                            <ArrowRight />
                          </span>
                          <span className="text-initial">Peacebuilding and Reconciliation</span>
                        </Link>
                        <Link className="dropdown-item d-flex" to="/climate-change-and-disaster-risk-reduction">
                          <span className="design">
                            <ArrowRight />
                          </span>
                          <div>
                            <span className="text-initial">
                              Climate Change and Disaster <br /> Risk Reduction
                            </span>
                          </div>
                        </Link>
                        <Link className="dropdown-item" to="/health-well-being-and-sports">
                          <span className="design">
                            <ArrowRight />
                          </span>
                          <span className="text-initial">Health , Well-Being and Sports</span>
                        </Link>
                        <Link className="dropdown-item" to="/shared-future">
                          <span className="design">
                            <ArrowRight />
                          </span>
                          <span className="text-initial">Shared Future</span>
                        </Link>
                      </div>
                      <div className="col">
                        <h5 className="px-3">Topics</h5>
                        <div
                          className="w-100 pe-3"
                          style={{
                            maxHeight: "450px",
                            overflowY: "auto",
                            overflowX: "hidden",
                          }}>
                          <Link className="dropdown-item" to="/life">
                            <span className="design">
                              <ArrowRight />
                            </span>
                            <span className="text-initial">LiFE</span>
                          </Link>
                          <Link className="dropdown-item w-100" to="/nep">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            NEP 2020
                          </Link>{" "}
                          <Link className="dropdown-item" to="/education-for-all">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            Education For All
                          </Link>{" "}
                          <Link className="dropdown-item" to="/startup-india">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            Startup India
                          </Link>
                          <Link className="dropdown-item" to="/digital-transform">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            Digital Transformation
                          </Link>
                          <Link className="dropdown-item" to="/cdri">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            CDRI
                          </Link>
                          <Link className="dropdown-item" to="/woman-empowerment">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            Woman Empowerment
                          </Link>
                          <Link className="dropdown-item" to="/unlearn-relearn-and-reskill">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            Unlearn, Relearn and Reskill
                          </Link>
                          <Link className="dropdown-item d-flex align-items-center" to="/cyber-safety-for-youth">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            Cyber Safety for Youth & <br /> Post-Pandemic Culture
                          </Link>
                          <Link className="dropdown-item d-flex align-items-center" to="/gig-economy">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            Gig Economy
                          </Link>
                          <Link className="dropdown-item d-flex align-items-center" to="/cross-border-innovation">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            Cross-Border Innovation
                          </Link>
                          <Link className="dropdown-item d-flex align-items-center" to="/transitioning-to-sustainable-living">
                            <span className="design">
                              <ArrowRight />
                            </span>{" "}
                            Transitioning to Sustainable Living
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <Link className="nav-link  text-capitalize navbar-title" to="/team">
                    Team
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-capitalize  navbar-title" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Engage
                  </Link>
                  <div
                    className="dropdown-menu"
                    style={{
                      minWidth: "200px",
                      right: "0px",
                    }}>
                    <div className="special-nav-row row row-cols-1">
                      <div className="col">
                        <Link className="dropdown-item" to="/youth-community">
                          <span className="design">
                            <ArrowRight />
                          </span>
                          <span className="text-initial">Youth-Connect</span>
                        </Link>
                        <a className="dropdown-item" href="/contactus">
                          <span className="design">
                            <ArrowRight />
                          </span>
                          <span className="text-initial">Contact Us</span>
                        </a>
                        <Link className="dropdown-item" to="/media">
                          <span className="design">
                            <ArrowRight />
                          </span>
                          <span className="text-initial">YMG20 Media</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="inputField p-2 rounded d-flex align-items-center mx-3">

                <SearchIcon sx={{color:'#9B9B9B'}}></SearchIcon>
                <input type="search" name="search" id="search" placeholder='Search'/>

            </div>
              {token ? (
                <>
                  <AvatarMenu handlelogout={handlelogout} />
                </>
              ) : (
                <>
                  {/* Hidden For Time Being For Cater the issue */}
                  {/* <Button variant="outlined" onClick={handleShow} color="warning" className="text-initial py-2 rounded-pill px-3" endIcon={<ArrowForwardTwoTone />}>
                    Register
                  </Button>
                  <Link to={"/login"}>
                    <Button variant="contained" color="warning" className="text-capitalize py-2 ms-1 rounded-pill px-3" endIcon={<Person />}>
                      Login
                    </Button>
                  </Link> */}
                </>
              )}
            </>
          </div>
        </div>
      </nav>
      {showRegisterPopup && <RegisterAsk handleClose={handleClose} />}
    </>
  );
};

export default Navbar;
