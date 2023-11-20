import React, { useContext } from 'react';
import Avatar from '@mui/joy/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'global/context';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Box } from '@mui/system';
const DirectionPage = () => {
  const navigate = useNavigate();
  const { userData, token, loginStatus } = useContext(UserContext);
  const { id, email, type, role, institution_name } = userData;

  const onClickTimeline = () => {
    navigate('/timeline/');
  };
  const onClickProfile = () => {
    if(userData.role ==='institute'){
    navigate(`/timeline/userProfile/institute/${id}`);

    }else{
    navigate(`/timeline/userProfile/${id}`);

    }
  };

  return (
    <Box className="d-none d-lg-block">
      <nav aria-label="main mailbox folders">
        <List
          className="w-100 border shadow-sm p-1 text-center rounded-4"
          subheader={
            <ListSubheader component="div">
              <h5>Useful Links</h5>
            </ListSubheader>
          }>
          <ListItem disablePadding>
            <ListItemButton onClick={onClickTimeline}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Timeline" />
            </ListItemButton>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem disablePadding>
            <ListItemButton onClick={onClickProfile}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Your Profile" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
    // <div className='d-none py-3 px-1 w-100 d-lg-block  border rounded-4  my-3 ' >
    //     <div className='text-center text-dark'><h4>Useful Links</h4></div>
    //     <div className='container d-flex flex-column justify-content-center'>
    //         <div onClick={onClickTimeline} className=' d-flex align-items-center '>
    //             <HomeIcon fontSize='large' />
    //             <p style={{ color: "black", cursor: 'pointer' }}>Timeline</p>
    //         </div>
    //         <div onClick={onClickProfile} className='d-flex align-items-center  '>
    //             <AccountCircleIcon fontSize='large' />
    //             <p style={{ color: "black", cursor: 'pointer' }}>Your Profile</p>
    //         </div>
    //     </div>
    // </div>
  );
};

export default DirectionPage;
