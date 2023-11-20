import { apiAuth, apiJson, apiJsonAuth } from "api";
import React, { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useGlobalContext } from "global/context";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";

const News = () => {
  const { adminRoles } = useGlobalContext();
  let [newsData, setNewsData] = useState("");
  let [update, setUpdate] = useState();
  const getAllNews = async () => {
    try {
      const res = await apiJsonAuth.get("admin/news");
      if (res.status == 200) {
        setNewsData(res?.data?.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllNews();
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
          const res = await apiAuth.delete("admin/news?id=" + id);
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
    <div>
      <SimpleBreadCrumb2
        page={`News`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/news", text: "blogs", active: true },
        ]}
      />
      <div className="container py-3">
        <div className="d-flex align-items-center justify-content-between">
          <h4>News</h4>
          <div hidden={!(adminRoles() === 1)}>
            <NavLink to={"/admin/news/add"} className="btn rounded-0 btn-sm">
              Add News
            </NavLink>
          </div>
        </div>
        <div className="py-3">
          <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th className="p-3" scope="col">
                    Image
                  </th>
                  <th className="p-3" scope="col">
                    Title
                  </th>
                  <th className="p-3" scope="col">
                    Slug
                  </th>
                  <th className="p-3" scope="col">
                    Heading
                  </th>
                  <th className="p-3" scope="col">
                    Edited&nbsp;at
                  </th>
                  <th className="p-3" hidden={adminRoles() === 5} scope="col">
                    actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {newsData[0] &&
                  newsData?.map((value, index) => {
                    return (
                      <>
                        <tr>
                          <td scope="col">
                            <img src={value?.img} className="fit-cover" alt={value?.title} width={120} height={80} />
                          </td>
                          <td scope="col">
                            <span className="line-clamp"> {value?.title}</span>
                          </td>
                          <td scope="col">
                            <span className="line-clamp"> {value?.slug}</span>
                          </td>
                          <td scope="col">
                            {" "}
                            <span className="line-clamp"> {value?.heading}</span>
                          </td>
                          <td scope="col">{moment(value?.updatedAt).calendar()}</td>
                          <td>
                            <NavLink hidden={adminRoles() === 5} to={`edit/${value.id}`} className="btn bg-success text-white btn-sm rounded w-100 mb-1">
                              Edit
                            </NavLink>
                            <button
                              hidden={adminRoles() === 3 || adminRoles() === 5}
                              type="button"
                              onClick={() => {
                                handleDelete(value?.id);
                              }}
                              className="btn bg-danger text-white btn-sm rounded w-100">
                              Delete
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
    </div>
  );
};

export default News;
