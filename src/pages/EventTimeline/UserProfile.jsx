import React, { useContext } from 'react';
import UserReport from './UserReport';
import Left from './components/TimelineLeft';
import MainProfile from './components/MainProfile';
import ProfilePage from './ProfilePage';
import { UserContext } from 'global/context';
import InstitutePosts from './InstitutePosts';
import { Button, IconButton } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const { userData, token } = useContext(UserContext);
  const { role, type, id } = userData;

  return (
    <>
      {/* <MainProfile/> */}
      <ProfilePage />
      <br />
      <h4 style={{ display: 'inline' }}>Get back to Timeline</h4> &nbsp;&nbsp;{' '}
      <Button
        color="success"
        onClick={function () {
          navigate('/timeline/');
        }}
        size="sm"
        variant="solid">
        Timeline
      </Button>
      <br />
      <br />
      {role === 'admin' ? (
        <div className="">
          <UserReport />
          <br />
          <br />

          <InstitutePosts />
        </div>
      ) : (
        <UserReport />
      )}
    </>
  );
};

export default UserProfile;
