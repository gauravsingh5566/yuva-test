import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import MyCKEditor from "components/MyCKEditor";

export const GoaForm = () => {
  const [user, setUser] = useState({
    title: "",
    subheading: "",
    quotes: "",
    author: "",
    subauthor: "",
    carousel: "",
    images: "",
    ulpoints: "",
    cards: "",
  });
  const [json, setjson] = useState({
    name: "",
  });

  let [paragraph, setNewParagraph] = useState();

  const validate = Yup.object({
    title: Yup.string().min(10, "Must be 10 character or more").required("Required"),
    subheading: Yup.string().min(5, "must be 5 character or more").required("required"),
    quotes: Yup.string().max(25, "Must be 25 character or less").required("Required"),
    author: Yup.string().max(30, "Max character should be 30").required("required"),
    subauthor: Yup.string().required("required"),
    // paragraph: Yup.string().required('required'),
    carousel: Yup.string().required("Required"),
    images: Yup.mixed().nullable().notRequired().required("Required"),
    ulpoints: Yup.string().required("Required"),
    cards: Yup.string().required("reequired"),
  });
  // console.log(paragraph)
  const formik = useFormik({
    initialValues: {
      title: "",
      subheading: "",
      quotes: "",
      author: "",
      subauthor: "",
      paragraph: "",
      carousel: "",
      images: "",
      ulpoints: "",
      cards: "",
    },

    validationSchema: validate,
    onSubmit: (values) => {
      // console.log("values: ", values, paragraph);
      // console.log(data)
      // alert("this i slaert");
      // console.log('Form values',values)
    },

    // validationSchema: validate,
    // submit =
  });


  return (
    <>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="row p-3">
            <div className="col form-group">
              <input
                id="title"
                name="title"
                type="text"
                // value={user.title}
                // // onChange={handleInputs}
                placeholder="Your title"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
            </div>

            <div className="col form-group">
              <input
                id="subheading"
                name="subheading"
                type="text"
                // value={user.subheading}
                // onChange={handleInputs}
                placeholder="subheading"
                {...formik.getFieldProps("subheading")}
              />{" "}
              {formik.touched.subheading && formik.errors.subheading ? <div>{formik.errors.subheading}</div> : null}
            </div>
          </div>
          <div className="row p-3">
            <div className="col form-group">
              <input
                id="quotes"
                name="quotes"
                type="text"
                // value={user.quotes}
                // onChange={handleInputs}
                placeholder="quotes"
                {...formik.getFieldProps("quotes")}
              />{" "}
              {formik.touched.quotes && formik.errors.quotes ? <div>{formik.errors.quotes}</div> : null}
            </div>
          </div>
          <div className="row p-4">
            <div className="col form-group">
              <input
                id="author"
                name="author"
                type="text"
                // value={user.author}
                // onChange={handleInputs}
                placeholder="author"
                {...formik.getFieldProps("author")}
              />{" "}
              {formik.touched.author && formik.errors.author ? <div>{formik.errors.author}</div> : null}
            </div>
            <div className="col form-group">
              <input
                id="subauthor"
                name="subauthor"
                type="text"
                // value={user.subauthor}
                // onChange={handleInputs}
                placeholder="subauthor"
                {...formik.getFieldProps("subauthor")}
              />{" "}
              {formik.touched.subauthor && formik.errors.subauthor ? <div>{formik.errors.subauthor}</div> : null}
            </div>
          </div>
          <div className="row p-4">
            <div className="col form-group">
              <MyCKEditor content={paragraph} setContent={setNewParagraph} />
            </div>
            <div className="row p-5">
              <div className="col form-group">
                <input
                  id="carousel"
                  name="carousel"
                  type="text"
                  // value={user.carousel}
                  // onChange={handleInputs}
                  placeholder="carousel"
                  {...formik.getFieldProps("carousel")}
                />{" "}
                {formik.touched.carousel && formik.errors.carousel ? <div>{formik.errors.carousel}</div> : null}
              </div>
            </div>
          </div>
          <div className="row p-4">
            <div className="col form-group">
              <input
                id="images"
                name="images"
                type="file"
                // value={user.images}
                // onChange={handleInputs}
                placeholder="images"
                {...formik.getFieldProps("images")}
              />{" "}
              {formik.touched.images && formik.errors.images ? <div>{formik.errors.images}</div> : null}
            </div>
            <div className="col form-group">
              <input
                id="ulpoints"
                name="ulpoints"
                type="text"
                // value={user.ulpoints}
                // onChange={handleInputs}
                placeholder="ulpoints"
                {...formik.getFieldProps("ulpoints")}
              />{" "}
              {formik.touched.ulpoints && formik.errors.ulpoints ? <div>{formik.errors.ulpoints}</div> : null}
            </div>
          </div>
          <div className="row p-4">
            <div className="col form-group">
              <input
                id="cards"
                name="cards"
                type="text"
                // value={user.cards}
                // onChange={handleInputs}
                placeholder="cards"
                {...formik.getFieldProps("cards")}
              />{" "}
              {formik.touched.cards && formik.errors.cards ? <div>{formik.errors.cards}</div> : null}
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="container">
        <form>
          <div className="row p-3">
            <div className="col form-group">
              <input
                id="add a value"
                name="add a value"
                type="text"
                // value={json.name}
                // onChange={handleInputs}
                placeholder="quotes"
              />
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
