import { Button, Divider, TextField } from "@mui/material";
import { apiAuth, apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function QuizQuestions() {
  const { id } = useParams();
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const [type, setType] = useState(false);
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState({});
  const [count, setCount] = useState(2);
  const [loading, setLoading] = useState(false);
  const [quesList, setQuesList] = useState();
  const rows = [];
  const { token } = useGlobalContext();
  useEffect(() => {
    if (token)
      apiAuth
        .get(`/course/quiz/questions?id=${id}`)
        .then((res) => {
          setQuesList(res?.data.result);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [token]);

  if (type) {
    for (let i = 1; i < count; i++) {
      rows.push(
        <input
          className="form-control rounded-0 mt-2 p-2"
          required={type}
          placeholder={"Option " + i}
          size="small"
          value={options[i]}
          key={i}
          onChange={(e) => {
            setOptions((opt) => {
              return { ...opt, [i]: e.target.value };
            });
          }}
        />
      );
    }
  }

  function createQuestion() {
    setLoading(true);
    apiJsonAuth
      .post("/course/quiz/questions", {
        quizId: id,
        type: type ? 1 : 2,
        ques: question,
        ans: type ? options[0] : null,
        options: type ? JSON.stringify(Object.values(options)) : null,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setLoading(false);
          toast.success("Question Created.");
          setShow(!show);
        } else {
          toast.error("Something Went Wrong");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something Went Wrong");
      });
  }

  return (
    <div className="container">
      <div className="row justify-content-around  g-2">
        <div className="col-12 col-lg-6">
          <div className="card rounded-0 h-100 p-2  bg-light">
            <span>Title</span> <p>{state?.title}</p>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card rounded-0 h-100 p-2  bg-light">
            <span>Level</span> <p>{state?.level}</p>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card rounded-0 h-100 p-2  bg-light">
            <span>Duration</span>
            <p> {state?.duration}</p>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card rounded-0 h-100 p-2  bg-light">
            <span>Passing</span> <p>{state?.passing_criteria}%</p>
          </div>
        </div>
        <div hidden={!state?.desc} className="col-12 ">
          <div className="card rounded-0 h-100 p-2 bg-light">
            <span>Description</span> <p>{state?.desc}</p>
          </div>
        </div>
        <div className="col-12"></div>
      </div>
      <div className="container position-relative mt-4">
        <Divider />
        <div className="row row-cols-1 row-cols-lg-2 align-items-center g-0 gy-2">
          <div className="col">
            <h4>Quiz Questions</h4>
          </div>
          <div className="col">
            <div className="d-flex justify-content-end">
              <button
                className="rounded-0 btn"
                onClick={() => {
                  setShow(!show);
                }}>
                Add Question
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div>
        {quesList?.map((item) => (
          <div key={item?.id} className="card  p-2 w-100 mt-2">
            <p className="container px-2 fs-6 m-0 ">{item.ques}</p>
            {JSON.parse(item.options)?.map((option, i) => (
              <small key={i} className="text-dark fs-6 lh-1 m-1 px-2">
                &nbsp;{++i}&nbsp;{option}
              </small>
            ))}
          </div>
        ))}
      </div>

      {/* Add Question Modal  */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createQuestion();
            }}>
            <div>
              <TextField required className="my-2" size="small" value={question} onChange={(e) => setQuestion(e.target.value)} multiline minRows={2} label="Questions" fullWidth />
              <div class="form-check form-switch">
                <input
                  class="form-check-input p-2 hover-pointer"
                  type="checkbox"
                  id="type-switch"
                  onChange={() => {
                    setType(!type);
                  }}
                />
                <label class="form-check-label" for="type-switch" className="mt-1">
                  <span>MCQ</span>
                </label>
              </div>
              <div hidden={!type} className="border mt-3 p-2">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <h5>Options</h5>
                  <div className="input-group ms-3">
                    <button
                      className="btn btn-sm rounded-0 py-2"
                      onClick={() => {
                        setCount(count - 1);
                        delete options[count];
                      }}
                      disabled={count == 2}>
                      -
                    </button>
                    <button
                      className="btn btn-sm rounded-0 py-2"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                      disabled={count == 6}>
                      +
                    </button>
                  </div>
                </div>
                {rows}
                <div className="mt-2">
                  <span className="text-dark">Answer</span>
                  <input
                    className="p-1 form-control rounded-0 border-success"
                    required={type}
                    placeholder="Write Answer"
                    label="Answer"
                    value={options[0]}
                    onChange={(e) =>
                      setOptions((opt) => {
                        return { ...opt, [0]: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
              <Button type="submit" className="mt-3 text-center py-3" fullWidth color="success" variant="contained" disabled={loading}>
                Add
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default QuizQuestions;
