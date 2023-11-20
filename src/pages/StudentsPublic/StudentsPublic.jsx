import { apiAuth } from 'api';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Email, LocationCity } from '@mui/icons-material';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

// function StudentsPublic() {
//   return (
//     <div>
//       <h1>Students Public</h1>
//     </div>
//   )
// }

function StudentsPublic() {
  let [students, setStudents] = useState('');

  async function getPublicStudents() {
    let id = 320;
    try {
      const res = await apiAuth.get('public/students?id=' + id);
      if (res.status === 200) {
        // console.log(res?.data[0])
        setStudents(res?.data[0]);
      }
    } catch (err) {}
  }
  useEffect(() => {
    getPublicStudents();
  }, []);
  return (
    <>
      <div className="card mb-3">
        <div className="card-img-top " alt={students[0]?.first_name + students[0]?.last_name}>
          <img src="https://glcloud.in/images/static/logoassest/img10.webp" style={{ height: 'auto', width: '100vw' }} />
        </div>
        <div
          className=" "
          style={{
            zIndex: '1',
            transform: `translateX(${10}%) translateY(${62}%)`,
          }}>
          <Avatar src="https://glcloud.in/images/static/events/goa/goa3.webp" sx={{ width: '12vw', height: '30vh' }} />
        </div>
        <hr className="border border-top-5 border-dark" />
        <div className="card-body mt-5">
          <h4 className="card-title">
            {students[0]?.first_name}&nbsp;{students[0]?.last_name}
          </h4>

          <div className="col-12">
            <a href={`mailto:${students[0]?.email}`} className="text-dark">
              <Email
                sx={{
                  fontSize: 16,
                  color: 'orange',
                  border: '1px solid orange',
                  borderRadius: 1,
                  mr: 1,
                }}
              />{' '}
              Email : {students[0]?.email}
            </a>
          </div>
          <div className="col-12 text-dark">
            <LocationCity
              sx={{
                fontSize: 16,
                color: 'orange',
                border: '1px solid orange',
                borderRadius: 1,
                mr: 1,
              }}
            />{' '}
            Institution : {students[0]?.institution_name}
            {/* </a> */}
          </div>
          <div className="col-12 text-dark">
            <CardMembershipIcon
              sx={{
                fontSize: 16,
                color: 'orange',
                border: '1px solid orange',
                borderRadius: 1,
                mr: 1,
              }}
            />{' '}
            certification : {students[0]?.course_name}
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h4 className="card-title">Certifications</h4>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4 ">
                <img src={students[0]?.img} style={{ maxHeight: '200px' }} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h4 className="card-title">{students[0]?.course_name}</h4>
                  <p className="card-text">Certificate key : {students[0]?.certificate_key} </p>
                  <p className="card-text">
                    <small className="text-body-secondary">Issued : {students[0]?.createdAt}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-12 text-dark">
                        <CardMembershipIcon
                            sx={{
                                fontSize: 16,
                                color: "orange",
                                border: "1px solid orange",
                                borderRadius: 1,
                                mr: 1,
                            }}
                        />{" "}
                        {students[0]?.course_name}

                    </div> */}
        </div>
      </div>
    </>
  );
}

export default StudentsPublic;
