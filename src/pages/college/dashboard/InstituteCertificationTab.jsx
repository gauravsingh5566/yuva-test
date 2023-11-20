import { Avatar, Button, MenuItem, Select } from '@mui/material';
import NotFoundGif from 'layout/NotFoundGif';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
const Studentheads = ['Profile', 'First Name', 'Last Name', 'Certificate_key', 'Accredited_by', 'Endorsed by', 'Actions'];
const InstituteCertificationTab = () => {
  const [details, students, fetchStudents, fetchDelegates, certificates] = useOutletContext();
  const [certificate, setCertificate] = useState(certificates);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('first_name');
  useEffect(() => {
    setCertificate(certificates);
  }, [certificates]);

  function search() {
    if (searchTerm.length) {
      let list = certificates?.filter((i) => {
        return i[searchBy].toLowerCase().includes(searchTerm.toLowerCase());
      });
      setCertificate(list);
    } else {
      setCertificate(certificates);
    }
  }

  return (
    <div className="container">
      <div>
        <div class="col-12 col-lg-8 m-2">
          <div class="input-group m-1">
            <input
              class="form-control"
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  search();
                }
              }}
              value={searchTerm}
              placeholder={'Search Name Here....'}
              aria-label={'Search Name Here....'}
              aria-describedby="button-addon2"
            />
            {searchTerm.length ? (
              <button
                class="btn text-danger btn-outline-secondary"
                type="button"
                id="button-addon3"
                onClick={() => {
                  setSearchTerm('');
                  search();
                }}>
                <i class="bi bi-x-circle  "></i>
              </button>
            ) : (
              ''
            )}
            <Select className="form-select m-1" value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="">
              <MenuItem className="p-2" value="first_name">
                First Name
              </MenuItem>
              <MenuItem className="p-2" value="certificate_key">
                Certificate key
              </MenuItem>
              <MenuItem className="p-2" value="endorsed_by">
                Endorsed By
              </MenuItem>
            </Select>
            <button
              class="btn btn-outline-secondary bg-success rounded-end text-white"
              type="button"
              id="button-addon2"
              onClick={() => {
                search();
              }}>
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
      {certificate?.length ? (
        <div className="table-responsive border rounded rounded-3 p-2 py-3">
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
              {certificate.map((row, i) => {
                return (
                  <tr key={i}>
                    <td className="p-3">
                      <Avatar alt={row.first_name} src={row?.profile} sx={{ width: 46, height: 46 }} />
                    </td>
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
  );
};

export default InstituteCertificationTab;
