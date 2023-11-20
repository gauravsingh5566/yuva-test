import { Avatar, Button } from '@mui/material';
import { apiAuth } from 'api';
import { useGlobalContext } from 'global/context';
import NotFoundGif from 'layout/NotFoundGif';
import SimpleBreadCrumb from 'layout/SimpleBreadCrumb';
import useError from 'lib/errorResponse';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const Studentheads = ['Course', 'Title', 'Full Name', 'Enrollment Date'];

const InstituteEnrolledUser = () => {
  const [Enrollments, setEnrollments] = useState([]);
  const { token } = useGlobalContext();
  const { ErrorResponder } = useError();
  const { role } = useParams();
  // FetchEnrollments
  const fetchEnrollments = async () => {
    if (token) {
      try {
        const res = await apiAuth.get(`/institute/enrollments?role=` + role, {
          headers: {
            Authorization: token,
          },
        });
        if (res?.data?.status === 'success') {
        }
        switch (res?.data?.status) {
          case 'success':
            setEnrollments(res.data.result);
            break;
          case 'warning':
            toast.warning(res?.data?.message);
            break;
          case 'error':
            toast.error(res?.data?.message);
            break;
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  useEffect(() => {
    fetchEnrollments();
  }, [role]);
  return (
    <>
      <SimpleBreadCrumb page={`${role} Enrollments`} />
      <div className="container py-4">
        {Enrollments.length ? (
          <div className="table-responsive border shadow-sm rounded-4">
            <table className="table table-borderless table-striped table-light ">
              <thead>
                <tr>
                  {Studentheads.map((head, i) => {
                    return (
                      <th key={i} scope="col" className="fw-semibold text-capitalize p-3">
                        {head}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {Enrollments.map((row, i) => {
                  return (
                    <tr key={i}>
                      <td className="p-2 p-relative">
                        <Avatar className="rounded-1" alt={row?.course_name} src={row?.thumbnail} sx={{ width: 76, height: 46 }} />
                        <Avatar
                          alt={row.first_name}
                          src={row?.profile}
                          sx={{ width: 26, height: 26 }}
                          style={{ bottom: '0px', left: '0px', position: 'absolute' }}
                        />
                      </td>
                      {/* <td className="p-3">{row?.studentId}</td> */}
                      <td className="p-3">{row?.course_name}</td>
                      <td className="p-3">{row?.first_name + ' ' + row?.last_name}</td>
                      <td className="p-3">{moment(row?.createdAt).calendar()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <NotFoundGif text={'No Enrollments Issued Yet!'} />
        )}
      </div>
    </>
  );
};

export default InstituteEnrolledUser;
