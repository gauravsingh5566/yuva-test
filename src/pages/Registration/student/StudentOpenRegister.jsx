import { FormatQuote } from "@mui/icons-material";
import StudentOpenRegisterForm from "pages/Registration/student/StudentOpenRegisterForm";
import React from "react";
import { useParams } from "react-router-dom";

const StudentOpenRegister = () => {
  const { user } = useParams();
  return (
    <div className="container py-5">
      <div className="border">
        {/* <!-- ========== Start Login ========== --> */}
        <div className="row row-cols-1 row-cols-lg-2 g-0 mb-4">
          <div className="col">
            <div className="bg-light d-flex flex-column justify-content-center">
              <div className="container p-2 p-md-3 p-lg-4 p-xl-5 py-4">
                <h3 className="fs-4">Welcome to the world of leadership, ideas and diplomacy.</h3>
                <span className="fs-6 lh-sm text-dark">In order to register for the Yuvamanthan Model G20 Summit in your institution, please fill in the details and follow the steps. You will be asked some questions and there is a small e-module we have created to tell you more about G20 which will come as the next steps. Make sure you complete the e-module and you will be ready to participate!</span>
                <div className="mt-4">
                  <iframe src={"https://www.youtube.com/embed/DQJrCbR77N0"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" className="d-block" height="400" allowFullScreen style={{ width: "100%" }} frameBorder={1}></iframe>
                  <div className="h-100 d-flex align-items-center mt-3">
                    <blockquote className="text-start">
                      <p className="fs-5 lh-sm">
                        <FormatQuote sx={{ rotate: "180deg", marginBottom: 1 }} />
                        {"India's G20 agenda will be inclusive, ambitious, action-oriented, decisive: "}
                        <FormatQuote /> <br />
                        Shri Narendra Modi, Prime Minister, India
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="container py-5">
              <h3 className="fs-3 text-center">{user} Registration</h3>
              <StudentOpenRegisterForm />
            </div>
          </div>
        </div>
        {/* <!-- ========== End Login ========== --> */}
      </div>
    </div>
  );
};

export default StudentOpenRegister;
