import { Button } from "@mui/material";
import { apiAuth, apiJson, apiJsonAuth } from "api";
import MyCKEditor from "components/MyCKEditor";
import { Formik, useFormik } from "formik";
import { Popup } from "layout/Popup";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
  let id = useParams();
  const navigate = useNavigate();
  let idToSend = id.id;
  let [blogData, setBlogData] = useState("");
  let [blogContent, setBlogContent] = useState();
  const getBlogsById = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/blogs/edit/${id.id}`);
      if (res.status == 200) {
        setBlogData(res?.data?.result);
        setBlogContent(res?.data?.result?.content);
      }
    } catch (error) {
      Popup("error", error.response.data.message);
    }
  };
  useEffect(() => {
    getBlogsById();
  }, []);

  const Formik = useFormik({
    initialValues: {
      title: blogData.title ? blogData.title : "",
      heading: blogData.heading ? blogData.heading : "",
      content: blogData.content ? blogData.content : "",
      img: "",
      bgimg: "",
      author: blogData.author ? blogData.author : "",
    },
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      Popup("loading");
      const data = { ...values, content: blogContent, id: idToSend };
      try {
        const res = await apiAuth.put("admin/blogs", data);
        if (res.status == 200 || res?.success == 1) {
          Popup("success", "updated Successfully", undefined, 1500);
          window.history.back();
        }
      } catch (err) {
        Popup("error", err.response.data.message);
      }
    },
  });

  const modules = {
    toolbar: [[{ font: [] }], [{ header: [1, 2, 3, 4, 5, 6, false] }], ["bold", "italic", "underline", "strike"], [{ color: [] }, { background: [] }], [{ script: "sub" }, { script: "super" }], ["blockquote", "code-block"], [{ list: "ordered" }, { list: "bullet" }], [{ indent: "-1" }, { indent: "+1" }, { align: [] }], ["clean"]],
  };
  return (
    <>
      <div>
        <SimpleBreadCrumb2
          page={`Edit Blog `}
          navdata={[
            { link: "/admin", text: "Home" },
            { link: "/admin/blog", text: "blogs" },
            { link: "/admin/blog", text: `${Formik?.values?.title}`, active: true },
          ]}
        />
        <div className="container py-3">
          <div>
            <form onSubmit={Formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input type="text" className="form-control" id="title" value={Formik.values.title} name="title" aria-describedby="title" onChange={Formik.handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="heading" className="form-label">
                  Description
                </label>
                <textarea type="text" className="form-control" name="heading" id="heading" onChange={Formik.handleChange}>
                  {Formik.values.heading}
                </textarea>
              </div>
              <label htmlFor="img" className="form-label">
                Image
              </label>
              <div className="mb-3 d-flex justify-content-around">
                <img className="me-2" src={blogData.img} width="200" />
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="form-control pt-3"
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
            <label htmlFor="bgimg" className="form-label">Background Image</label>
            <input type="file" className="form-control pt-3" name='bgimg' value={Formik.values.bgimg} id="bgimg" onChange={Formik.handleChange} />
          </div> */}
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input type="text" className="form-control" name="author" value={Formik.values.author} id="author" onChange={Formik.handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="Content" className="form-label">
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
    </>
  );
}

export default EditBlog;
