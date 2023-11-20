import { Avatar, Button, TextField, TextareaAutosize } from "@mui/material";
import { api, apiAuth, apiJson, apiJsonAuth } from "api";
import { Field, useFormik } from "formik";
import { useGlobalContext } from "global/context";
import { Popup } from "layout/Popup";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";
import moment from "moment";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";

import Swal from "sweetalert2";

function QuotesDataTable() {
  const [quoteData, setQuoteData] = useState();
  const [update, setUpdate] = useState(0);
  let [img, setImg] = useState("");
  let [editTitle, setEditTitle] = useState();
  let [editQuote, setEditQuote] = useState();
  let [editImg, setEditImg] = useState();
  let [editQuoteBy, setEditQuoteBy] = useState();
  let [editId, setEditId] = useState();
  let [editForm, setEditForm] = useState(false);
  let { adminRoles } = useGlobalContext();

  const getAllQuotes = async () => {
    try {
      const res = await apiJsonAuth.get("admin/quotes");
      if (res.status == 200) {
        setQuoteData(res?.data?.result);
      }
    } catch (error) {
      Popup("error", error.response.data.message);
    }
  };

  const Formik = useFormik({
    initialValues: {
      title: "",
      quote: "",
      quoteBy: "",
    },
    onSubmit: async (values, action) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("quote", values.quote);
      formData.append("quoteBy", values.quoteBy);
      formData.append("img", img);
      try {
        const res = await apiAuth.post("admin/quotes", formData);
        if (res.status == 200 || res?.success == 1) {
          Popup("success", "Added Successfully", undefined, 2000);
          setUpdate(update + 1);
        }
      } catch (err) {
        Popup("error", err.response.data.message);
      }
    },
  });
  const FormikEdit = useFormik({
    initialValues: {
      edittitle: editTitle ? editTitle : "",
      editquote: editQuote ? editQuote : "",
      editquoteBy: editQuoteBy ? editQuoteBy : "",
      editid: editId ? editId : "",
    },
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      try {
        const res = await apiAuth.put("admin/quotes", {
          id: values.editid,
          title: values.edittitle,
          quote: values.editquote,
          img: editImg,
          quoteBy: values.editquoteBy,
        });
        if (res.status == 200 || res?.success == 1) {
          setEditForm(false);
          setUpdate(update + 1);
          Popup("success", res.data.message, undefined, 2000);
        }
      } catch (err) {
        Popup("error", err.response.data.message);
      }
    },
  });

  useEffect(() => {
    getAllQuotes();
  }, [update]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setEditTitle("");
    setEditQuote("");
    setEditImg("");
    setEditQuoteBy("");
    setEditId("");
    setEditForm(false);
    setShow(false);
  };
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
          const res = await apiJsonAuth.delete("/admin/quotes?id=" + id);
          if (res.status == 200) {
            setUpdate(update + 1);
            Swal.fire({
              title: res.data.message,
              icon: "success",
            });
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
        page={`Quotes`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/news", text: "quotes", active: true },
        ]}
      />
      <div className="container py-3">
        <div className="d-flex align-items-center justify-content-between">
          <h4>Manage Quotes</h4>
          <button className="btn rounded-0 btn-sm" onClick={() => setShow(true)}>
            Add Quote
          </button>
        </div>
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" className="p-3">
                  #
                </th>
                <th scope="col" className="p-3">
                  Id
                </th>
                <th scope="col" className="p-3">
                  Title
                </th>
                <th scope="col" className="p-3">
                  Quote
                </th>
                <th scope="col" className="p-3">
                  Created
                </th>
                <th scope="col" className="p-3">
                  Quote By
                </th>
                <th className="p-3" hidden={adminRoles() === 5} scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {quoteData?.map((value, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>
                        <Avatar src={value?.img} alt="" style={{ objectPosition: "top" }} />
                      </td>
                      <th scope="row">{value?.id}</th>
                      <td>{value?.title}</td>
                      <td>{value?.quote?.slice(0, 20)}...</td>
                      <td>{moment(value?.created_at).fromNow()}</td>
                      <td>{value?.quoteBy}</td>
                      <td hidden={adminRoles() === 5}>
                        <Button
                          color="success"
                          variant="contained"
                          className="w-100"
                          type="button"
                          onClick={(e) => {
                            setEditTitle(value?.title);
                            setEditQuote(value?.quote);
                            setEditImg(value?.img);
                            setEditQuoteBy(value?.quoteBy);
                            setEditId(value?.id);
                            setEditForm(true);
                            setShow(true);
                          }}>
                          Edit
                        </Button>
                        <Button
                          hidden={adminRoles() === 3}
                          variant="outlined"
                          color="error"
                          type="button"
                          fullWidth
                          onClick={() => {
                            handleDelete(value?.id);
                          }}
                          className="mt-1 border w-100">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Add and Edit Quote Modal  */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editForm ? "Edit" : "Add"} Quote</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            {!editForm ? (
              <form hidden={!(adminRoles() === 1)} onSubmit={Formik.handleSubmit} className="container ms-0" style={{ maxWidth: "550px" }}>
                <h4>Add Quote</h4>
                <div className="row row-cols-1">
                  <div className="col">
                    <TextField className="mt-2" fullWidth type="text" name="title" id="quoteTitle" label="Title" value={Formik.values.title} onChange={Formik.handleChange} />
                  </div>
                  <div className="col">
                    <TextField fullWidth className="mt-2" type="text" name="quote" multiline rows={4} label="Quote" value={Formik.values.quote} onChange={Formik.handleChange} />
                  </div>
                  <div className="col">
                    <Button fullWidth variant="outlined" className="text-start mt-2">
                      <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => setImg(e.target.files[0])} />{" "}
                    </Button>
                  </div>
                  <div className="col">
                    <TextField className="mt-2" fullWidth type="text" name="quoteBy" id="quoteby" label="QuoteBy" value={Formik.values.quoteBy} onChange={Formik.handleChange} />
                  </div>
                  <div className="col">
                    <Button className="btn btn-primary mt-2 py-3" type="submit" size="large" variant="contained" fullWidth color="success">
                      Add
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <>
                <form onSubmit={FormikEdit.handleSubmit} className="container ms-0" style={{ maxWidth: "550px" }}>
                  <h4>Edit Quote</h4>
                  <div className="row row-cols-1"></div>
                  <div className="col">
                    <input className="m-2" type="hidden" name="editid" placeholder="id" value={FormikEdit.values.editId} onChange={FormikEdit.handleChange} defaultValue={editId} disabled />
                  </div>
                  <div className="col">
                    <TextField fullWidth className="mt-2" type="text" name="edittitle" id="editquoteTitle" placeholder="Edit Title" value={FormikEdit.values.editTitle} onChange={FormikEdit.handleChange} defaultValue={editTitle} />
                  </div>
                  <div className="col">
                    <TextField fullWidth multiline rows={5} className="mt-2" type="text" name="editquote" id="editquote" placeholder="Edit Quote" value={FormikEdit.values.editQuote} onChange={FormikEdit.handleChange} defaultValue={editQuote} />
                  </div>
                  <div className="col">
                    <Button>
                      <input fullWidth className="mt-2" type="file" placeholder="Edit Image" onChange={(e) => setEditImg(e.target.files[0])} />
                    </Button>
                  </div>
                  <div className="col">
                    <TextField fullWidth className="mt-2" type="text" name="editquoteBy" id="editquoteby" placeholder="Edit QuoteBy" value={FormikEdit.values.editQuoteBy} onChange={FormikEdit.handleChange} defaultValue={editQuoteBy} />
                  </div>
                  <div className="col">
                    <Button fullWidth variant="contained" className="mt-3 py-3" type="submit">
                      Edit
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default QuotesDataTable;
