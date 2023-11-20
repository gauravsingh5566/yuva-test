import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const SimpleBreadCrumb2 = ({ page, navdata }) => {
  const navigate = useNavigate();
  const GoBack = () => {
    navigate(-1);
  };
  return (
    <div className="bg-white border-top py-2 border-bottom">
      <div className="container">
        <div className="d-flex align-items-center">
          <button className="btn border border-dark btn-sm rounded-2 p-2 me-2" onClick={GoBack}>
            <ArrowBackIosNewOutlined className="fs-5" />
          </button>
          <div>
            <h5 className="mb-0">{page}</h5>
            <Breadcrumb>
              {navdata?.map((rout, index) => {
                return (
                  <Breadcrumb.Item active={rout?.active} key={index} href={rout?.link}>
                    {rout?.text}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
            <nav aria-label="breadcrumb mb-0">
              <ol className="breadcrumb bg-transparent p-0 text-lowercase mb-0"></ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBreadCrumb2;
