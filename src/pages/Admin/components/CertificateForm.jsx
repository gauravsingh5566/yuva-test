import { apiAuth, apiJsonAuth } from "api";
import { useFormik } from "formik";
import { useGlobalContext } from "global/context";
import { Popup } from "layout/Popup";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function CertificateForm({ id }) {
  let [certificateData, setCertificateData] = useState();
  let [openeditForm, setOpenEditForm] = useState(false);
  const [addCertificate, setAddCertificate] = useState(false);
  let [certificate, setCertificate] = useState();
  let [state, setState] = useState();
  let { adminRoles } = useGlobalContext();

  const getCertificatesById = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/certificate/${id}`);
      if (res.status == 200) {
        setCertificateData(res?.data?.result[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Formik = useFormik({
    initialValues: {
      certificate_url: "",
      state: "",
    },
    onSubmit: async (values, action) => {
      Popup("loading");
      const formData = new FormData();
      formData.append("img", values.certificate_url);
      formData.append("state", values.state);
      try {
        const res = await apiAuth.post(`admin/certificate/${id}`, formData);
        if (res.status == 200 || res?.success == 1) {
          Popup("success", res.data.message, undefined, 1500);
          getCertificatesById();
        }
      } catch (err) {
        Popup("error", err?.response?.data?.message);
      }
    },
  });

  const FormikEdit = useFormik({
    initialValues: {
      certificate_url: certificate,
      state: state,
    },
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      Popup("loading");
      try {
        const res = await apiAuth.put(`admin/certificate/${id}`, values);
        if (res.status == 200 || res?.success == 1) {
          Popup("success", res.data.message, undefined, 1500);
          getCertificatesById();
          setOpenEditForm(false);
        }
      } catch (err) {
        Popup("error", err?.response?.data?.message);
      }
    },
  });

  useEffect(() => {
    getCertificatesById();
  }, [openeditForm]);

  return (
    <div>
      <div className="certificate mt-4">
        <h4>Institute Specific Certificates</h4>
        {certificateData ? (
          <div className="col-6">
            <img src={certificateData?.certificate_url} className="w-100"></img>
            <button
              hidden={adminRoles() === 5}
              type="button"
              className="btn btn-primary border border-dark mt-2"
              onClick={() => {
                setCertificate(certificateData?.certificate_url);
                setState(certificateData?.state);
                setOpenEditForm(true);
              }}>
              Edit
            </button>
          </div>
        ) : (
          <div hidden={!(adminRoles() === 1)} className="add-certificate mb-5 col-6  bg-light  border rounded">
            <h4 className="pt-4 text-center">Add certificate</h4>
            <form onSubmit={Formik.handleSubmit} className="m-5">
              <div className="mb-3">
                <label htmlFor="certificate" className="form-label text-dark">
                  Certificate Image
                </label>
                <input
                  type="file"
                  name="certificate_url"
                  className="form-control pt-3"
                  id="certificate"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      Formik.setFieldValue("certificate_url", e.target.files[0]);
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="State" className="form-label text-dark">
                  State
                </label>
                <input type="text" name="state" className="form-control" id="State" value={Formik.values.sta} onChange={Formik.handleChange} />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        )}
        <Modal show={openeditForm} onHide={() => setOpenEditForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Certificate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={FormikEdit.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="certificate" className="form-label">
                  Certificate
                </label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="certificate_url"
                  className="form-control pt-3"
                  id="certificate"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      FormikEdit.setFieldValue("certificate_url", e.target.files[0]);
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="State" className="form-label">
                  State
                </label>
                <input type="text" name="state" className="form-control" id="State" value={FormikEdit.values.state} onChange={FormikEdit.handleChange} />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default CertificateForm;
