import React, { useEffect, useRef, useState } from "react";
import { UI2Feature1 } from ".";
import { apiAuth, apiJsonAuth } from "api";
import { Button, Card, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useGlobalContext } from "global/context";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { toast } from "react-toastify";
const clubs = [
  {
    id: 1,
    logo: "/ui2.0dashboard/Ellipse 79.png",
    name: "LiFE",
  },
  {
    id: 2,
    logo: "/ui2.0dashboard/Ellipse 80.png",
    name: "Innovation",
  },
  {
    id: 3,
    logo: "/ui2.0dashboard/Ellipse 80.png",
    name: "Geo Politics",
  },
  {
    id: 4,
    lo: "/ui2.0dashboard/Ellipse 80.png",
    name: "Culture",
  },
  {
    id: 5,
    img: "/ui2.0dashboard/Ellipse 80.png",
    name: "Sports",
  },
];
export const UI2DashboardClub = () => {
  const { userData } = useGlobalContext();
  const instituteId = userData.id
  let role = userData?.role
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState("");
  const [clubsData, setClubsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = React.useState("1");
  const [instituteData, setInstituteData] = useState([])
  const [showAll, setShowAll] = useState(false)
  const mergedArray = clubsData.concat(instituteData);
  const handleHide = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };
  const handleButtonClick = () => {
    setValue("1");
    fileInputRef.current.click();
  };

  const getPublicClubs = async () => {
    try {
      const clubs = await apiJsonAuth.get(`/club/public/`)
      if (clubs.status === 200) {
        const publicClubs = clubs?.data;
        setClubsData(publicClubs)
      }

    } catch (error) {
      console.log(error, "error in public")
    }
  }
  const getInstituteClubs = async () => {
    try {
      const InsClub = await apiJsonAuth(`/club/private/institute/${instituteId}`)
      if (InsClub.status === 200) {
        const instituteClubs = InsClub?.data;
        setInstituteData(instituteClubs);
      }
    } catch (error) {
      console.log("Error In Institute Clubs", error)
    }

  }
  useEffect(() => {
    getPublicClubs();
  }, [])
  useEffect(() => {
    if (role === "institute") {
      getInstituteClubs();
    }
  }, [role, instituteId])

  const handleSubmit = () => {
    if (!name) {
      toast.dismiss()
      toast.error("Write Name")
    }
    let type;
    let instituteId;
    if (userData.role === 'institute') {
      instituteId = userData.id
      type = 'private'
    } else if (userData.role === 'admin') {
      type = "public"
    }
    let data = {
      name, description, type, instituteId
    }
    if (userData.role === 'institute' || userData.role === 'admin') {

      apiAuth.post(process.env.REACT_APP_API_BASE_URL + "club", { ...data, img: image })
        .then((res) => {
          toast.success("succesfully created")
          getInstituteClubs();
          handleHide();
        }).catch((err) => {
          console.log(err.message)
        })
    }

  };



  return (
    <>
      <div className="rounded-4 shadow px-3 pt-3">
        <div className="d-flex justify-content-between align-items-center px-1">
          <h3 className="fs-3 fw-bold ">Clubs</h3>
          <div>
            {userData?.role === 'institute' && (

              <h3 className="fs-5 fw-bold cursor-pointer addBtn me-3" onClick={handleShow}>Add Club</h3>
            )}

            {instituteData.length > 6 &&
              <span className="fs-5 cursor-pointer addBtn"
                onClick={() => setShowAll(!showAll)}>{showAll ? "Show Less" : "Show all"}</span>
            }
          </div>

        </div>
        <div className="w-100 px-3 py-3">
          {mergedArray.length === 0 && <span className="text-center">No Club To Show</span>}

          <div className="row">
            {
              (showAll ? mergedArray : mergedArray.slice(0, 6))?.map((club) => {
                return (
                  <UI2Feature1 data={club} key={club?.id} />
                )
              })}
          </div>
        </div>
      </div>
      <Modal centered show={showModal} onHide={handleHide}>
        <Modal.Title className=" fw-bold color-black" style={{ padding: "12px", fontSize: "25px", fontFamily: "Poppins" }}>Add New Club</Modal.Title>
        <Modal.Body>
          <div>
            <div className="row">
              <div label="Name" className="mb-3 col-6">
                <Form.Control className="p-3 rounded fw-500 box-shadow-0 resize-none border-0" style={{background: "rgb(239, 239, 239)",fontSize: "16px"}} value={name} type="text" placeholder="Club Name" onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="col-6" label="Description">
                <Form.Control className="p-3 rounded fw-500 box-shadow-0 resize-none border-0" style={{background: "rgb(239, 239, 239)", fontSize: "16px"}} value={description} type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
              </div>
              
              <div className="col-4 mb-4">
                <div className="d-flex align-items-center justify-content-start m-2 ms-2">
                  <input
                    type="file"
                    id="img"
                    style={{ display: "none",background: "#da9eff" }}
                    accept=".png, .jpg, .jpeg"
                    name="files[]"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files.length) {
                        setImage(e.target.files[0]);
                        setSelectedImage(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }
                    }}
                  />
                  <label htmlFor="img" > 
                    <button
                      style={{background: "#da9eff", color: "white",borderRadius: "5px"}}
                      className="text-capitalize font-weight-bold btn-sm"
                      onClick={handleButtonClick}
                    >
                      <CameraAltIcon sx={{color: "#6100ff"}}/> &nbsp;Media
                    </button>
                  </label>
                </div>
              </div>
              <div className="col-4 mb-4">
                {selectedImage && (
                  <div>
                    <img
                      src={selectedImage}
                      alt="Selected"
                      style={{ width: "80%", objectFit: "contain" }}
                    />
                  </div>
                )}
              </div>
              <div className="col-4 mb-4">
                <div className="d-flex justify-content-center text-center">
                <button style={{background: "#9555fd",height: "45px",width: "130px",borderRadius: "5px",color: "white"}} onClick={handleSubmit} className="">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
};
