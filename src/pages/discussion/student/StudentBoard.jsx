import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

const StudentBoard = () => {
  const [studentData, notreq1, notreq2, fetchDetails] = useOutletContext();
  return (
    <div className="min-vh-100">
      <Outlet context={[studentData, fetchDetails]} />
    </div>
  );
};

export default StudentBoard;
