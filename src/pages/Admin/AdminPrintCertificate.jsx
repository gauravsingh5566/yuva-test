import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SimpleBreadCrumb from 'layout/SimpleBreadCrumb';
import { Button, TextField } from '@mui/material';
// import certParticipation from "assets/cert/participation2.png";
// import certAchevement from "assets/cert/Achievement2.png";
// import certAppreciation from "assets/cert/appreciation2.png";
import html2canvas from 'html2canvas';
import { api, apiAuth } from 'api';
import Swal from 'sweetalert2';

const AdminPrintCertificate = () => {
  const [mpname, setMpname] = React.useState({});
  const [mpList, setMpList] = React.useState([]);
  const [name, setName] = React.useState('');
  const [certName, setCertName] = React.useState('participation');
  const handleChange = (event) => {
    setMpname(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeCertName = (event) => {
    setCertName(event.target.value);
  };
  const renderCert = {
    participation: 'certParticipation', // Replace these with image imports
    achievement: 'certAchevement', // Replace these with image imports
    appreciation: 'certAppreciation', // Replace these with image imports
  };

  //Fetch MP Names
  const fetchMp = async () => {
    try {
      const res = await apiAuth.get('/admin/constituency');
      if (res?.status === 200) {
        setMpList(res?.data?.result);
      }
    } catch (err) {
      if (err) {
        Swal.fire({
          title: 'Error',
          text: err.response.data.message ? err.response.data.message : 'Something Went Wrong',
          icon: 'error',
        });
      }
    }
  };
  useEffect(() => {
    fetchMp();
  }, []);

  function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
  }
  //   ================
  //   Print Certificate
  //   ================
  const printCert = () => {
    Swal.showLoading();
    if (!mpname) {
      Swal.close();
      Swal.fire({
        title: 'Select a MP Name',
        icon: 'warning',
        width: 400,
      });
    } else {
      const input = document.getElementById('certificate');
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const certHeight = document.getElementById('certificate').scrollHeight;
        const certWidth = document.getElementById('certificate').scrollWidth;
        downloadURI(imgData, 'certificate.jpg');
        Swal.fire({
          title: 'Generated',
          icon: 'success',
          width: 400,
        });
      });
    }
  };
  return (
    <div>
      <SimpleBreadCrumb page={'Generate Certificate'} />
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-lg-9">
            <div id="certificate" className="p-relative">
              <img src={renderCert[certName]} className="w-100 d-block" alt="" />
              <p className="text-initial p-absolute center-student-name font-cert">{name}</p>
              <div className="p-absolute center-mp-name ">
                <p className="font-cert fw-bold">{mpname?.Name}</p>
                <p className="font-cert">Member of Parliament, {mpname?.District}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <div className="p-3">
              <Box sx={{ minWidth: 120, mt: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Name of Constituency</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mpname}
                    label="Name of Constituency"
                    onChange={handleChange}>
                    {mpList.map((item, index) => {
                      return (
                        <MenuItem value={item}>
                          {item?.District},<em className="text-secondary">&nbsp;({item?.Name})</em>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120, mt: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Name of Certificate</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={certName}
                    label="Name of Certificate"
                    onChange={handleChangeCertName}>
                    <MenuItem value={'achievement'}>Achivement</MenuItem>
                    <MenuItem value={'participation'}>Participation</MenuItem>
                    <MenuItem value={'appreciation'}>Appreciation</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120, mt: 3 }}>
                <TextField fullWidth onChange={handleChangeName} id="outlined-basic" label="Name of Student (if any)" variant="outlined" />
              </Box>
              {name}
              <Box sx={{ mt: 3 }}>
                <Button onClick={printCert} variant={'contained'} color={'warning'}>
                  Download
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPrintCertificate;
