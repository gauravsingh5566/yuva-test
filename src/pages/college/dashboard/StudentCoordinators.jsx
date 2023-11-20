import { Button } from '@mui/material';
import { apiAuth, apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import NotFoundGif from 'layout/NotFoundGif';
import { Popup } from 'layout/Popup';
import useError from 'lib/errorResponse';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';
import StudentCoordinatorCard from './components/StudentCoordinatorCard';
import SimpleBreadCrumb from 'layout/SimpleBreadCrumb';

function StudentCoordinators() {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [StdCoordinates, setStdCoordinate] = useState([]);
  const { fetchStdCoordinate, StdCoordinate } = useOutletContext();

  const removeFromCoordeinator = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove student from Coordinaters',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (token) {
          try {
            const res = await apiJsonAuth.delete(`/institute/studentCoordinate?studentId=${id}`, {
              headers: {
                Authorization: token,
              },
            });
            if (res.status === 200) {
              Popup('success', ' Student Removed Coordinaters');
              fetchStdCoordinate();
            }
          } catch (err) {
            ErrorResponder(err); // Popup("error", err.response.data.message);
          }
        }
      }
    });
  };

  return (
    <div>
      <SimpleBreadCrumb page={'Student Coordinators'} />
      {StdCoordinate.length ? (
        <div className="container">
          <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-4">
            {StdCoordinate.map((coordinate, i) => {
              return <StudentCoordinatorCard key={i} student={coordinate} removeFromCoordeinator={removeFromCoordeinator} />;
            })}
          </div>
        </div>
      ) : (
        <NotFoundGif text={'No Student Coordinator Added Yet!'} />
      )}
    </div>
  );
}

export default StudentCoordinators;
