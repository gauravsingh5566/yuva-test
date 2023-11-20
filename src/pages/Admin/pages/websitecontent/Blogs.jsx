import { apiAuth, apiJson, apiJsonAuth } from "api";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import { useGlobalContext } from "global/context";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";

const Blogs = () => {
  const { adminRoles } = useGlobalContext();
  let [blogData, setBlogData] = useState("");

  let [update, setUpdate] = useState(0);

  const getAllBlogs = async () => {
    try {
      const res = await apiJsonAuth.get("admin/blogs");
      if (res.status == 200) {
        setBlogData(res?.data?.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllBlogs();
  }, [update]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wanted to delete this student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiAuth.delete("admin/blogs?id=" + id);
          if (res.status == 200) {
            Swal.fire({
              title: res.data.message,
              icon: "success",
            });
            setUpdate(update + 1);
          }
        } catch (error) {
          Swal.fire({
            width: 400,
            title: error?.response?.data?.message ? error?.response?.data?.message : "Something Went Wrong Check  your Network Connection",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <SimpleBreadCrumb2
        page={`Blogs`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/blog", text: "blogs", active: true },
        ]}
      />
      <div className="container py-3">
        <div className="d-flex align-items-center justify-content-between">
          <h4>Blogs</h4>
          <div hidden={!(adminRoles() === 1)}>
            <NavLink to={"/admin/blogs/add"} className="btn rounded-0 btn-sm">
              Add Blogs
            </NavLink>
          </div>
        </div>
        <div className="py-3">
          <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="p-3">
                    Img
                  </th>
                  <th scope="col" className="p-3">
                    Title
                  </th>
                  <th scope="col" className="p-3">
                    Slug
                  </th>
                  <th scope="col" className="p-3">
                    Heading
                  </th>
                  <th scope="col" className="p-3">
                    Edited&nbsp;At
                  </th>
                  <th className="p-3" hidden={adminRoles() === 5} scope="col">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogData[0] &&
                  blogData?.map((value, index) => {
                    return (
                      <>
                        <tr>
                          <td scope="col">
                            <img src={value?.img} className="fit-cover" alt="" width={120} height={80} />
                          </td>
                          <td scope="col">
                            <span className="line-clamp-blog">{value?.title}</span>
                          </td>
                          <td scope="col">
                            <span className="line-clamp-blog">{value?.slug}</span>
                          </td>
                          <td scope="col">
                            <span className="line-clamp-blog">{value?.heading}</span>
                          </td>
                          <td scope="col">{moment(value?.updatedAt).calendar()}</td>
                          <td hidden={adminRoles() === 5}>
                            <NavLink to={`edit/${value.id}`}>
                              <button className="btn btn-sm rounded-0 btn-success w-100" sx={{ backgroundColor: "orange" }}>
                                edit
                              </button>
                            </NavLink>
                            <button
                              hidden={adminRoles() === 3}
                              type="button"
                              className="btn btn-sm btn-outline-danger rounded-0 w-100 mt-1"
                              onClick={() => {
                                handleDelete(value?.id);
                              }}>
                              delete
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
