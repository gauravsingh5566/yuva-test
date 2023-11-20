import React from "react";

const NotFoundGif = ({ text, image }) => {
  return (
    <div className="h-100">
      <img src={image ? image : "/images/gif/Nodata.jpg"} alt="" className="w-100" style={{ maxHeight: "400px", objectFit: "contain" }} />
      <h6 className="text-center text-body-emphasis fs-4">{text}</h6>
    </div>
  );
};

export default NotFoundGif;
