import { apiAuth } from "api";
import React from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Swal from "sweetalert2";
import { Avatar, Button, IconButton } from "@mui/material";
import { useGlobalContext } from "global/context";
import { useOutletContext } from "react-router-dom";
import { UploadTwoTone } from "@mui/icons-material";
import useError from "lib/errorResponse";
import { imgCompressor } from "lib/fileCompresser";
import { toast } from "react-toastify";

const StudentEditProfilePic = () => {
  const { token } = useGlobalContext();
  const [userData, fullDetails, fetchDetails] = useOutletContext();
  const [profile, setProfile] = React.useState("");
  const { ErrorResponder } = useError();
  // Profile Photo upload
  async function uploadPhoto(e) {
    e.preventDefault();
    toast.loading("Updating....");
    if (profile?.size && profile.size < 5169186) {
      const formData = new FormData();
      formData.append("file", profile);
      if (token) {
        try {
          const res = await apiAuth.put(`/student/profile?update_type=profile_pic`, formData, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status === 200) {
            fetchDetails();
            toast.dismiss();
            toast.success(res.data.message);
          }
        } catch (error) {
          ErrorResponder(error);
        }
      } else {
        toast.dismiss();
      }
    } else if (profile.size >= 5169186) {
      toast.dismiss();
      toast.warning("Max 5mb is allowed");
    } else {
      toast.dismiss();
      toast.warning("Image not selected!");
    }
  }
  return (
    <>
      <div>
        <form onSubmit={uploadPhoto}>
          <div className="row row-cols-1 row-cols-lg-2 mt-3 g-2">
            <div className="col">
              <h5>Profile Picture</h5>
              <p className="fs-6">Max file size is 5MB. Supported file types are .jpg and .png.</p>
            </div>
            <div className="col">
              <div className="d-flex justify-content-between">
                <Avatar alt="" name="profilepic" src={profile ? URL.createObjectURL(profile) : fullDetails?.profile} variant="square" className="rounded border" sx={{ width: 80, height: 80 }} />
                <div className="d-flex align-items-center justify-content-end">
                  <IconButton color="primary" aria-label="upload picture" component="label" sx={{ width: 46, height: 46 }} className="rounded border me-2">
                    <input hidden name="profile" accept=".png, .jpg, .jpeg" type="file" onChange={(e) => setProfile(imgCompressor(e.target.files[0]))} />
                    <PhotoCamera />
                  </IconButton>
                  <button color="success" className="btn btn-sm py-2 border border-secondary rounded" type="submit">
                    <UploadTwoTone /> Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentEditProfilePic;
