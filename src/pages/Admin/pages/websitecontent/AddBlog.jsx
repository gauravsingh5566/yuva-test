import { Quickreply } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { apiAuth, apiJson } from "api";
import { Popup } from "layout/Popup";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyCKEditor from "components/MyCKEditor";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";

const AddBlog = (props) => {
  let [blogContent, setBlogContent] = useState("");
  const navigate = useNavigate();
  const Formik = useFormik({
    initialValues: {
      title: "",
      heading: "",
      content: "",
      img: "",
      bgimg: "",
      author: "",
    },
    onSubmit: async (values, action) => {
      Popup("loading");
      if (blogContent?.length) {
        const data = { ...values, content: blogContent };
        try {
          const res = await apiAuth.post("admin/blogs", data);
          if (res.status == 200 || res?.success == 1) {
            window.history.back();
            Popup("success", res?.data?.message, undefined, 1500);
          }
        } catch (err) {
          Popup("error", err?.response?.data?.message);
        }
      } else {
        toast.error("All fields are Required!!");
      }
    },
  });
  return (
    <div>
      <SimpleBreadCrumb2
        page={`Add Blog`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/blog", text: "blogs" },
          { link: "/admin/blog/add", text: "add blog", active: true },
        ]}
      />
      <div className="container py-3">
        <div>
          <form onSubmit={Formik.handleSubmit}>
            <div className="mb-3">
              <label for="title" className="form-label">
                Title
              </label>
              <input type="text" className="form-control" id="title" value={Formik.values.title} name="title" aria-describedby="title" onChange={Formik.handleChange} />
            </div>
            <div className="mb-3">
              <label for="heading" className="form-label">
                Description
              </label>
              <input type="text" className="form-control" name="heading" value={Formik.values.heading} id="heading" onChange={Formik.handleChange} />
            </div>
            <div className="mb-3">
              <label for="img" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control pt-3"
                name="files[]"
                id="img"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => {
                  if (e.target.files.length) {
                    Formik.setFieldValue("img", e.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label for="author" className="form-label">
                Author
              </label>
              <input type="text" className="form-control" name="author" value={Formik.values.author} id="author" onChange={Formik.handleChange} />
            </div>
            <div className="mb-3">
              <label for="Content" className="form-label">
                Content
              </label>
              <MyCKEditor content={blogContent} setContent={setBlogContent} />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
