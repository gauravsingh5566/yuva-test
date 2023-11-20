import React, { useState } from "react";
import RegisterFormComponent from "./RegisterFormComponent";
import ResultComponent from "./ResultComponent";
import { FormatQuoteTwoTone } from "@mui/icons-material";

const InstituteRegisterForm = () => {
  const [globalEmail, setGlobalEmail] = useState(null);
  const [globalPass, setGlobalPass] = useState(null);
  const [pageStep, setPageStep] = useState("register");
  const stepPages = (step) => {
    switch (step) {
      case "register":
        return <RegisterFormComponent setPageStep={setPageStep} setGlobalEmail={setGlobalEmail} setGlobalPass={setGlobalPass} />;
      case "result":
        return <ResultComponent setPageStep={setPageStep} globalEmail={globalEmail} globalPass={globalPass} />;
    }
  };
  return (
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="col bg-light-white2-grad">
          <div className="d-flex w-100 flex-column justify-content-around pt-5">
            <div className="text-center mx-auto">
              <h2 className="fs-1">
                <span className="text-primary">Institutional</span> Registration
              </h2>
              <p className="mt-4" style={{ maxWidth: 650 }}>
                <FormatQuoteTwoTone sx={{ transform: "rotate(180deg) translate(0px,10px)" }} /> Welcome to the Model G20 summit registration Page. For institutions, students and professionals volunteering to organise the Model G20 Events in their campuses, this is where it all begins! Just fill in the required details and we will get in touch with
                you <FormatQuoteTwoTone />
              </p>
            </div>
            <div className="">
              <iframe style={{ width: "100%" }} className="youtube-iframe" src="https://www.youtube.com/embed/DQJrCbR77N0" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
          </div>
        </div>
        <div className="col ">
          {/* Registration Form */}
          <div className="py-5 container h-100">{stepPages(pageStep)}</div>
        </div>
      </div>
    </div>
  );
};

export default InstituteRegisterForm;
