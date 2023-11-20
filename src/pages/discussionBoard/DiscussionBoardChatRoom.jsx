import React, { useEffect, useState } from 'react'
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import HttpsTwoToneIcon from '@mui/icons-material/HttpsTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { DiscussionBoardMessageBox, DiscussionBoardMesssageArea } from './component';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import "./DiscussionBoardChat.css"
import { apiJson } from 'api';
const menuItemStyle = {
  '&:hover': {
    backgroundColor: '#F8F5FF',
    borderRadius:"8px", 
    color:"#160054"
  },
  '&.Mui-selected': {
    backgroundColor: '#F8F5FF', 
    borderRadius:"8px",
    color:"#160054",
  fontWeight:"bold"
  },
};

export const DiscussionBoardChatRoom = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [discussData,setDiscussdata] =useState({})

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {id} = useParams()
  const navigate = useNavigate();
  useEffect(()=>{
  const getDicussionData = async(id)=>{
    try{
      let res = await apiJson.get(`/api/v2/discussion_board/discussionlistById/${id}`)
      setDiscussdata(res?.data?.discussDetails)
    }catch(error){
      console.log(error, "Discussion Error")
    }

  }
  getDicussionData(id);
  },[])

  return (
    <>
      <div className="border-bottom" style={{ color: "#5E5E5E" }}>
        <div className="mx-3">
          <div className="my-2">
            {/* <============== Top Row start ================> */}
            <div className="row">
              {/* <============== Top Left Column start ================> */}
              <div className="col-md-3 my-2 cursor-pointer" style={{ color: "#6D6D6D", fontSize: "14px" }} onClick={() => navigate("/new-dashboard/discussion-board")}>
                <ArrowBackIosNewTwoToneIcon /> <span className='fs-6 fw-semibold' >Discussion Board</span>
              </div>
              {/* <============== Top Middle Column start ================> */}

              <div className="col-md-6">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <p className='fs-6 fs-semibold' style={{ color: "#232323" }}>{discussData?.discussion_title}</p>
                  <div style={{ fontSize: "12px", color: "#5E5E5E" }}>
                    <span className='fw-semibold'>Sherpa Track</span> <ArrowForwardIosTwoToneIcon sx={{ fontSize: "12px", fontWeight: "bold" }} /> <span className='fw-semibold' >Climate Change and Disaster Risk</span> <ArrowForwardIosTwoToneIcon sx={{ fontSize: "12px", fontWeight: "bold" }} /> <span className='fw-semibold'> 20 participants</span>
                  </div>
                </div>
              </div>
              {/* <============== Top Right Column start ================> */}

              <div className="col-md-3" >
                <div className="d-flex justify-content-center align-items-center my-2">
                  <button className='rounded-2 p-1' style={{ background: "#FFE7E7", color: "#620000", height: "28px", fontSize: "13px" }} onClick={()=>{
                    navigate(`/new-dashboard/discussion-board`)
                  }}>
                    <HttpsTwoToneIcon sx={{ fontSize: "13px" }} /> Close Discussion
                  </button>
                  <div className='d-flex justify-content-center align-items-center mx-2 border border-0 rounded-2 cursor-pointer' id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick} style={{ background: "#ECECEC", height: "28px" }}>
                      <MoreHorizTwoToneIcon sx={{ color: "#999999" }} />
                      </div>

                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                 
                >
                  <MenuItem onClick={handleClose} sx={menuItemStyle}>Pause</MenuItem>
                  <MenuItem onClick={handleClose} sx={menuItemStyle}>Request Break</MenuItem>
                  <MenuItem onClick={handleClose} sx={menuItemStyle}>Exit</MenuItem>
                </Menu>
              </div>
            </div>
            {/* <============== Top Row End ================> */}
          </div>
        </div>
      </div>
      {/* <======== Messaging Area Start here =========> */}

      <div className="col-10 discussionBoardScroll mx-5 mt-4" style={{height:"484px",overflowY:"scroll"}}>
        <DiscussionBoardMesssageArea />
      </div>
      {/* <========= Discussion board message box ===========> */}
      <div className="col-10  mx-5 my-3">
        <DiscussionBoardMessageBox />
      </div>
    </>
  )
}
