import { Avatar, Button, ButtonBase, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Popup, pop2 } from "layout/Popup";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import * as React from "react";
import { apiAuth, apiJsonAuth } from "../../../api";
import { Delete, Email, LocationCity, Person2, SearchTwoTone } from "@mui/icons-material";
import useError from "lib/errorResponse";
import Swal from "sweetalert2";
import { useGlobalContext } from "global/context";
import { toast } from "react-toastify";
import MenuListContainer from "../components/MenuListContainer";
import { useNavigate } from "react-router-dom";
import MailDialog from "../components/MailDialog";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";
const heads = [
  { name: "#", sort: "" },
  { name: "Email", sort: "email" },
  { name: "Subject", sort: "subject" },
  { name: "Status", sort: "status" },
  { name: "Details", sort: "details" },
  { name: "Email Date", sort: "createdAt" },
];
export default function EmailDeliverable() {
  const { ErrorResponder } = useError();
  const [status, setStatus] = React.useState("not sent");
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
      const res = await apiAuth.get(`admin/email-suppress?status=${status}&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=${search}`);
      if (res.status == 200) {
        setData(res?.data);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  async function clearReload() {
    try {
      const res = await apiAuth.get(`admin/email-suppress?status=${status}&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=`);
      if (res.status == 200) {
        setData(res?.data);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  async function deleteRecord(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You wanted to delete this Record!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await apiAuth.delete("admin/email-suppress?id=" + id);
            if (res.status == 200) {
              toast.success(res.data.message);

              reload();
            }
          } catch (error) {
            let msg = error?.response?.data?.message ? error?.response?.data?.message : "Something Went Wrong Check your Network Connection";
            toast.error(msg);
          }
        }
      });
    } catch (err) {
      console.error(err);
      pop2(err);
    }
  }
  React.useEffect(() => {
    reload("clear");
  }, [offset, sort, sortPar, limit, status]);
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
      <SimpleBreadCrumb2
        page={`Email Reports`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/email-list", text: "email-list", active: true },
        ]}
      />
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
          <div className="col-3">
            <div className="d-flex h-100">
              <select name="email-type" id="" className="form-select rounded-0 h-100" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value={"not sent"}>not sent</option>
                <option value={"sent"}>sent</option>
              </select>
            </div>
          </div>
        </div>
        <div className="table-responsive border rounded mt-3">
          <table className="designed-table table table-borderless align-middle mb-0">
            <thead>
              <tr className="bg-light ">
                {heads.map((head, i) => {
                  return (
                    <th key={i} scope="col">
                      <ButtonBase onClick={() => handleSort(head.sort)} onDoubleClick={() => setSort(null)} className="fw-semibold text-capitalize p-1">
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
                    <td className="p-2">
                      <Email color={row.status == "sent" ? "success" : "error"} />
                    </td>
                    <td className="p-2 px-1">{row.email}</td>
                    <td className="p-2 px-1">{row.subject}</td>
                    <td className="p-2 px-1">
                      <span className={`${row.status == "sent" ? "bg-success" : "bg-danger"} p-1 px-3 rounded-pill text-white`}>{row.status ? row.status : "Inactive"}</span>
                    </td>
                    <td className="p-2 px-1">
                      <MailDialog btnText={"View Details"} detail={row?.details} />
                    </td>
                    <td className="p-2 px-1">{row.createdAt && moment(row.createdAt).calendar()}</td>
                    <td hidden={adminRoles() === 5}>
                      <MenuListContainer
                        list={
                          <>
                            <MenuItem onClick={() => deleteRecord(row?.id)} className="text-danger">
                              {" "}
                              Delete Record{" "}
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
            <div className="d-flex justify-content-between  align-items-center">
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
