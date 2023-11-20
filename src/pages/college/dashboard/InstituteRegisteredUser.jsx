import { Avatar } from '@mui/material';
import { apiAuth } from 'api';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import StudentProfileCard from './components/StudentProfileCard';
import { useOutletContext, useParams } from 'react-router-dom';
import { useGlobalContext } from 'global/context';
import NotFoundGif from 'layout/NotFoundGif';
import StudentBulkLogin from './components/StudentBulkLogin';
import useError from 'lib/errorResponse';
import SimpleBreadCrumb from 'layout/SimpleBreadCrumb';
const Studentheads = ['Profile', 'Name', 'state', 'pincode', 'email', 'contact', 'Actions'];

const InstituteRegisteredUser = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const { role } = useParams();
  const { details, students, fetchStudents, fetchDelegates, delegates, fetchStudentsStdCoordinators, StdCoordinate, searchTerm, setSearchTerm } =
    useOutletContext();
  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete');
    if (confirmation) {
      if (token) {
        try {
          const res = await apiAuth.delete('/institute/student?studentId=' + id, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status == 200) {
            toast.dismiss();
            toast.success(res.data.message);
            fetchStudents();
          }
        } catch (error) {
          ErrorResponder(error);
          toast.dismiss();
          toast.error(error?.response?.data?.message);
        }
      }
    }
  };
  const [filterDelegates, setFilterDelegates] = useState([]);
  const mapDelegates = () => {
    let localfilterDelegates = [];
    delegates.map((value) => {
      localfilterDelegates.push(value.studentId);
    });
    setFilterDelegates(localfilterDelegates);
  };
  useEffect(() => {
    mapDelegates();
  }, [students]);
  return (
    <div>
      <SimpleBreadCrumb page={role} />
      <div className="container py-2">
        <div className="mb-2">
          <StudentBulkLogin
            details={details}
            data={students}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            reload={fetchStudents}
            role={role}
          />
        </div>
        <p className="fs-6">
          Total {role} is{' '}
          {
            students?.filter((i) => {
              return i.role === role;
            }).length
          }
        </p>
        {students.length ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-1 g-md-2 g-lg-3 row-cols-lg-4">
            {students.map((student, i) => {
              if (student?.role === role)
                return (
                  <StudentProfileCard
                    key={i}
                    details={details}
                    stdCoordinator={StdCoordinate}
                    student={student}
                    role={role}
                    fetchStudents={fetchStudents}
                    handleDelete={handleDelete}
                    fetchDelegates={fetchDelegates}
                    delegates={filterDelegates}
                    fetchStudentsStdCoordinators={fetchStudentsStdCoordinators}
                  />
                );
            })}
          </div>
        ) : (
          <NotFoundGif text={'No Student Has Registered Yet!'} />
        )}
      </div>
    </div>
  );
};

export default InstituteRegisteredUser;
