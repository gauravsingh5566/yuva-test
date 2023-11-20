import React, { useEffect, useState } from "react";
import "../Model-UN/style/MunApplicants.css";

export const UsersUnderReview = () => {
  const approval = [
    {
      img: "",
      name: "Gayatri Kushwaha",
      degination: "Teacher",
      content:
        "Hi Sir, please complete my verification process as soon as possible.",
      status:"Pending"
    },
    {
      img: "",
      name: "Gayatri Kushwaha",
      degination: "Teacher",
      content:
        "Hi Sir, please complete my verification process as soon as possible.",
      status:"Pending"
    },
    {
      img: "",
      name: "Gayatri Kushwaha",
      degination: "Teacher",
      content:
        "Hi Sir, please complete my verification process as soon as possible.",
      status:"Hold"
    },
    {
      img: "",
      name: "Gayatri Kushwaha",
      degination: "Teacher",
      content:
        "Hi Sir, please complete my verification process as soon as possible.",
      status:"Hold"
    },
    {
      img: "",
      name: "Gayatri Kushwaha",
      degination: "Teacher",
      content:
        "Hi Sir, please complete my verification process as soon as possible.",
      status:"Hold"
    },
    {
      img: "",
      name: "Gayatri Kushwaha",
      degination: "Teacher",
      content:
        "Hi Sir, please complete my verification process as soon as possible.",
      status:"Approved"
    },
    {
      img: "",
      name: "Gayatri Kushwaha",
      degination: "Teacher",
      content:
        "Hi Sir, please complete my verification process as soon as possible.",
      status:"Rejected"
    },
    {
      img: "",
      name: "Gayatri Kushwaha",
      degination: "Teacher",
      content:
        "Hi Sir, please complete my verification process as soon as possible.",
      status:"Approved"
    },
  ];
    const [data, setData] = useState(approval);
    const [filterValue, setFilterValue] = useState("All");

 useEffect(()=>{
  setFilterValue("All")
 },[])

 let  filterList = filterValue==="All" ? data : data?.filter((val) => val.status === filterValue)


  return (
    <div>
      <div className="col-10  mx-auto mt-4">
        <div>
          <div>
            <div>
              <span className="fs-32px-fw-600">Approval Requests</span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div className="d-flex justify-content-between col-5">
            <div>
              <span
              onClick={()=>{

                setFilterValue("All")
                }}
                className={`fw-400 cp fs-17-50px cursor-pointer 
                ${filterValue === "All"? "active-status":null}
                 `}
                style={{ fontFamily: "Lexend" }}
              >
                All
              </span>
            </div>
            <div>
              <span
              onClick={()=>{
                setFilterValue("Pending")
                } }
                className={`fw-400 cp fs-17-50px cursor-pointer ${filterValue === "Pending" ? "active-status" : null}`}
                style={{ fontFamily: "Lexend"}}
              >
                Pending
              </span>
            </div>
            <div>
              <span
              onClick={()=>setFilterValue("Hold")}
                className={`fw-400 cp fs-17-50px cursor-pointer ${filterValue === "Hold" ? "active-status" : null}`}
                style={{ fontFamily: "Lexend" }}
              >
                Hold
              </span>
            </div>
            <div>
              <span
              onClick={()=>setFilterValue("Approved")}
                className={`fw-400 cp fs-17-50px cursor-pointer ${filterValue === "Approved" ? "active-status" : null}`}
                style={{
                  fontFamily: "Lexend",
                  borderRadius: "5px",
                  height: "22px",
                  width: "83px",
                }}
              >
                Approved
              </span>
            </div>
            <div>
              <span
              onClick={()=>setFilterValue("Rejected")}
                className={`fw-400 cp fs-17-50px cursor-pointer ${filterValue === "Rejected" ? "active-status" : null}`}
                style={{ fontFamily: "Lexend" }}
              >
                Rejected
              </span>
            </div>
          </div>
        </div>

        <div>
          <hr style={{color: "#EBEBEB",border: "1px solid #EBEBEB"}}/>
        </div>

        {filterList?.map((ele) => {
          return (
            <div>
              <div className="row">
                <div className="col-lg-7">
                  <div className="d-flex justify-content-lg-between  align-items-center ">
                    <div>
                      <div style={{ height: "49px", width: "49px" }}>
                        <img src="/assets/images/avatars/avatar_1.jpg" className="h-100 w-100" style={{borderRadius:"50%"}} alt="" />
                      </div>
                    </div>

                    <div className="ms-3">
                      <div className="d-flex ">
                        <div className="">
                          <span
                            className="fs-17-50px fw-400 text-md-start"
                            style={{ fontSize: "Lexend" }}
                          >
                            {ele?.name}
                          </span>
                        </div>
                        <div className="ms-4">
                          <span
                            className="fs-17-50px fw-400"
                            style={{ fontSize: "Lexend" }}
                          >
                            {ele?.degination}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span
                          className="fs-17-50px fw-400"
                          style={{ fontSize: "Lexend", color: "#908F8F" }}
                        >
                          {ele?.content}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5 d-flex align-items-center ">
                  <div
                    className="d-flex align-items-center"
                  >
                    <div className="d-flex justify-content-lg-between flex-column flex-sm-row col-9 gap-3">
                      <div>
                        <button
                          className="fs-17-50px fw-400 text-center"
                          style={{
                            background: "#A0FF9E",
                            color: "#005B14",
                            borderRadius: "5px",
                            width: "103px",
                            height: "40px",
                            border: "none",
                          }}
                        >
                          Approve
                        </button>
                      </div>
                      <div>
                        <button
                          className="fs-17-50px fw-400 text-center"
                          style={{
                            background: "#FFF598",
                            color: "#5F6100",
                            borderRadius: "5px",
                            width: "103px",
                            height: "40px",
                            border: "none",
                          }}
                        >
                          Hold
                        </button>
                      </div>
                      <div>
                        <button
                          className="fs-17-50px fw-400 text-center"
                          style={{
                            background: "#FFA9A9",
                            color: "#600000",
                            borderRadius: "5px",
                            width: "103px",
                            height: "40px",
                            border: "none",
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <hr style={{color: "#EBEBEB",border: "1px solid #EBEBEB"}}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

