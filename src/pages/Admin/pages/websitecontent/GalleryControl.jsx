import { Button } from "@mui/material";
import { api, apiAuth } from "api";
import { useFormik } from "formik";
import { useGlobalContext } from "global/context";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";
import GalleryImageList from "../GalleryImageList";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";

function GalleryControl() {
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState();
  const [file, setFile] = useState();
  const [eventId, setEventId] = useState();
  const [instituteList, setInstituteList] = useState([]);
  const inputImg = useRef();
  async function fetch() {
    try {
      const res = await apiAuth.get("/admin/gallery_event");
      setEventDetails(res?.data?.result);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }
  const fetchInstituteList = async () => {
    try {
      const res = await api("/public/institute-list");
      switch (res?.data?.status) {
        case "success":
          setInstituteList(res?.data?.result);
          break;
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetch();
    fetchInstituteList();
  }, [loading]);

  function uploadEventImage() {
    if (file && !loading) {
      toast.loading("Uploading Image...");
      setLoading(true);
      apiAuth
        .post("/admin/gallery_event_image", {
          img: file,
          eventId,
          display: "public",
        })
        .then((res) => {
          setLoading(false);
          if (res.data.status === 200) {
            inputImg.current.value = null;
            toast.dismiss();
            toast.success("Image Uploaded!");
            setFile();
          } else {
            toast.warning(res.data.message);
          }
        })
        .catch((err) => {
          toast.dismiss();
          setLoading(false);
          toast.warning("Something Went Wrong!");
          console.error(err);
        });
    } else {
      toast.warning("Select Image.");
    }
  }

  const { values, handleChange, setFieldValue, resetForm, errors, handleSubmit, touched } = useFormik({
    initialValues: {
      instituteId: "",
      name: "",
      theme: "",
      date: "",
      location: "",
      coordinator: "",
      instituteName: "",
    },
    onSubmit: (value) => {
      if (value.instituteId && value.theme && value.name) {
        setLoading(true);
        toast.loading("Creating Event");
        apiAuth
          .post("admin/gallery_event", { ...value, img: file })
          .then((res) => {
            if (res.data.status == 200) {
              resetForm();
              inputImg.current.value = null;
              setLoading(false);
              toast.dismiss();
              toast.success("Event Created");
            }
          })
          .catch((err) => {
            toast.dismiss();
            setLoading(false);
            toast.error("Something Went Wrong!!");
          });
      } else {
        toast.warning("All Fields Are Required.");
      }
    },
  });

  return (
    <div>
      <SimpleBreadCrumb2
        page={`Gallery Control`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/gallery", text: "gallery", active: true },
        ]}
      />
      <div className="container py-3">
        <div className="modal fade" id="imageUploadModal" tabindex="-1" aria-labelledby="imageUploadModal" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Event Images
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container d-flex justify-content-center">
                  <Button variant="outlined" className="mx-auto p-2">
                    <input ref={inputImg} type="file" accept=".png, .jpg, .jpeg" onChange={(e) => setFile(e.target.files[0])} />
                  </Button>
                </div>
                <img className="img-thumbnail" src={file ? URL.createObjectURL(file) : ""} />
              </div>
              <div className="modal-footer">
                <button type="button" className="bg-info shadow-sm border-1 rounded-2 p-1 px-2" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" disabled={loading} onClick={uploadEventImage} className="bg-success shadow-sm border-1 rounded-2 px-2 p-1">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {eventDetails
            ? eventDetails?.map((list, index) => (
                <div className="accordion-item">
                  <h2 className="accordion-header" id={"flush-heading" + index}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      onClick={() => {
                        setEventId(list?.id);
                      }}
                      data-bs-toggle="collapse"
                      data-bs-target={"#flush-collapse" + index}
                      aria-expanded="false"
                      aria-controls="flush-collapseOne">
                      {list?.institution_name} | {list?.state}
                    </button>
                  </h2>
                  <div id={"flush-collapse" + index} className="accordion-collapse mh-100 overflow-auto collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    {eventId && <GalleryImageList eventId={list?.id} setEventId={setEventId} loading={loading} />}
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default GalleryControl;
