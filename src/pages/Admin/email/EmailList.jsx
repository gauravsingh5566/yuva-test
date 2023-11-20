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
import AddEmailListComponent from "./AddEmailListComponent";
import UpdateEmailListComponent from "./UpdateEmailListComponent";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";
const heads = [
  { name: "#", sort: "" },
  { name: "Email", sort: "email" },
  { name: "Desription", sort: "description" },
  { name: "Type", sort: "type" },
  { name: "Created At", sort: "createdAt" },
];
export default function EmailList() {
  const { ErrorResponder } = useError();
  const [data, setData] = React.useState([]);
  const [type, setType] = React.useState("whitelist");
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("createdAt");
  const [sortPar, setSortPar] = React.useState(true);

  const { adminRoles } = useGlobalContext();
  async function reload() {
    try {
      const res = await apiAuth.get(`admin/email-list?type=${type}&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=${search}`);
      if (res.status == 200) {
        setData(res?.data);
      }
    } catch (error) {
      Popup("error", "Something went wrong");
    }
  }
  async function clearReload() {
    try {
      const res = await apiAuth.get(`admin/email-list?type=${type}&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=`);
      if (res.status == 200) {
        setData(res?.data);
      }
    } catch (error) {
      Popup("error", "Something went wrong");
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
            const res = await apiAuth.delete("admin/email-list?id=" + id);
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
  }, [offset, sort, sortPar, limit, type]);
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
        page={`Email Management`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/email-list", text: "email-list", active: true },
        ]}
      />
      <div className="container py-3">
        <div className="row g-2">
          <div className="col-lg-6">
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
          <div className="col">
            <select name="fetch-users" id="" className="form-select h-100 rounded-0" onChange={(e) => setType(e.target.value)}>
              <option value={"whitelist"}>Whitelist</option>
              <option value={"blacklist"}>BlackList</option>
              <option value={"complaint"}>complaint</option>
            </select>
          </div>
          <div className="col">
            <AddEmailListComponent reload={reload} />
          </div>
        </div>
        <div className="table-responsive border rounded mt-3">
          <table className="designed-table table table-borderless align-middle mb-0">
            <thead>
              <tr className="bg-light ">
                {heads.map((head, i) => {
                  return (
                    <th key={i} scope="col">
                      <ButtonBase onClick={() => handleSort(head.sort)} onDoubleClick={() => setSort(null)} className="fw-semibold text-capitalize p-1" disableTouchRipple disableRipple>
                        <div className="d-flex align-items-center">
                          <span className="text-nowrap">{head.name}</span>
                          {sort === head.sort && sortPar == true && <ArrowDropUpIcon sx={{ color: "green" }} />}
                          {sort === head.sort && sortPar == false && <ArrowDropDownIcon sx={{ color: "tomato" }} />}
                        </div>
                      </ButtonBase>
                    </th>
                  );
                })}
                <th hidden={adminRoles() === 5} scope="col" className="fw-semibold text-capitalize p-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.result?.map((row, i) => {
                return (
                  <tr key={i} className="border-bottom">
                    <td className="p-2">
                      <Email color={row?.type == "whitelist" ? "success" : "error"} />
                    </td>
                    <td className="p-2 px-1">{row.email}</td>
                    <td className="p-2 px-1">{row.description}</td>
                    <td className="p-2 px-1">
                      <span className={`${row.type == "whitelist" ? "bg-success" : "bg-danger"} p-1 px-3 rounded-pill text-white`}>{row.type ? row.type : ""}</span>
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
                            <UpdateEmailListComponent reload={reload} id={row?.id} detail={row} />
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
                Showing {limit} out of {data?.result?.length}
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
                <Button size="small" onClick={handlePaginationNext} variant="outlined" className="text-capitalize h-100 ms-2" disabled={Number(offset) + Number(limit) + 1 > data?.result?.length ? true : false}>
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
