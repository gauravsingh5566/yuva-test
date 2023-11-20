import { Avatar, Button, ButtonBase, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { NavLink, useNavigate } from "react-router-dom";
import * as React from "react";
import { toast } from "react-hot-toast";
import { apiAuth } from "../../../api";
import { Delete, DeleteForever, LocationCity, SearchTwoTone } from "@mui/icons-material";
import { postAffiliateInstitute, deleteAffiliateInstitute } from "../components/APIHandleFunction";
import useError from "lib/errorResponse";
import AdminInstituteRegistration from "../components/AdminInstituteRegistration";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Swal from "sweetalert2";
import { pop2 } from "layout/Popup";
import { useGlobalContext } from "global/context";
import MenuListContainer from "../components/MenuListContainer";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";

const options = ["Create a merge commit", "Squash and merge", "Rebase and merge"];

const heads = [
  { name: "logo", sort: "logo" },
  { name: "Institution Name", sort: "institution_name" },
  { name: "Representative", sort: "first_name" },
  { name: "Email", sort: "email" },
  { name: "Contact", sort: "contact" },
  { name: "Date of Join", sort: "createdAt" },
  { name: "status", sort: "status" },
];
// comment

export default function InstituteDataTable() {
  const { ErrorResponder } = useError();
  const [data, setData] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("id");
  const [sortPar, setSortPar] = React.useState(false);
  const [update, setUpdate] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef < HTMLDivElement > null;
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { adminRoles, userData } = useGlobalContext();

  const handleClick = () => {
    // console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleSort = (arg) => {
    if (arg == sort) {
      setSortPar(!sortPar);
    } else {
      setSort(arg);
    }
  };
  async function reload() {
    try {
      const res = await apiAuth.get(`admin?data=institutions&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=${search}`);
      if (res.status == 200) {
        setData(res?.data);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  }
  async function clearReload() {
    try {
      const res = await apiAuth.get(`admin?data=institutions&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=`);
      if (res.status == 200) {
        setData(res?.data);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  }

  const activate = async (instituteId, email, status) => {
    const formData = new FormData();
    formData.append("instituteId", instituteId);
    formData.append("email", email);
    if (status == "active") {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You wanted to Deactivate this Institute!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Deactivate it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await apiAuth.post(`admin/institute?req_type=deactivate`, formData);
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
        // pop2.error({ title: "Something Went Wrong" });
      }
    } else {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You wanted to Activate this Institute!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Activate it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await apiAuth.post(`admin/institute?req_type=activate`, formData);
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
    }
  };

  async function deleteInstitute(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You wanted to delete this Institute!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await apiAuth.delete("admin/institute-delete?id=" + id);
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
      console.error(err);
      pop2(err);
    }
  }

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
  const navigate = useNavigate();
  const clearSearch = () => {
    setSearch("");
    clearReload();
  };
  React.useEffect(() => {
    reload();
  }, [update, limit, offset, sort, sortPar]);
  return (
    <div>
      <SimpleBreadCrumb2 page={`Institutes Data`} navdata={[{ link: "/admin", text: "Home" }]} />
      <div className="container py-3">
        <div className="row">
          <div className="col-lg-7">
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

          <div hidden={!(adminRoles() === 1)} className="col-2 pe-2">
            <AdminInstituteRegistration />
          </div>
        </div>
        <div className="table-responsive border rounded mt-3">
          <table className="designed-table table table-borderless align-middle mb-0">
            <thead>
              <tr className="bg-light ">
                {heads.map((head, i) => {
                  return (
                    <th scope="col">
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
                return (
                  <tr key={i} className="border-bottom">
                    <td className="p-2" width={50}>
                      <Avatar alt={row.first_name} src={row?.logo} sx={{ width: 36, height: 36, backgroundColor: "grey" }}>
                        <LocationCity />
                      </Avatar>
                    </td>
                    <NavLink to={`/admin/institutes/${row.id}`}>
                      <td className="p-2 px-1" style={{ width: 200 }}>
                        {row.institution_name}
                      </td>
                    </NavLink>
                    <td className="p-2 px-1" style={{ width: 200 }}>
                      {row.title} {row.first_name} {row.last_name}
                    </td>
                    <td className="p-2 px-1 text-wrap" style={{ width: "200 !important" }}>
                      {row.email}
                    </td>
                    <td className="p-2 px-1" style={{ width: 150 }}>
                      {row.contact}
                    </td>
                    <td className="p-2 px-1" style={{ width: 150 }}>
                      {moment(row.createdAt).format("MMM Do YY")}
                    </td>
                    <td className="p-2 px-1" style={{ width: 150 }}>
                      <span className={`${row.status == "active" ? "bg-success border-success" : "bg-danger border-danger"} p-1 px-2 border rounded-pill bg-opacity-50 text-white`}>{row.status ? row.status : "Inactive"}</span>
                    </td>
                    <td hidden={adminRoles() === 5}>
                      <MenuListContainer
                        list={
                          <>
                            <MenuItem onClick={() => navigate(`/admin/editdetail/institute/${row?.id}`)} className="text-success">
                              Edit Details
                            </MenuItem>
                            <MenuItem onClick={() => activate(row.id, row.email, row.status)}>{row.status == "active" ? "Mark Inactive" : "Mark Active"}</MenuItem>
                            {row?.InstituteAffiliateId === row?.id ? (
                              <MenuItem
                                onClick={() => {
                                  deleteAffiliateInstitute(row?.AffiliateId, () => {
                                    setUpdate(update + 1);
                                  });
                                }}>
                                Remove from Affiliate
                              </MenuItem>
                            ) : (
                              <MenuItem
                                onClick={() => {
                                  postAffiliateInstitute(row?.id, () => {
                                    setUpdate(update + 1);
                                  });
                                }}>
                                Mark as Affiliate
                              </MenuItem>
                            )}
                            <MenuItem onClick={() => deleteInstitute(row?.id)} className="text-danger">
                              Delete Institute
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
          <div className="bg-light p-2">
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
                <Button size="small" variant="outlined" disabled={Number(offset) < Number(limit) ? true : false} onClick={handlePaginationPrev} className="text-capitalize h-100 mx-2">
                  prev
                </Button>
                <ButtonBase>{offset ? offset / limit + 1 : 1}</ButtonBase>
                <Button size="small" onClick={handlePaginationNext} disabled={Number(offset) + Number(limit) + 1 > data.count ? true : false} variant="outlined" className="text-capitalize h-100 ms-2">
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
