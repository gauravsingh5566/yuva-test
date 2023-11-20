// import { CChart } from "@coreui/react-chartjs";
import { apiAuth, apiJsonAuth } from "api";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DoughnutInstitute from "./DoughnutInstitute";
import CertificateForm from "./CertificateForm";
import { LocalFireDepartmentSharp, LocationCity, Person, SchoolOutlined } from "@mui/icons-material";
import UploadResources from "./UploadResources";
import InstituteGallery from "./InstituteGallery";
import { useGlobalContext } from "global/context";
import useError from "lib/errorResponse";
import { Clear, FilePresentTwoTone, Search } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, Avatar, TextField, Tooltip } from "@mui/material";
import { postAffiliateInstitute, deleteAffiliateInstitute } from "./APIHandleFunction";
import moment from "moment";
import AdminStudentRegistration from "./AdminStudentRegistration";
import StudentBulkLoginAdmin from "./StudentBulkLoginAdmin";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";
import { Tab, Tabs } from "react-bootstrap";

function SingleInstitutesData() {
  let [datas, setData] = useState("");
  let [limit, setLimit] = useState(10);
  let [dataCoordinator, setDataCoordinator] = useState([]);
  let [dataStudent, setDataStudent] = useState([]);
  let [dataDelegates, setDataDelegates] = useState([]);
  let [certificatesByInstitutes, setCertificatesByInstitutes] = useState();
  let [affiliated, setAffiliated] = useState([]);
  let [update, setUpdate] = useState(0);
  let [searchTerm, setSearchTerm] = useState("");
  let { token, adminRoles, userData } = useGlobalContext();
  let [students, setStudents] = useState([]);
  const { ErrorResponder } = useError();

  const navigate = useNavigate();
  let id = useParams();
  let location = useLocation();
  let url = location.pathname.split("/");
  let idToSend = id.id;

  const getDataById = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/institute/${id.id}`);
      if (res.status == 200) {
        setData(res?.data?.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCoordinator = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/coordinator/${id?.id}`);
      if (res.status == 200) {
        setDataCoordinator(res?.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getStudentData = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/students/${id?.id}`);
      if (res.status == 200) {
        setDataStudent(res?.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getDelegatesData = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/delegates/${id?.id}`);
      if (res.status == 200) {
        setDataDelegates(res?.data?.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCertificatesByInstitutes = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/institute-certificates/${id.id}`);
      if (res.status == 200) {
        setCertificatesByInstitutes(res?.data?.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudents = async () => {
    if (token) {
      try {
        const res = await apiJsonAuth.get(`/institute/data/?type=students&instituteId=${url[3]}&search=${searchTerm}`, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setStudents(res.data.result);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  async function getAffiliateInstitute() {
    try {
      const res = await apiAuth.get(`admin/institute-affiliate/${id.id}`);
      if (res.status == 200) {
        setAffiliated(res?.data?.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataById();
    getCoordinator();
    getStudentData();
    getDelegatesData();
    getCertificatesByInstitutes();
  }, [students]);
  useEffect(() => {
    getAffiliateInstitute();
    getStudentData();
  }, [update]);

  return (
    <div>
      <SimpleBreadCrumb2
        page={`Institute Data`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/institutes", text: "Institutes" },
          { link: "/admin/institutes", text: datas?.institution_name, active: true },
        ]}
      />
      <div className={"container py-3"}>
        {/* Title And Affiliation,Edit Button  */}
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-start mb-2">
            <Avatar src={datas["logo"]} className="rounded-0">
              <SchoolOutlined />
            </Avatar>
            <div className="px-2">
              <h4 className="m-0 lh-sm">
                &nbsp;
                {datas?.institution_name}
              </h4>
              <small>
                &nbsp;
                {datas?.district},{datas?.state},{datas?.pincode}
              </small>
            </div>
          </div>
          {url[2] !== "affiliate-institutes" ? (
            <div className="d-flex justify-content-end mb-2">
              <button
                hidden={adminRoles() === 5}
                className="btn me-1"
                onClick={() => {
                  navigate("/admin/editdetail/institute/" + idToSend);
                }}
                type="button">
                Edit Details
              </button>
              {!affiliated[0]?.instituteId ? (
                <button
                  hidden={adminRoles() === 5}
                  className="btn"
                  onClick={() => {
                    postAffiliateInstitute(id.id, () => {
                      setUpdate(update + 1);
                    });
                  }}
                  type="button">
                  Affiliate to Institute
                </button>
              ) : (
                <button
                  hidden={adminRoles() === 5}
                  className="btn btn-primary m-3 "
                  onClick={() => {
                    deleteAffiliateInstitute(affiliated[0]?.id, () => {
                      setUpdate(update + 1);
                    });
                  }}
                  type="button">
                  Remove Affiliate Institute
                </button>
              )}
              {affiliated[0]?.instituteId == id?.id ? <p className="fs-3 mt-4">This Institute is Affiliated</p> : ""}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Tabs To Manage All Details  */}
        <Tabs defaultActiveKey="detail" id="institute-detail-tab" className="my-3 settings-navs">
          {/* Details  */}
          <Tab eventKey="detail" title={<small>Details</small>}>
            {/* Institutes Data  */}
            {/* Data Representation  */}
            <div className="charts row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 mb-3">
              <div className="col">
                <DoughnutInstitute Student={dataStudent?.length} allStudents={datas?.question1} StudentName={"Students"} allStudentsName={"All Students"} />
              </div>
              <div className="col">
                <DoughnutInstitute Student={dataStudent?.length - dataDelegates?.length} allStudents={dataDelegates?.length} StudentName={"Students"} allStudentsName={"Delegates "} />
              </div>
              <div className="col">
                <DoughnutInstitute Student={dataStudent?.length - certificatesByInstitutes?.length} allStudents={certificatesByInstitutes?.length} StudentName={"Students"} allStudentsName={"Certificates"} />
              </div>
            </div>
            <div className="table-responsive institute-data">
              <table className="table table-borderless  table-lg">
                <tbody>
                  {Object.keys(datas).map((keyName, index) => {
                    const regex = /title|first_name|last_name|institution_name|institution_address|ytb|lkd|twitter|ig|state|pincode|email|contact/;
                    if (regex.test(keyName))
                      return (
                        <tr key={index} className={`${!datas[keyName] ? "d-none" : ""}`}>
                          <th scope="row" className=" fs-6 text-capitalize">
                            {keyName?.replace("_", " ")}
                          </th>
                          <td>
                            <span className="fs-6 line-clamp-blog"> {datas[keyName]}</span>
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </table>
            </div>
          </Tab>
          {/* Students Data  */}
          <Tab eventKey="students-data" title={<small>Students Data</small>}>
            <div>
              <div className="row row-cols-1 row-cols-lg-2 mb-2">
                <div className="col">
                  <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        fetchStudents();
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
                              sx={{
                                background: "red",
                                color: "white",
                                margin: "20px",
                              }}
                              onClick={() => {
                                setSearchTerm("");
                                fetchStudents();
                              }}>
                              <Clear />
                            </IconButton>
                          ) : (
                            ""
                          )}
                          <IconButton
                            sx={{ background: "orange", color: "white" }}
                            onClick={() => {
                              fetchStudents();
                            }}>
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </div>
                <div className="col">
                  <div className="d-flex">
                    <AdminStudentRegistration hidden={!(adminRoles() === 1)} collegeId={idToSend} update={update} setUpdate={setUpdate} />
                    <StudentBulkLoginAdmin instituteId={datas?.instituteId} />
                  </div>
                </div>
              </div>
              <div className="student-data table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="p-3 px-2">
                        Profile
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Student&nbsp;Name
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Guardian&nbsp;name
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Address
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Email
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Contact
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Resume
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Status
                      </th>
                      <th scope="col" className="p-3 px-2">
                        DOB
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Gender
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Facebook
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Twitter
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Instagram
                      </th>
                      <th scope="col" className="p-3 px-2">
                        LinkedIn
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Youtube
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Created&nbsp;At
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Updated&nbsp;At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(students.length ? students : dataStudent).map((data, index) => {
                      if (index < limit)
                        return (
                          <tr>
                            <td>
                              <Avatar src={data?.profile} alt={data?.first_name}></Avatar>
                            </td>
                            <td>
                              {data?.first_name} {data?.last_name}
                            </td>
                            <td>{data?.father_name}</td>
                            <td>
                              {data?.district} {data?.state} {data?.pincode}
                            </td>
                            <td>{data?.email}</td>
                            <td>{data?.contact}</td>
                            <td>{data?.resume}</td>
                            <td>{data?.status}</td>
                            <td>{moment(data?.dob).calendar()}</td>
                            <td>{data?.gender}</td>
                            <td>{data?.fb}</td>
                            <td>{data?.twitter}</td>
                            <td>{data?.insta}</td>
                            <td>{data?.lkd}</td>
                            <td>{data?.ytb}</td>
                            <td>{data?.created_At}</td>
                            <td>{data?.updated_At}</td>
                          </tr>
                        );
                    })}
                  </tbody>
                </table>
                <div className="d-flex align-items-center pb-4">
                  <span className="text-dark me-2">
                    Showing {limit < dataStudent.length ? limit : dataStudent.length} of {dataStudent.length}
                  </span>
                  <Button
                    variant="outlined"
                    color="success"
                    className="me-2"
                    onClick={() => {
                      setLimit(limit + 5);
                    }}>
                    Load More <LocalFireDepartmentSharp className="fs-6" />
                  </Button>
                  <Button
                    className="me-2"
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setLimit(10);
                    }}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </Tab>
          {/* Institute Gallery  */}
          <Tab eventKey="gallery" title={<small>Gallery</small>}>
            <InstituteGallery />
          </Tab>
          {/* Uploaded Resources  */}
          <Tab eventKey="resources" title={<small>Institute Resources</small>}>
            <UploadResources />
          </Tab>
          {/* Certificates Data  */}
          <Tab eventKey="certificates" title={<small>Certificates Data</small>}>
            {/* Certificates Data  */}
            <div>
              <div className="certificates-by-institutes-data table-responsive">
                <table class="table table-borderless table-lg">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="p-3 px-2">
                        Profile
                      </th>
                      <th scope="col" className="p-3 px-2">
                        StudentId
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Name
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Certificate Key
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Accredited By
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Endorsed By
                      </th>
                      <th scope="col" className="p-3 px-2">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificatesByInstitutes?.map((value, index) => {
                      return (
                        <>
                          <tr>
                            <th className="p-3" scope="row">
                              <Avatar src={value?.profile} sx={{ backgroundColor: "orange" }}>
                                <Person />
                              </Avatar>
                            </th>
                            <td>{value?.studentId}</td>
                            <td>{value?.first_name + " " + value?.last_name}</td>
                            <td scope="row">{value?.certificate_key}</td>
                            <td>{value?.accredited_by}</td>
                            <td>{value?.endorsed_by}</td>
                            <td>{value?.created_at}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Institute Specific Certificate*/}
            <CertificateForm id={idToSend} />
          </Tab>
          {/* Coordinators Data  */}
          <Tab eventKey="coordinators" title={<small>Coordinators</small>}>
            <div className="table-responsive coordinator-data">
              <table className="table table-borderless">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="p-3 px-2">
                      Id
                    </th>
                    <th scope="col" className="p-3 px-2">
                      Name
                    </th>
                    <th scope="col" className="p-3 px-2">
                      Email
                    </th>
                    <th scope="col" className="p-3 px-2">
                      Contact
                    </th>
                    <th scope="col" className="p-3 px-2">
                      Designation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataCoordinator?.map((value, index) => {
                    return (
                      <>
                        <tr>
                          <th scope="row" className="p-3 px-2">
                            {value?.id}
                          </th>
                          <td className="p-3 px-2">{value?.name}</td>
                          <td className="p-3 px-2">{value?.email}</td>
                          <td className="p-3 px-2">{value?.contact}</td>
                          <td className="p-3 px-2">{value?.designation}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Tab>
          {/* Delegates Data  */}
          <Tab eventKey="participants-data" title={<small>Participants Data</small>}>
            <div className="delegates-data m-3 table-responsive">
              <table class="table table-borderless">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="p-3 px-2">
                      ID
                    </th>
                    <th scope="col" className="p-3 px-2">
                      StudentId
                    </th>
                    <th scope="col" className="p-3 px-2">
                      DesignationId
                    </th>
                    <th scope="col" className="p-3 px-2">
                      CountryId
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataDelegates?.map((value, index) => {
                    return (
                      <>
                        <tr>
                          <th className="p-3 px-2" scope="row">
                            {value?.id}
                          </th>
                          <td className="p-3 px-2">{value?.studentId}</td>
                          <td className="p-3 px-2">{value?.designationId}</td>
                          <td className="p-3 px-2">{value?.countryId}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default SingleInstitutesData;
