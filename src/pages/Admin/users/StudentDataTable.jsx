import { Avatar, Button, ButtonBase, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Popup, pop2 } from "layout/Popup";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import * as React from "react";
import { apiAuth, apiJsonAuth } from "../../../api";
import { Delete, LocationCity, Person2, SearchTwoTone } from "@mui/icons-material";
import useError from "lib/errorResponse";
import Swal from "sweetalert2";
import { useGlobalContext } from "global/context";
import { toast } from "react-toastify";
import MenuListContainer from "../components/MenuListContainer";
import { useNavigate } from "react-router-dom";
import SimpleBreadCrumb from "layout/SimpleBreadCrumb";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";
export default function StudentDataTable({ role }) {
  const heads = [
    { name: "id", sort: "id" },
    { name: `${role} Name`, sort: "first_name" },
    { name: "Institute Name", sort: "instituteId" },
    { name: "Guardian Name", sort: "father_name" },
    { name: "email", sort: "email" },
    { name: "contact", sort: "contact" },
    { name: "Joining Date", sort: "createdAt" },
    { name: "status", sort: "status" },
  ];
  const { ErrorResponder } = useError();
  const [data, setData] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("createdAt");
  const [sortPar, setSortPar] = React.useState(true);
  const [studentId, setStudentId] = React.useState(-1);
  const { adminRoles } = useGlobalContext();
  async function reload() {
    try {
      const res = await apiAuth.get(`admin?data=students&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=${search}&role=${role}`);
      if (res.status == 200) {
        setData(res?.data);
      }
    } catch (error) {
      Popup("error", "Something went wrong");
    }
  }
  async function clearReload() {
    try {
      const res = await apiAuth.get(`admin?data=students&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=`);
      if (res.status == 200) {
        setData(res?.data);
      }
    } catch (error) {
      Popup("error", "Something went wrong");
    }
  }
  const activate = async (studentId, email, status) => {
    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("email", email);
    if (status == "active") {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You wanted to Deactivate this Student!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Deactivate it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await apiAuth.post(`admin/student?req_type=deactivate`, formData);
              if (res.status == 200) {
                Swal.fire({
                  title: res.data.message,
                  icon: "success",
                });
                reload();
              }
            } catch (error) {
              Swal.fire({
                width: 400,
                title: error?.response?.data?.message ? error?.response?.data?.message : "Something Went Wrong Check your Network Connection",
                icon: "error",
              });
            }
          }
        });
      } catch (error) {
        ErrorResponder(error);
      }
    } else {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You wanted to Activate this Student!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Activate it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await apiAuth.post(`admin/student?req_type=activate`, formData);
              if (res.status == 200) {
                toast.success(res?.data?.message);
                reload();
              }
            } catch (error) {
              let msg = error?.response?.data?.message ? error?.response?.data?.message : "Something Went Wrong Check your Network Connection";
               toast.error(msg);
            }
          }
        });
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  async function deleteStudent(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You wanted to delete this Student!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await apiAuth.delete("admin/student-delete?id=" + id);
            if (res.status == 200) {
              Swal.fire({
                title: res.data.message,
                icon: "success",
              });
              reload();
            }
          } catch (error) {
            Swal.fire({
              width: 400,
              title: error?.response?.data?.message ? error?.response?.data?.message : "Something Went Wrong Check your Network Connection",
              icon: "error",
            });
          }
        }
      });
    } catch (err) {
      pop2(err);
    }
  }
  React.useEffect(() => {
    reload("clear");
  }, [offset, sort, sortPar, limit, role]);
  const navigate = useNavigate();
  const handleSort = (arg) => {
    if (arg == sort) {
      setSortPar(!sortPar);
    } else {
      setSort(arg);
    }
  };

  const handlePaginationNext = () => {
    let increment = Number(offset) + Number(limit);
    if (increment < data?.count) {
      setOffset(increment);
    }
  };

  const handlePaginationPrev = () => {
    let decrement = Number(offset) - Number(limit);
    if (decrement > 0) {
      setOffset(decrement);
    } else {
      setOffset(0);
    }
  };
  const clearSearch = () => {
    setSearch("");
    clearReload();
  };
  return (
    <div>
      <SimpleBreadCrumb2 page={`${role} Data`} navdata={[{ link: "/admin", text: "Home" }]} />
      <div className="container py-3">
        <div className="row">
          <div className="col-lg-8">
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              label={"Type Something here... "}
              fullWidth
              onKeyDown={(e) => {
                if (e.key == "Enter") reload();
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {search.length ? (
                      <Button color="error" onClick={clearSearch}>
                        <Delete /> clear
                      </Button>
                    ) : (
                      ""
                    )}

                    <Button onClick={reload}>
                      <SearchTwoTone /> Search
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="table-responsive border rounded mt-2">
          <table className="designed-table table table-borderless align-middle mb-0">
            <thead>
              <tr className="bg-light ">
                {heads.map((head, i) => {
                  return (
                    <th key={i} scope="col">
                      <ButtonBase onClick={() => handleSort(head.sort)} onDoubleClick={() => setSort(null)} className="fw-semibold text-capitalize p-2 px-1">
                        <div className="d-flex align-items-center">
                          <span className="text-nowrap">{head.name}</span>
                          {sort === head.sort && sortPar == true && <ArrowDropUpIcon sx={{ color: "green" }} />}
                          {sort === head.sort && sortPar == false && <ArrowDropDownIcon sx={{ color: "tomato" }} />}
                        </div>
                      </ButtonBase>
                    </th>
                  );
                })}
                <th hidden={adminRoles() === 5} scope="col" className="fw-semibold text-capitalize p-2 px-1">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.result?.map((row, i) => {
                if (i === 0) {
                }
                return (
                  <tr key={i} className="border-bottom">
                    <td className="p-2" width={50}>
                      <Avatar alt={row.first_name} src={row?.profile} sx={{ width: 36, height: 36, backgroundColor: "grey" }}>
                        <Person2 />
                      </Avatar>
                    </td>
                    <td className="py-3 px-1" style={{ width: 200 }}>
                      {row?.title} {row?.first_name} {row?.last_name}
                    </td>
                    <td className="py-3 px-1" style={{ width: 200 }}>
                      {row?.institution_name ? row?.institution_name : "No Institute"}
                    </td>
                    <td className="p-3 " style={{ width: 200 }}>
                      <span>{row?.father_name}</span>
                    </td>
                    <td className="p-3 text-wrap" style={{ width: "200 !important" }}>
                      {row.email}
                    </td>
                    <td className="py-3 px-1" style={{ width: 150 }}>
                      {row.contact}
                    </td>
                    <td className="py-3 px-1" style={{ width: 150 }}>
                      {row.createdAt && moment(row.createdAt).calendar()}
                    </td>
                    <td className="py-3 px-1" style={{ width: 150 }}>
                      <span className={`${row.status == "active" ? "bg-success" : "bg-danger"} p-1 px-3 rounded-pill text-white`}>{row.status ? row.status : "Inactive"}</span>
                    </td>
                    <td hidden={adminRoles() === 5}>
                      <MenuListContainer
                        list={
                          <>
                            <MenuItem onClick={() => navigate(`/admin/editdetail/student/${row?.id}`)} className="text-success">
                              Edit Details
                            </MenuItem>
                            <MenuItem onClick={() => activate(row.id, row.email, row.status)}>{row.status == "active" ? "Mark Inactive" : "Mark Active"}</MenuItem>
                            <MenuItem
                              onClick={() => {
                                setStudentId(row?.id);
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal">
                              Mark certified
                            </MenuItem>
                            <MenuItem onClick={() => deleteStudent(row?.id)} className="text-danger">
                              {" "}
                              Delete Student{" "}
                            </MenuItem>
                          </>
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <MarkCertified studentId={studentId} />
          <div className="bg-light p-3 py-2">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">
                Showing {data?.result?.length} out of {data?.count}
              </span>
              <div className="d-flex align-items-center">
                <select name="limit" value={limit} className="form-select form-select-sm" onChange={(e) => setLimit(e.target.value)}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </select>
                <Button size="small" variant="outlined" onClick={handlePaginationPrev} className="text-capitalize h-100 mx-2" disabled={Number(offset) < Number(limit) ? true : false}>
                  prev
                </Button>
                <ButtonBase>{offset ? offset / limit + 1 : 1}</ButtonBase>
                <Button size="small" onClick={handlePaginationNext} variant="outlined" className="text-capitalize h-100 ms-2" disabled={Number(offset) + Number(limit) + 1 > data.count ? true : false}>
                  next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkCertified({ studentId }) {
  const [course, setCourses] = React.useState([]);
  const [courseId, setCoursesId] = React.useState();

  const getCourses = async () => {
    try {
      const res = await apiAuth.get("admin/course");
      if (res.status === 200) {
        setCourses(res?.data?.result);
      }
    } catch (err) {}
  };
  const applyForCertificate = async () => {
    if (!studentId && !courseId) {
      toast.warning("Select Course!");
    }
    apiJsonAuth
      .post("course/certificate", { courseId, studentId })
      .then((res) => {
        toast.success(res.data?.message);
      })
      .catch((error) => {
        toast.warning("Certificate Already Generated!");
      });
  };
  React.useEffect(() => {
    getCourses();
  }, []);
  return (
    <>
      <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Generate Certificate
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={courseId}
                  label="couser"
                  onChange={(e) => {
                    setCoursesId(e.target.value);
                  }}>
                  {course?.map((course) => (
                    <MenuItem value={course?.id}>{course?.course_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn py-1 px-2 m-1 btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={applyForCertificate} type="button" class="btn py-1 px-2 m-1  btn-primary">
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
