import { apiAuth, apiJson } from 'api';
import { useGlobalContext } from 'global/context';
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
// import Button from '@mui/material/Button';
const Contact = () => {
  let { adminRoles } = useGlobalContext();
  let [contactData, setContactData] = useState("");
  let [update, setUpdate] = useState(0);
  const getAllContact = async () => {
    try {
      const res = await apiJson.get("admin/contactUs");
      if (res.status == 200) {
        setContactData(res?.data?.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllContact();
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
          const res = await apiAuth.delete("admin/contactus?id=" + id);
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
        page={`Contacts`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/contact", text: "contract", active: true },
        ]}
      />
      <div className="container py-3">
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">full name</th>
                <th scope="col">subject</th>
                <th scope="col">message</th>
                <th scope="col">contact</th>
                <th scope="col">email</th>
                <th hidden={adminRoles() === 3 || adminRoles() === 5} scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {contactData[0] &&
                contactData?.map((value, index) => {
                  return (
                    <>
                      <tr>
                        <td scope="col">
                          <span className="line-clamp-blog">{value?.full_name}</span>
                        </td>
                        <td scope="col">
                          <span className="line-clamp-blog">{value?.subject}</span>
                        </td>
                        <td scope="col">
                          <span className="line-clamp-blog">{value?.message}</span>
                        </td>
                        <td scope="col">
                          <span className="line-clamp-blog">{value?.contact}</span>
                        </td>
                        <td scope="col">
                          <span className="line-clamp-blog">{value?.email}</span>
                        </td>
                        <td hidden={adminRoles() === 3 || adminRoles() === 5}>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded"
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
  );
};

export default Contact;
