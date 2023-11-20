import { Quickreply } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { apiAuth, apiJson } from "api";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MyCKEditor from "components/MyCKEditor";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";

const AddNews = (props) => {
  let [newsContent, setNewsContent] = useState();
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
      const data = { ...values, content: newsContent };
      try {
        const res = await apiAuth.post("admin/news", data);
        if (res.status == 200 || res?.success == 1) {
          window.history.back();
        }
      } catch (err) {}
    },
  });

  const modules = {
    toolbar: [[{ font: [] }], [{ header: [1, 2, 3, 4, 5, 6, false] }], ["bold", "italic", "underline", "strike"], [{ color: [] }, { background: [] }], [{ script: "sub" }, { script: "super" }], ["blockquote", "code-block"], [{ list: "ordered" }, { list: "bullet" }], [{ indent: "-1" }, { indent: "+1" }, { align: [] }], ["clean"]],
  };
  return (
    <>
      <SimpleBreadCrumb2
        page={`Add News`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/news", text: "news" },
          { link: "/admin/news/add", text: "add news", active: true },
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
              <textarea type="text" className="form-control" name="heading" id="heading" onChange={Formik.handleChange}>
                {Formik.values.heading}
              </textarea>
            </div>
            <div className="mb-3">
              <label for="img" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control  pt-3"
                accept=".png, .jpg, .jpeg"
                name="files[]"
                id="img"
                onChange={(e) => {
                  if (e.target.files.length) {
                    Formik.setFieldValue("img", e.target.files[0]);
                  }
                }}
              />
            </div>
            {/* <div className="mb-3">
            <label for="bgimg" className="form-label">Background Image</label>
            <input type="file" className="form-control pt-3" name='bgimg' value={Formik.values.bgimg} id="bgimg" onChange={Formik.handleChange} />
          </div> */}
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
              <MyCKEditor content={newsContent} setContent={setNewsContent} />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNews;
