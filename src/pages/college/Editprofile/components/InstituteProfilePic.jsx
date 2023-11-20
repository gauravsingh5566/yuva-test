import { Avatar } from "@mui/material";
import { apiAuth } from "api";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import { UploadFileSharp } from "@mui/icons-material";
import { useGlobalContext } from "global/context";
import useError from "lib/errorResponse";
import { Popup } from "layout/Popup";
import { imgCompressor } from "lib/fileCompresser";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const InstituteProfilePic = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [details] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = React.useState(null);
  const profileValidate = (e) => {
    if (e.target?.files[0]?.size < 5000000) {
      setProfile(e.target.files[0]);
    } else {
      if (e.target?.files[0]) {
        e.target.value = null;
        Popup("warning", "Exceed Logo size Limit!! \n Size Limit : 5 MB ");
      }
    }
  };
  // Profile Photo upload
  async function uploadPhoto(e) {
    e.preventDefault();
    setLoading(true);
    toast.loading("Please wait...");
    const formData = new FormData();
    formData.append("file", profile);
    if (token) {
      try {
        const res = await apiAuth.put(`/institute/profile?update_type=logo`, formData, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          toast.dismiss();
          toast.success(res.data.message);
          setLoading(false);
        }
      } catch (error) {
        ErrorResponder(error);
        setLoading(false);
      }
    }
  }
  return (
    <div className="row row-cols-1 row-cols-lg-2 g-2">
      <div className="col">
        <h5>Institute Logo</h5>
        <p className="fs-6">Max file size is 5MB. Supported file types are .jpg and .png.</p>
      </div>
      <div className="col">
        <form onSubmit={uploadPhoto} className="d-flex align-items-center justify-content-between">
          <Avatar alt="profile" name="profilepic" className="rounded" src={profile ? URL.createObjectURL(profile) : details?.logo} sx={{ width: 60, height: 60 }} />
          <div className="d-flex align-items-center">
            <IconButton className="border rounded me-2" color="primary" aria-label="upload picture" component="label" sx={{ width: 42, height: 42 }}>
              <input hidden name="profile" accept=".png, .jpg, .jpeg" type="file" onChange={profileValidate} />
              <PhotoCamera className="text-secondary" />
            </IconButton>
            <button className="btn py-2 px-3 rounded border border-secondary" type="submit">
              {loading ? <Spinner size="sm" /> : <UploadFileSharp />} Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstituteProfilePic;
