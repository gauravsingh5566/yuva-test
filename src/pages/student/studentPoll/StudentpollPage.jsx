import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form } from "react-bootstrap";
import { IconButton, Avatar, Button } from "@mui/material";
import { apiJsonAuth, apiAuth } from "api";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Divider from "@mui/material/Divider";
import { useGlobalContext } from "global/context";
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import useError from "lib/errorResponse";
import { toast } from "react-toastify";

function StudentpollPage({ details }) {
  const { ErrorResponder } = useError();
  const [questions, setQuestion] = React.useState();
  const [votesCount, setVoteCount] = React.useState({});
  const { userData, token } = useGlobalContext();
  async function fetchData() {
    try {
      const response = await apiAuth.get("student/studentpoll", {
        headers: {
          Authorization: token,
        },
      });
      if (response) {
        // console.log("Fetch Result", response?.data?.result);
        setQuestion(response?.data?.result);
      }
    } catch (error) {
      ErrorResponder(error);
    }
    // Fetch Counts Of Poll
    try {
      const response = await apiJsonAuth.put(
        `student/studentpoll`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response) {
        // console.log("Fetch Result", response?.data?.result);
        setVoteCount(response.data?.result);
      }
    } catch (error) {
      ErrorResponder(error.response?.data?.message);
    }
  }
  React.useEffect(() => {
    fetchData();
  }, [token]);

  const ListVote = ({ id, option }) => {
    var list = 0;
    if (votesCount.length) {
      votesCount.map(({ poll_question_id, vote, votePercent }) => {
        if (poll_question_id === id && vote === option) {
          return (list = Math.floor(votePercent));
        }
      });
    }
    return (
      <div className="progress-bar" style={{ width: list + "%" }}>
        {/* {list && <span>{list}%</span>} */}
      </div>
    );
  };
  const uploadData = async (vote, id) => {
    try {
      const response = await apiJsonAuth.post(`student/studentpoll`, {
        vote,
        pollQuestionId: id,
      });
      if (response.status === 200) {
        toast.success("Vote Submitted");
        setTimeout(() => {
          fetchData();
        }, 1000);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  return (
    <div className="">
      <div id="pollCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5>🔥Latest Polls</h5>
          </div>
          <div className="d-flex align-items-center">
            <IconButton className="p-0 me-2" type="button" data-bs-target="#pollCarousel" data-bs-slide="prev">
              <ArrowCircleLeftOutlined sx={{ color: "green", fontSize: 30 }} />
              <span className="visually-hidden">Previous</span>
            </IconButton>
            <IconButton className="p-0" type="button" data-bs-target="#pollCarousel" data-bs-slide="next">
              <ArrowCircleRightOutlined sx={{ color: "green", fontSize: 30 }} />
              <span className="visually-hidden ">Next</span>
            </IconButton>
          </div>
        </div>
        <div className="carousel-inner py-2">
          <>
            {questions &&
              questions.map((ques, i) => {
                return (
                  <div key={i} className={` carousel-item h-100 ${i === 0 && "active"}`}>
                    <Card key={i} className="form item-center text-center border py-2 px-1 rounded-3">
                      <Card.Header className="bg-white border-0 text-start text-dark lh-sm p-2">
                        <h6> {ques?.poll_ques}</h6>
                      </Card.Header>
                      <Card.Body className="p-0 text-center item-center">
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                          className="container text-center">
                          {Object.values(JSON.parse(ques.options)).length &&
                            Object.values(JSON.parse(ques.options)).map((option, key) => {
                              return (
                                <div key={key}>
                                  <div className="d-flex align-items-end">
                                    {!ques.vote ? (
                                      <PollButton handlePoll={uploadData} quesId={ques?.id} option={option} />
                                    ) : (
                                      <div className="w-100">
                                        <div className="text-start border rounded-2 mb-1 p-relative">
                                          <div className="text-dark p-absolute d-flex align-items-center justify-content-start h-100 w-100 px-2 lh-sm py-1">
                                            <small className="fw-semibold">{option}</small>
                                          </div>
                                          <div style={{ minHeight: "2.5rem", maxHeight: "4rem", "--bs-progress-bar-bg": "#7eb1fb" }} className="progress poll" role="progressbar">
                                            {ques.vote && <ListVote id={ques.id} option={option} />}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <Divider />
                                </div>
                              );
                            })}
                        </Form>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </>
        </div>
      </div>
    </div>
  );
}
const PollButton = ({ option, handlePoll, quesId }) => {
  return (
    <button
      className="mb-1 w-100 py-2 px-2 lh-sm text-start border border-success bg-white rounded-2 text-success"
      onClick={() => {
        handlePoll(option, quesId);
      }}>
      <small className="fw-semibold">{option}</small>
    </button>
  );
};
export default StudentpollPage;
