import { apiAuth, apiJsonAuth } from "api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DeleteForever, Download, EditTwoTone } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";
import { useFormik } from "formik";
import { pop2, Popup } from "layout/Popup";
import Swal from "sweetalert2";
import useError from "lib/errorResponse";
import { useGlobalContext } from "global/context";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

function InstituteGallery() {
  let [galleryData, setGalleryData] = useState();
  const { ErrorResponder } = useError();
  let [update, setupdate] = useState(0);
  let [openAddForm, setOpenAddForm] = useState(false);
  const { id } = useParams();
  const { adminRoles } = useGlobalContext();
  const getGalleryById = async () => {
    try {
      const res = await apiAuth.get(`admin/institute-gallery/${id}`);

      if (res.status == 200) {
        setGalleryData(res?.data?.result);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };

  useEffect(() => {
    getGalleryById();
  }, [update]);

  const Formik = useFormik({
    initialValues: {
      img: "",
      alttext: "",
    },
    enableReinitialize: true,
    onSubmit: async function (values, actions) {
      Popup("loading...");
      if (values?.img) {
        if (!values.alttext.length) {
          values.alttext = values?.img?.name;
        }
        try {
          const res = await apiAuth.post(`admin/institute-gallery/${id}`, values);
          if (res.status == 200) {
            actions.resetForm();
            setupdate(update + 1);
          }
        } catch (err) {
          ErrorResponder(err);
        }
      } else {
        pop2.warning({ title: "please fill all the fields", value: values });
      }
    },
  });

  return (
    <>
      <div>
        <div className="resources-data table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th scope="col" className="p-3 px-2">
                  Image
                </th>
                <th scope="col" className="p-3 px-2">
                  Alt&nbsp;Text
                </th>
                <th hidden={adminRoles() === 3 || adminRoles() === 5} scope="col" className="p-3 px-2">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {galleryData?.map((data) => {
                return (
                  <>
                    <tr>
                      <td>
                        <img src={data?.img} height="100px" />
                      </td>
                      <td>{data?.alttext} </td>
                      <td hidden={adminRoles() === 3 || adminRoles() === 5}>
                        <Button
                          sx={{ color: "tomato" }}
                          variant="outlined"
                          className="me-2 text-capitalize"
                          onClick={async () => {
                            // Updation("delete", undefined,ele?.id);
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You wanted to delete this Resouorce!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then(async (result) => {
                              if (result.isConfirmed) {
                                try {
                                  const res = await apiJsonAuth.delete(`admin/institute-gallery?id=${data?.id}`);
                                  if (res?.status == 200) {
                                    Swal.fire({
                                      title: res.data.message,
                                      icon: "success",
                                    });
                                  }
                                  setupdate(update + 1);
                                } catch (error) {
                                  ErrorResponder(error);
                                }
                              }
                            });
                          }}>
                          <DeleteForever fontSize="small" /> Delete
                        </Button>
                        <Button className="me-2 text-capitalize" variant="outlined" color="success" startIcon={<Download />} href={data?.img} download={true}>
                          Dowload
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>

          <button
            hidden={!(adminRoles() === 1)}
            type="submit"
            className="btn btn-warning"
            onClick={() => {
              openAddForm ? setOpenAddForm(false) : setOpenAddForm(true);
            }}>
            Add Images
          </button>
        </div>
      </div>
      <Modal show={openAddForm} onHide={() => setOpenAddForm(false)}>
        <Modal.Body>
          {" "}
          <div hidden={!(adminRoles() === 1)} className="border rounded-4 p-3 mt-4">
            <h2 className="fs-3">Add Image To Gallery</h2>
            <form onSubmit={Formik.handleSubmit}>
              <div class="mb-3">
                <label for="img" class="form-label">
                  Image
                </label>
                <input
                  type="file"
                  name="img"
                  accept=".png, .jpg, .jpeg"
                  className="form-control pt-3"
                  id="img"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      Formik.setFieldValue("img", e.target.files[0]);
                    }
                  }}
                />
              </div>
              <div class="mb-3">
                <label for="alttext" class="form-label">
                  AltText
                </label>
                <input type="text" name="alttext" className="form-control " id="alttext" value={Formik.values.alttext} onChange={Formik.handleChange} />
              </div>
              <button type="submit" className="btn btn-warning">
                Submit
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InstituteGallery;
