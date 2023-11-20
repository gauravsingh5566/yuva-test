import NotFoundGif from "layout/NotFoundGif";
import SimpleBreadCrumb from "layout/SimpleBreadCrumb";
import React, { useEffect, useState } from "react";
import { StudentDataCard } from "./StudentDataCard";
import { Button } from "react-bootstrap";
import { useGlobalContext } from "global/context";
import { apiJsonAuth } from "api";
import useError from "lib/errorResponse";

export const StudentProfileCardList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(12);
  const [offset, setOffset] = useState(0);
  const { token } = useGlobalContext();
  const { ErrorResponder } = useError();
  const [studentDataList, setStudentDataList] = useState([]);
  //=============Fetch Student List ================\\

  const fetchStudentList = async () => {
    if (token) {
      try {
        const res = await apiJsonAuth.get(
          `/api/v2/institute/fetchStudentDetails?searchTerm=${searchTerm}&limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          setStudentDataList(res?.data);
        }
      } catch (error) {
        ErrorResponder(error);
        // if (error) {
        //   toast.dismiss();
        //   toast.error(error.response?.data.message);
        // }
        console.log(error?.response?.data?.message);
      }
    }
  };

  //Handle Pagination Function
  const handlePaginationNext = () => {
    let increment = Number(offset) + Number(limit);

    if (increment < studentDataList?.count) {
      setOffset(increment);
    }
  };

  const handlePaginationPrev = () => {
    let decrement = Number(offset) - Number(limit);
    if (decrement > 0) {
      setOffset(decrement);
    } else {
      setOffset(0);
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      fetchStudentList();
    }, 1000);
    return () => {
      clearTimeout(timeOut);
      console.log("clear");
    };
  }, [searchTerm, limit, offset]);
  return (
    <>
      <SimpleBreadCrumb page="Student" />
      <div className="container py-3">
        <div className="mb-2">
          <div className="col-12 col-lg-6">
            <div className="input-group border rounded-0">
              <input
                className="form-control border-0"
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {

                //   }
                // }}
                value={searchTerm}
                placeholder={"Search Student Name Here...."}
                aria-label={"Search Student Name Here...."}
                aria-describedby="button-addon2"
              />
              {searchTerm?.length ? (
                <button
                  className="btn btn-sm btn-danger border-0"
                  type="button"
                  id="button-addon3"
                  onClick={() => {
                    setSearchTerm("");
                    fetchStudentList();
                  }}
                >
                  <i className="bi bi-x-circle"></i>
                  <small className="d-lg-inline-block">&nbsp;Clear</small>
                </button>
              ) : (
                ""
              )}
              <button
                className="btn btn-success fw-thin text-white border-0 rounded-0"
                type="button"
                id="button-addon2"
                onClick={() => {
                  fetchStudentList();
                }}
              >
                <i className="bi bi-search"></i>
                <small className="d-lg-inline-block">&nbsp;Search</small>
              </button>
            </div>
          </div>
          {studentDataList?.result?.length ? (
            <>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-1 g-md-2 g-lg-3 row-cols-lg-4 mt-4">
                {studentDataList?.result?.map((studentDetail, studentId) => {
                  return (
                    <StudentDataCard
                      studentDetail={studentDetail}
                      studentId={studentId}
                      reload={fetchStudentList}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <NotFoundGif text={"No Student Has Registered Yet!"} />
          )}

          {/* Paginatiton code component */}
          <div className=" mt-3">
            <div className="d-grid gap-3 d-md-flex justify-content-md-end">
              <select
                name="limit"
                value={limit}
                className="form-select w-25"
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
              <Button
                variant="outline-primary"
                size="sm"
                className="text-capitalize rounded"
                onClick={handlePaginationPrev}
                disabled={Number(offset) < Number(limit) ? true : false}
              >
                Prev
              </Button>
              <Button>{offset ? offset / limit + 1 : 1}</Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="text-capitalize rounded"
                onClick={handlePaginationNext}
                disabled={
                  Number(offset) + Number(limit) + 1 > studentDataList.count
                    ? true
                    : false
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
