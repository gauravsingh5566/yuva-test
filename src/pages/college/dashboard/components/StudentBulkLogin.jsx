import { Cancel, Check, Clear, Email, FilePresentTwoTone, FileUpload, FileUploadTwoTone, Search } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import { apiJsonAuth } from 'api';
import { Popup, pop2 } from 'layout/Popup';
import React, { useEffect, useRef, useState } from 'react';
import * as xlsx from 'xlsx';
import AddIcon from '@mui/icons-material/Add';
import { useGlobalContext } from 'global/context';
import useError from 'lib/errorResponse';
import StudentRegisterForm from 'pages/Auth/StudentRegisterForm';
import StudentSingleRegister from './StudentSingleRegister';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import BulkDataFormat from './BulkDataFormat';
import { Suspense } from 'react';
import LoaderSplash from 'layout/LoaderSplash';
// import { fetchStudents } from "pages/college/DashboardInstitute";

function StudentBulkLogin({ details, data, searchTerm, setSearchTerm, reload, role }) {
  const [fileName, setFileName] = React.useState();
  const [file, setFile] = React.useState();
  const [fileData, setFileData] = React.useState();
  const [dataSaved, setDataSaved] = React.useState();
  const [dataFailed, setDataFailed] = React.useState();
  const [student, setStudent] = useState([]);
  const { userData, token } = useGlobalContext();
  const closeBtn = useRef();
  const { ErrorResponder } = useError();
  let [update, setUpdate] = useState(0);
  const setStudentData = async () => {
    if (file && fileData && token) {
      try {
        const formData = new FormData();
        formData.append('file', file, file.originalname);
        formData.append('role', role);
        const responce = await apiJsonAuth.post('institute/bulklogin', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        });

        Popup('success', responce?.data?.message);
        if (responce.data.dataSaved) {
          setDataSaved(responce?.data?.dataSaved);
          setUpdate(update + 1);
        }
        if (responce.data.dataFailed) {
          setDataFailed(responce?.data?.dataFailed);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    } else {
      Popup('warning', 'File Not Found!');
    }
  };

  const convertFile = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      let fileType = file?.name.split('.').slice(-1);
      if (file && (fileType[0] === 'csv' || fileType[0] === 'xlsx' || fileType[0] === 'xls')) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: 'buffer', skiprows: 0 });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = xlsx.utils.sheet_to_json(worksheet);
          if (json.length === 0) {
            Popup('error', 'Data Not Found!');
            setFile();
          } else if (json.length > 1000) {
            Popup('error', 'Exceed Data Limit !!! \n Data Limit : 1000');
            setFile();
          } else if (!json[0]?.First_Name && !json[0]?.Contact && !json[0]?.Email) {
            Popup('error', 'File Format Incorrect');
            setFile();
          } else {
            setFileData(json);
          }
        };
      } else {
        Popup('error', 'File Format is not Suported!!');
      }
    }
  };
  function handleClose() {
    setDataSaved();
    setDataFailed();
    setFileData();
    setFileName();
    setFile();
  }

  function downloadSavedData() {
    let savelist = [];
    dataSaved.map((data) => {
      savelist.push({
        ID: data?.id,
        First_Name: data?.first_name,
        Last_Name: data?.last_name,
        Email: data?.email,
        Password: data?.password,
      });
    });
    downloadExcel(savelist);
  }
  const downloadExcel = (data) => {
    if (data) {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');
      xlsx.writeFile(workbook, 'SampleData.xlsx');
    }
  };
  useEffect(() => {
    if (token) {
      if (searchTerm === '') {
        reload();
      }
    }
  }, [searchTerm]);

  // Participants
  const [open, setOpen] = React.useState(false);
  const ApplyForParticipation = async (id) => {
    try {
      // toast.loading("Loading...")
      const result = await apiJsonAuth.post('/student/apply/delegate', {
        studentId: id,
        user: 'INSTITUTE',
      });
      switch (result?.data?.status) {
        case 'success':
          // toast.dismiss();
          // toast.success("Student is Added to Delegates.");
          // console.log("Student is Added to Delegates.");
          break;
        case 'warning':
          // toast.dismiss();
          // toast.warning(result?.data?.message);
          // console.log(result?.data?.message);
          break;
        case 'conflict':
          // toast.dismiss();
          // toast.warning(result?.data?.message);
          // console.log(result?.data?.message);
          break;
        case 'error':
          // toast.dismiss();
          // toast.error(result?.data?.message);
          // console.log(result?.data?.message);
          break;
        default:
          // toast.dismiss();
          // toast.info("OOps Something Went Wrong Please try again later.");
          // console.log("OOps Something Went Wrong Please try again later.")
          break;
      }
      reload();
    } catch (error) {
      console.log({ error });
    }
  };
  const BulkStudentAssigner = (array) => {
    array.forEach((candidate, index) => {
      if (index < autoAssignLimit) {
        ApplyForParticipation(candidate?.id);
        if (index === array.length - 1) {
          setOpen(false);
          toast.success('Auto Assigned the Designations.');
        }
      } else {
        setOpen(false);
        toast.success('Auto Assigned the Designations.');
      }
    });
  };
  useEffect(() => {
    reload();
  }, [update]);
  // console.log(details.id);

  // Related To BUlk Auto Assigner
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleAssignerOpen = () => {
    setOpen(true);
  };
  const handleAssignerClose = () => {
    setOpen(false);
  };
  const [autoAssignLimit, setAutoAssignLimit] = useState(20);
  let [eligibleCandidates, setEligibleCandidates] = useState([]);
  useEffect(() => {
    data?.forEach((student, index) => {
      if (student?.certified) {
        const arrayCheck = eligibleCandidates.map((candidate, index) => {
          return candidate.id;
        });
        if (!arrayCheck?.includes(student?.id)) {
          setEligibleCandidates([...eligibleCandidates, student]);
        }
      }
    });
    // console.log("ELIGIBLE", eligibleCandidates);
  }, [data, reload]);
  // const removeFromEligible = (id) => {
  //   let n = eligibleCandidates.findIndex((std) => std.id === id);
  //   let final = eligibleCandidates.splice(n, 1);
  //   console.log({ final });
  //   setEligibleCandidates(final)
  // }
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <div className="row g-2">
        {/* <div className="col-12 col-lg-6 rounded">
            <TextField
              className="m-1"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  reload();
                }
              }}
              value={searchTerm}
              label="Search Student Name Here...."
              fullWidth
              sx={{ borderRadius: 10 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {searchTerm.length ? (
                      <IconButton
                        sx={{ background: "red", color: "white", margin: "20px" }}
                        onClick={() => {
                          setSearchTerm("");
                          reload();
                          // console.log("Clicked");
                        }}
                      >
                        <Clear />
                      </IconButton>
                    ) : (
                      ""
                    )}
                    <IconButton
                      sx={{ background: "orange", color: "white" }}
                      onClick={() => {
                        reload();
                      }}
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div> */}
        <div className="col-12 col-lg-6">
          <div className="input-group border rounded-0">
            <input
              className="form-control border-0"
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  reload();
                }
              }}
              value={searchTerm}
              placeholder={'Search ' + role + ' Name Here....'}
              aria-label={'Search ' + role + ' Name Here....'}
              aria-describedby="button-addon2"
            />
            {searchTerm.length ? (
              <button
                className="btn btn-sm btn-danger border-0"
                type="button"
                id="button-addon3"
                onClick={() => {
                  setSearchTerm('');
                  reload();
                }}>
                <i className="bi bi-x-circle"></i>
                <small className="d-lg-inline-block">&nbsp;Clear</small>
              </button>
            ) : (
              ''
            )}
            <button
              className="btn btn-success fw-thin text-white border-0 rounded-0"
              type="button"
              id="button-addon2"
              onClick={() => {
                reload();
              }}>
              <i className="bi bi-search"></i>
              <small className="d-lg-inline-block">&nbsp;Search</small>
            </button>
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-center h-100 flex-wrap">
            <Button
              type="button"
              variant="outlined"
              color="success"
              className="text-capitalize rounded-3 p-3 me-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalLong"
              startIcon={<AddIcon />}
              disabled>
              New&nbsp;{role}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="success"
              className="text-capitalize me-1 rounded-3 p-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              startIcon={<FilePresentTwoTone />}
              disabled>
              Upload&nbsp;CSV
            </Button>
            {role === 'student' && (
              <Button
                type="button"
                variant="outlined"
                color="success"
                className="text-capitalize me-1 rounded-3 p-3"
                onClick={handleAssignerOpen}
                startIcon={<Check />}>
                Auto&nbsp;Assign
              </Button>
            )}
            {/* <div className="btn btn-outline-dark disabled rounded-3 d-inline-block">
                <small className="" style={{ color: "black" }} >
                  TOTAL&nbsp;Students&nbsp;<span className="pb-5" >{data.length} </span></small>
              </div> */}
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content w-100" style={{ minWidth: '100%' }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {role} Register
              </h5>
              <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body  p-0">
              <StudentSingleRegister closeBtn={closeBtn} collegeId={details.id} reload={reload} role={role} />
            </div>
          </div>
        </div>
      </div>
      {/* Bulk Upload Modal  */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h1 className="modal-title font-weight-bold fs-5" id="exampleModalLabel">
                {role} Bulk Register
              </h1>
              <button type="button" onClick={handleClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                {!dataSaved && (
                  <div>
                    {!fileData ? (
                      <div className="container mx-auto">
                        <div className="text-center item-center text-danger">
                          <span className="font-weight-bold text-decoration-underline">NOTE</span>
                          <br />
                          <span className="lh-1">
                            1. Only the Provided Format is allowed for file upload <br /> 2. Data limit is 1000 Users per Upload.{' '}
                          </span>{' '}
                          <br />
                          <Tooltip title="Use Provided file format to upload the student details">
                            <Button
                              className="mt-2"
                              variant="outlined"
                              color="info"
                              href="https://yuvamanthan.s3.ap-south-1.amazonaws.com/uploads/Student+Registration+Format.xlsx" ///"https://yuvamanthan.s3.ap-south-1.amazonaws.com/static/TempletFile.xlsx"
                              target="_blank">
                              Template Sheet
                            </Button>
                          </Tooltip>
                        </div>

                        <div className="border rounded-3 mt-4" style={{ position: 'relative', overflow: 'hidden' }}>
                          <input
                            className="fade"
                            style={{ minHeight: 240, width: '100%', zIndex: 200, position: 'relative' }}
                            type="file"
                            onClick={(e) => {
                              setFileData();
                              setFile();
                              e.target.value = null;
                            }}
                            onChange={(e) => {
                              setFile(e.target.files[0]);
                              convertFile(e);
                            }}
                            id="fileData"
                          />
                          {/* show Loading on file Uploda */}
                          {file && <LoaderSplash />}
                          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 100 }} className="w-100 h-100">
                            <div className="h-100 w-100 bg-light">
                              <div className="py-4 text-center">
                                <h4>Drag and drop or Click To Add File.</h4>
                                <img src="/images/upload-cloud-folder.png" alt="" width={200} style={{ objectFit: 'contain' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="input-group-append item-center text-center">
                          <Button
                            variant="outlined"
                            color="success"
                            className="rounded-3 mt-3 text-capitalize"
                            size="large"
                            type="button"
                            onClick={setStudentData}
                          >
                            <FileUploadTwoTone /> Upload Data
                          </Button>
                        </div> */}
                      </div>
                    ) : (
                      <BulkDataFormat data={fileData} setFileData={setFileData} setFile={setFile} upload={setStudentData} />
                    )}
                  </div>
                )}
              </div>
              <div hidden={!dataSaved || !dataSaved} className="container text-center item-center m-2 p-2">
                <p className=" text-decoration-underline lh-1"> Download the Data in Excel File </p>
                <p className="text-decoration-underline lh-1" style={{ color: 'red', fontSize: '15px' }}>
                  {' '}
                  (*Only Available once.){' '}
                </p>
                <Button hidden={!dataSaved?.length} className="rounded border mx-2" color="success" onClick={downloadSavedData}>
                  Registered Data
                </Button>
                <Button
                  hidden={!dataFailed?.length}
                  className="rounded border mx-2"
                  onClick={() => {
                    downloadExcel(dataFailed);
                  }}>
                  Unregistered Data
                </Button>
              </div>
              {/* Table for Student Registered */}
              {dataSaved && !!Object.keys(dataSaved).length && (
                <div className="container mx-auto my-4 align-items-center text-center">
                  <h5 className="font-weight-bold text-center ts-f">
                    {role} Registered {Object.keys(dataSaved).length}{' '}
                  </h5>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Password</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataSaved &&
                        dataSaved.map(({ id, first_name, last_name, contact, email, password }) => {
                          return (
                            <tr>
                              <td>{id}</td>
                              <td>{first_name}</td>
                              <td>{last_name} </td>
                              <td>{contact}</td>
                              <td>{email}</td>
                              <td>{password}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Table For Student Not Registered */}
              {dataFailed && !!Object.keys(dataFailed).length && (
                <div className="container mx-auto my-4 aline-cengter text-center">
                  <h5 className="font-weight-bold text-center">Student Failed To Register</h5>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataFailed &&
                        dataFailed.map(({ First_Name, Last_Name, Contact, Email, Error }) => {
                          return (
                            <tr>
                              <td>{First_Name}</td>
                              <td>{Last_Name} </td>
                              <td>{Contact}</td>
                              <td>{Email}</td>
                              <td className="text-danger font-weight-bold">{Error}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Bulk Assigner Modal  */}
      <Dialog fullScreen={fullScreen} open={open} onClose={handleAssignerClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'List Of Students Eligible For Auto Assign'}</DialogTitle>
        <DialogContent>
          <div className="d-flex align-items-center flex-wrap">
            <p className="fs-6 m-0 me-2">Select Number Of Participants (Delegates) </p>
            <div>
              <select name="limit" id="limit" className="form-select" value={autoAssignLimit} onChange={(e) => setAutoAssignLimit(e.target.value)}>
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="60">60</option>
              </select>
            </div>
          </div>
          <div className="table-responsive mt-2">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <td className="fw-semibold" scope="col">
                    Student Name
                  </td>
                  <td className="fw-semibold" scope="col">
                    Guardian Name
                  </td>
                  <td className="fw-semibold" scope="col">
                    Email Address
                  </td>
                  {/* <td className="fw-semibold" scope="col">Action</td> */}
                </tr>
              </thead>
              <tbody>
                {eligibleCandidates?.map((student, index) => {
                  if (index < autoAssignLimit) {
                    return (
                      <tr key={index}>
                        <th scope="row" className="fs-6 fw-light">
                          {student?.first_name + ' ' + student?.last_name}
                        </th>
                        <td className="fs-6 fw-light">{student?.father_name}</td>
                        <td className="fs-6 fw-light">{student?.email}</td>
                        {/* <td className="fs-6 fw-light"><IconButton onClick={() => removeFromEligible(student?.id)}><Cancel /></IconButton></td> */}
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            <div>
              <Button variant="contained" color="success" className="me-1 mb-1 rounded" onClick={() => BulkStudentAssigner(eligibleCandidates)}>
                Confirm
              </Button>
              <Button variant="outlined" color="error" className="me-1 mb-1 rounded" onClick={handleAssignerClose}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentBulkLogin;
