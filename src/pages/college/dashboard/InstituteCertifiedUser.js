import { Avatar, Button } from '@mui/material';
import { apiAuth } from 'api';
import { useGlobalContext } from 'global/context';
import NotFoundGif from 'layout/NotFoundGif';
import SimpleBreadCrumb from 'layout/SimpleBreadCrumb';
import useError from 'lib/errorResponse';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Studentheads = ['Profile', 'First Name', 'Last Name', 'Certificate_key', 'Accredited_by', 'Endorsed by', 'Date'];

const InstituteCertifiedUser = () => {
  const [certificates, setCertificates] = useState([]);
  const { token } = useGlobalContext();
  const { ErrorResponder } = useError();
  const { role } = useParams();
  // FetchCertificates
  const fetchCertificates = async () => {
    if (token) {
      try {
        const res = await apiAuth.get(`/institute/certificates?role=` + role, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setCertificates(res.data.result);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  useEffect(() => {
    fetchCertificates();
  }, [role]);

  return (
    <>
      <SimpleBreadCrumb page={`${role} Certifications`} />
      <div className="container py-4">
        {certificates.length ? (
          <div className="table-responsive rounded-4 shadow-sm border">
            <table className="table table-borderless table-striped table-light">
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
                {certificates.map((row, i) => {
                  return (
                    <tr key={i}>
                      <td className="p-2">
                        <Avatar alt={row.first_name} src={row?.profile} sx={{ width: 40, height: 40 }} />
                      </td>
                      {/* <td className="p-3">{row?.studentId}</td> */}
                      <td className="p-3">{row?.first_name}</td>
                      <td className="p-3">{row?.last_name}</td>
                      <td className="p-3">{row?.certificate_key}</td>
                      <td className="p-3">{row?.accredited_by}</td>
                      <td className="p-3">{row?.endorsed_by}</td>
                      <td className="p-3">{moment(row?.createdAt).calendar()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <NotFoundGif text={'No Certificates Issued Yet!'} />
        )}
      </div>
    </>
  );
};

export default InstituteCertifiedUser;
