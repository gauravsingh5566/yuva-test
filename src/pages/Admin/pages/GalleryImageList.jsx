import { Button, Checkbox, TextField, Tooltip } from '@mui/material';
import { apiAuth, apiJsonAuth } from 'api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
function GalleryImageList({ eventId, setEventId, loading }) {
  const [imgList, setImgList] = useState();
  const [showImg, setshowImg] = useState();
  function fetch() {
    apiAuth
      .get("/admin/gallery_event_image?id=" + eventId)
      .then((res) => {
        setImgList(res.data?.result);
      })
      .catch((err) => {});
  }

  function deleteImg(id) {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure ?",
      text: "You want to delete this image?",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        apiAuth
          .delete("/admin/gallery_event_image?id=" + id)
          .then((res) => {
            fetch();
            toast.success(res.data?.message);
          })
          .catch((err) => {});
      }
    });
  }
  function hideAndShow(id, update) {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure ?",
      text: `You want to ${update} this image on Gallery?`,
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        apiAuth
          .put(`/admin/gallery_event_image?id=${id}&update=${update}`)
          .then((res) => {
            fetch();
            toast.success(res.data?.message);
          })
          .catch((err) => {});
      }
    });
  }
  useEffect(() => {
    if (eventId) {
      fetch();
    }
  }, [eventId, loading]);
  return (
    <div>
      <div className=" row justify-content-start row-cols-1 row-cols-sm-1 m-2  row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {imgList?.map((img, index) => (
          <ImageItem img={img} index={index} hideAndShow={hideAndShow} deleteImg={deleteImg} setshowImg={setshowImg} showImg={showImg} permission={img?.permission ? JSON.parse(img?.permission) : {}} />
        ))}
      </div>
    </div>
  );
}

export default GalleryImageList;

function ImageItem({ img, index, hideAndShow, deleteImg, setshowImg, showImg, permission }) {
  return (
    <div
      onMouseOver={() => {
        setshowImg(index);
      }}
      className={"card me-2 rounded-0 col d-flex position-relative d-flex p-3 bg-transparent justify-content-center"}
      style={{ opacity: permission?.hide ? 0.3 : 1 }}>
      <div hidden={showImg !== index} className=" position-absolute m-auto border border-dark bg-grad-white top-0 end-0 m-3 ">
        <Checkbox
          onChange={() => {
            hideAndShow(img.id, permission?.hide ? "show" : "hide");
          }}
          defaultChecked={!permission?.hide}
        />
        <IconButton
          onClick={() => {
            deleteImg(img?.id);
          }}
          sx={{ color: "red" }}
          aria-label="delete"
          size="small">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        {/* <Delete  /> */}
      </div>
      <img src={img?.img} className="img-fluid" alt={img?.img} />
    </div>
  );
}
