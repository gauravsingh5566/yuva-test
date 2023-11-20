import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataListTable from './DataListTable';

const FilterStudentList = ({ startDate, endDate, status, type }) => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [institutes, setInstitutes] = useState([]);

  const showList = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + 'admin/getInfoFilter', {
        params: {
          startDate: startDate,
          endDate: endDate,
          status: status,
        },
      })
      .then((response) => {
        setInstitutes(response.data.institutes);
        setStudents(response.data.students);
        setTeachers(response.data.teachers);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    showList();
  }, []);

  useEffect(() => {
    showList();
  }, [startDate, endDate, status, type]);

  return (
    <div>
      {(type === 'all' || type === 'students') && students.length > 0 ? (
        <>
          <h4>Students</h4>
          <DataListTable data={students} dataType="students" />
        </>
      ) : null}

      {(type === 'all' || type === 'teachers') && teachers.length > 0 ? (
        <>
          <h4>Teachers</h4>
          <DataListTable data={teachers} dataType="teachers" />
        </>
      ) : null}

      {(type === 'all' || type === 'institutes') && institutes.length > 0 ? (
        <>
          <h4>Institutes</h4>
          <DataListTable data={institutes} dataType="institutes" />
        </>
      ) : null}
    </div>
  );
};

export default FilterStudentList;
