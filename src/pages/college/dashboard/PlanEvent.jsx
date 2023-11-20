import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { apiAuth, apiJsonAuth } from 'api';
import { pop2, Popup } from 'layout/Popup';
import { Avatar, Button, Tooltip } from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useGlobalContext } from 'global/context';
import Swal from 'sweetalert2';
import { object, string } from 'yup';
import useError from 'lib/errorResponse';
import { Download, PersonAdd, PriorityHigh } from '@mui/icons-material';

const PlanEvent = () => {
  const [
    details,
    students,
    fetchStudents,
    fetchDelegates,
    certificates,
    delegates,
    shareableLink,
    DownloadQR,
    fetchStdCoordinate,
    StdCoordinate,
    searchTerm,
    setSearchTerm,
    fetchDetails,
  ] = useOutletContext();
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [formFields, setFormFields] = useState();
  const [track, setTrack] = useState([]);
  const [defaultCountrys, setDefalultCountrys] = useState(new Set());
  const [countrys, setCountrys] = useState(['Bangladesh', 'Nigeria', 'Netherlands', 'Mauritius', 'Oman', 'UAE', 'Singapore', 'Egypt']);
  const [event, setEvent] = useState(false);
  const [eventData, setEventData] = useState();
  const [newCountry, setCountry] = useState('');
  const [activeTrack, setActiveTrack] = useState([]);
  const [show, setShow] = useState(false);
  const [eventPlan, setEventPlan] = useState();
  const [delegatesCount, setDelegatesCount] = useState(0);
  const [eventdelegates, setEventDelegates] = useState(0);
  const navigate = useNavigate();
  async function fetchData() {
    if (token) {
      try {
        const responce = await apiAuth.get('institute/event', {
          headers: {
            Authorization: token,
          },
        });
        if (responce?.data?.result[0]) {
          setEventData(responce?.data?.result[0]);
          setEvent(true);
        }
      } catch (err) {
        ErrorResponder(err);
        // console.error("DATA FETCHING :", err);
      }
      try {
        const formField = await apiAuth.get('institute/eventData', {
          headers: {
            Authorization: token,
          },
        });
        if (formField) {
-          formField.data.tracks.map(({ id, name }) => {
            if (id && name) track[id] = name;
          });
          formField.data.countrys.map(({ name }) => {
            defaultCountrys.add(name);
          });
          setFormFields(formField.data);
        }
      } catch (err) {
        ErrorResponder(err);
        // throw err;
      }
    }
  }
  React.useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // useEffect(() => {
  //   fetchStudents();
  //   fetchDelegates();
  //   fetchDetails();
  // }, [eventData])

  //////////////////////////////////Destructuring Data//////////////////////////////////

  useEffect(() => {
    // var coutryWiseStudent = (responce?.country ? JSON.parse(responce?.country)?.length : 0)
    // var designationWiseStudent = 0 // (responce?.designation ? JSON.parse(responce?.designation)?.length : 0)
    // var trackWiseStudent = (responce?.track ? JSON.parse(responce?.track)?.length : 0)
    if (eventData) {
      if (eventData?.track && eventData?.country && eventData.designation && eventData.theme) {
        setEventPlan({
          ...eventPlan,
          track: JSON.parse(eventData?.track),
          country: JSON.parse(eventData?.country),
          designation: JSON.parse(eventData?.designation),
          theme: JSON.parse(eventData?.theme),
        });
      }
    }
  }, [eventData]);
  useEffect(() => {
    /************************************************************************************/
    ////////////////////////////// Shorting Delegates ////////////////////////////////////////////
    var count = 0;
    if (eventPlan) {
      eventPlan?.track?.forEach((track, trackIndex) => {
        eventPlan.designation[track]?.forEach((designation, designationIndex) => {
          eventPlan?.country?.forEach((country, countryIndex) => {
            count = count + 1;
          });
        });
      });
      setDelegatesCount(count);
    }
    /*************************************************************************************** */
  }, [eventPlan]);

  const deleteEvent = () => {
    Swal.fire({
      title: 'Are you sure?',
      html: `<ul class="text-start list-group"><li class="list-group-item">All the Followings Will Be Deleted :</li>
             <li  class="list-group-item">⦾Event PLan YMG20 </li>
             <li  class="list-group-item">⦾Assigned Track to Delegates </li></ul>`,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/8213/8213126.png',
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then(async (result) => {
      if (result?.isConfirmed) {
        try {
          const responce = await apiAuth.delete('institute/event', {
            headers: {
              Authorization: token,
            },
          });
          if (responce?.data) {
            pop2.success({
              title: responce?.data?.message,
            });
            setEventData(false);
            setEvent(false);
            fetchData();
          }
        } catch (err) {
          ErrorResponder(err);
          // console.error("Event Deleteing Error  :", err);
          // pop2.warning({
          //   title: `Something Went Wrong!!`,
          // });
        }
      }
    });
  };

  const handleTracks = (e) => {
    var id = e.target.id;
    if (e.target.checked) {
      if (!activeTrack.includes(id)) setActiveTrack([...activeTrack, id]);
    } else {
      setActiveTrack(activeTrack.filter((i) => i !== id));
    }
  };

  const validateFields = (values) => {
    let flag = 0;
    if (activeTrack?.length) {
      activeTrack?.forEach((list) => {
        if (!values?.designation[track[list]]?.length) {
          flag = 1;
        }
      });
    }
    if (!values?.tracks.length) {
      Popup('error', 'Tracks Are Required!!');
    } else if (!values?.theme) {
      Popup('error', 'Themes For Tracks Are Required!!');
    } else if (Object.keys(values?.theme).length !== activeTrack?.length) {
      Popup('error', 'Themes For All Tracks Are Required!!');
    } else if (!values?.designation) {
      Popup('error', 'Designation is Required!');
    } else if (flag) {
      Popup('error', 'Designation For All Tracks is Required!');
    } else {
      return 1;
    }
  };

  function deligatesCount(values) {
    var count = 0;
    values?.tracks.map((track) => {
      values?.designation[track]?.map((designation) => {
        if (values?.country.length) {
          count += 20 + values?.country.length;
        } else {
          count += 20;
        }
      });
    });
    setEventDelegates(count);
  }

  const addHandler = () => {
    if (newCountry == '') {
      setShow(true);
    } else {
      setCountrys([...countrys, newCountry]);
      setCountry('');
      setShow(false);
    }
  };
  return (
    <>
      {/* Event Table */}
      {(eventData || event) && (
        <div className="container p-3">
          <div className="d-flex justify-content-between">
            <div>
              <span className=" fs-4 text-dark fw-bold">Planned YMG20 Event Data</span>
              <a href="#event">
                <button
                  hidden={details.isAssigned === 'true'}
                  className="btn btn-success py-2 ms-4 px-3 rounded-3"
                  onClick={() => {
                    setEvent(false);
                  }}>
                  Update Event
                </button>
              </a>
              <button
                hidden={details.isAssigned === 'false'}
                className="btn btn-success py-2 ms-4 px-3 rounded-3"
                onClick={() => {
                  deleteEvent();
                }}>
                Delete Event!
              </button>
            </div>
            {/* <div className="d-flex jus" >
              <Button className="mb-3 text-right" variant="outlined" onClick={() => {
                window.history.back()

              }} color="success" >Go Back</Button>
            </div> */}
          </div>
          <table className="table table-borderless border rounded-4 mt-4 new-design-table fs-5">
            <tbody>
              <tr className="my-auto">
                <th scope="row">Discussion Tracks</th>
                <td>
                  {eventData?.track
                    ? JSON.parse(eventData?.track)?.map((item, i) => {
                        return (
                          <div className="border m-1 border-dark d-inline-block rounded-3 p-2  me-2 px-3" key={i}>
                            <div className="d-flex align-items-center">
                              <span className="ms-2">{item}</span>
                            </div>
                          </div>
                        );
                      })
                    : ''}
                </td>
              </tr>
              <tr>
                <th scope="row">Themes for Tracks</th>
                <td>
                  {eventData?.theme
                    ? Object.entries(JSON.parse(eventData?.theme))?.map((item, i) => {
                        if (item[0] !== 'Leaders Track')
                          return (
                            <div className="border m-1 border-dark d-inline-block rounded-3 p-2  me-2 px-3">
                              <div className="flex flex-column flex-lg-row align-items-center">
                                <h6 className="ms-2">{item[0]}</h6>
                                <span className="ms-2">{item[1]}</span>
                              </div>
                            </div>
                          );
                      })
                    : ''}
                </td>
              </tr>
              <tr>
                <th scope="row">Designations in Tracks</th>
                <td>
                  {eventData?.designation
                    ? Object.entries(JSON.parse(eventData?.designation))?.map((item, i) => {
                        if (item[1].length)
                          return (
                            <div className="border m-1 border-dark d-inline-block rounded-3 p-2  me-2 px-3" key={i}>
                              <div className="d-flex align-items-center">
                                <span className="ms-2">{item[1] + ' (' + item[0] + ') '}</span>
                              </div>
                            </div>
                          );
                      })
                    : ''}
                </td>
              </tr>
              <tr>
                <th scope="row">G20 Countries</th>
                <td>
                  {defaultCountrys
                    ? Array.from(defaultCountrys).map((item, i) => {
                        //if(eventData?.country.includes(countrys))
                        return (
                          <div className="border m-1 border-dark d-inline-block rounded-3 p-2  me-2 px-3" key={i}>
                            <div className="d-flex align-items-center">
                              <small className="ms-1 ">{item}</small>
                            </div>
                          </div>
                        );
                      })
                    : ''}
                </td>
              </tr>
              <tr>
                <th scope="row">Guest Countries</th>
                <td>
                  {eventData?.country && JSON.parse(eventData?.country).length > defaultCountrys.size ? (
                    JSON.parse(eventData?.country)?.map((item, i) => {
                      if (!defaultCountrys.has(item))
                        return (
                          <div className="border m-1 border-dark d-inline-block rounded-3 p-2  me-2 px-3" key={i}>
                            <div className="d-flex align-items-center">
                              <small className="ms-1 ">{item}</small>
                            </div>
                          </div>
                        );
                    })
                  ) : (
                    <p>No Guest Countries</p>
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">Total Delegates Required :</th>
                <td>
                  {delegatesCount ? (
                    <div>
                      <Tooltip
                        hidden={delegates === delegatesCount}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate('/dashboard/students');
                        }}
                        title={
                          delegates < deligatesCount
                            ? 'You have less then required number of Delegates.'
                            : 'You have more then required number of Delegates.'
                        }>
                        <div className="border border-dark d-inline-block rounded-3 position-relative p-2  me-2 px-3">
                          <div className="d-flex align-items-center">
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                background: 'lightgreen',
                                color: 'black',
                              }}></Avatar>
                            <span className="ms-2">{delegatesCount}</span>
                          </div>
                          <PriorityHigh
                            hidden={delegates === delegatesCount}
                            className="fs-6 bg-warning position-absolute start-100 top-0 border rounded-circle start-100"
                            color="red"
                          />
                        </div>
                      </Tooltip>
                    </div>
                  ) : (
                    ''
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="container d-flex m-2 justify-content-center">
            <div className="card py-2 px-3 text-black bg-success text-center fs-5">
              {delegates === delegatesCount ? (
                <spam
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/dashboard/delegates');
                  }}>
                  Assign Delegates
                </spam>
              ) : deligatesCount > delegates ? (
                <spam
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/dashboard/students');
                  }}>
                  {' '}
                  Add Delegates
                </spam>
              ) : (
                <spam
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/dashboard/delegates');
                  }}>
                  {' '}
                  Remove Delegates
                </spam>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Event Form */}
      {!event && (
        <Formik
          initialValues={{
            tracks: [],
            designation: {
              'Finance Track': [],
              'Sherpa Track': [],
              'Foreign Ministers Track': [],
              'Leaders Track': [],
            },
            country: [],
            theme: [],
          }}
          onSubmit={async (value) => {
            if (value.tracks.includes('Leaders Track')) {
              value.theme = {
                ...value.theme,
                'Leaders Track': 'Climate Change and Disaster Risk Reduction:Making Sustainability a Way of Life',
              };
            }
            if (validateFields(value)) {
              if (!value?.country.includes(defaultCountrys)) {
                value.country = [...value.country, ...defaultCountrys];
              }
              if (token) {
                try {
                  const response = await apiJsonAuth.post('institute/event', value, {
                    headers: {
                      Authorization: token,
                    },
                  });
                  if (response) {
                    fetchData();
                    setActiveTrack([]);
                    fetchDetails();
                    fetchDelegates();
                    Popup('success', response?.data?.message);
                    setActiveTrack([]);
                  }
                } catch (err) {
                  ErrorResponder(err);
                  // Popup("error", err?.response?.data?.message);
                }
              } else {
                Popup('Error', 'Token Not Found!');
              }
            }
          }}>
          {({ handleSubmit, handleChange, isSubmitting, values, setFieldValue }) => (
            <Form
              id="event"
              onSubmit={handleSubmit}
              onInputCapture={() => {
                deligatesCount(values);
              }}>
              <div className="container border  p-3 rounded">
                <h3 className="fs-4">
                  PLAN YOUR SUMMIT <br />
                  <small className="fs-6">
                    <a
                      download={'How-to-plan-your-YMG20.pdf'}
                      href="https://yuvamanthan.s3.ap-south-1.amazonaws.com/uploads/BRIEFING-GUIDE-Yuvamanthan-Model+G20-Summit.pdf"
                      target="_blank">
                      <Download /> Download
                    </a>{' '}
                    the 'How to plan your YMG20' guide for instructions.
                  </small>
                  <br />
                  <span className="fs-6">( Assign themes, tracks, designations and countries. )</span>
                </h3>
                <div className="accordion" id="accordionExample">
                  {/* Track */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button p-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        Select Discussion Tracks
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body p-0">
                        <div className="container py-4">
                          <h6>Choose The Number Of Tracks You Wish To Have At The Summit</h6>
                          <div>
                            {formFields?.tracks
                              ? formFields?.tracks.map(({ name, id }) => {
                                  return (
                                    <div key={id} className="container-fluid">
                                      <input type="checkbox" id={id} name="tracks" value={name} onClick={handleTracks} onChange={handleChange} />
                                      <label htmlFor={id} className="ms-2">
                                        {name}
                                      </label>
                                    </div>
                                  );
                                })
                              : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Track Themes */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed p-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo">
                        Choose Discussion Themes for Tracks
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="accordion-body p-0 py-4">
                        <div className="container-fluid">
                          <h6>Choose Track and Assign Theme</h6>
                          <div>
                            {activeTrack &&
                              activeTrack.map((active, index) => {
                                return (
                                  <div hidden={track[active] === 'Leaders Track'} key={index}>
                                    <div className="input-group py-2 px-1">
                                      <span className="input-group-text">{track[active]}</span>
                                      <select
                                        className="form-select"
                                        defaultValue=""
                                        name="theme"
                                        onChange={(e) => {
                                          setFieldValue('theme', {
                                            ...values.theme,
                                            [track[active]]: e.target.value,
                                          });
                                        }}>
                                        <option disabled={true} key="0" value="">
                                          Choose a Theme
                                        </option>
                                        {formFields?.themes &&
                                          formFields?.themes.map(({ name }) => {
                                            return <option key={name}>{name}</option>;
                                          })}
                                      </select>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Designation */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed p-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree">
                        Select Designations in Tracks
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div>
                          {!activeTrack.length && <p>Select Track First</p>}
                          {activeTrack.map((active) => {
                            return formFields.designations
                              .filter((x) => x.track_id == active)
                              .map(({ name }) => {
                                return (
                                  <>
                                    <input
                                      type="checkbox"
                                      className="btn-check"
                                      id={name}
                                      name="designation"
                                      value={name}
                                      onChange={(e) => {
                                        e.target.checked ? values.designation[track[active]].push(name) : values.designation[track[active]].pop(name);
                                      }}
                                    />
                                    <label htmlFor={name} className="btn btn-outline-success p-2 m-1 px-4">
                                      {track[active] + ' : ' + name}
                                    </label>
                                  </>
                                );
                              });
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Country */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed p-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour">
                        Add Guest Countries (Optional)
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div>
                          {countrys.map((country, i) => {
                            return (
                              <>
                                <input type="checkbox" className="btn-check" id={country} name="country" value={country} onChange={handleChange} />
                                <label htmlFor={country} className="btn btn-outline-success p-2 m-1 px-4">
                                  {country}
                                </label>
                              </>
                            );
                          })}
                          <div className="form-group mx-sm-3 mb-2">
                            {show && (
                              <input
                                type="text"
                                className="form-control "
                                value={newCountry}
                                onChange={(e) => {
                                  setCountry(e.target.value);
                                }}
                              />
                            )}
                            <button className="btn btn-outline-primary p-2 px-3" type="button" onClick={addHandler}>
                              {show ? 'ADD' : '+Add Country'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-around my-2">
                  <button className="btn btn bg-info rounded-4 py-2 px-3 px-4" disabled={isSubmitting} type="submit">
                    Submit
                  </button>
                  <small hidden={!eventdelegates} className="card shadow-sm bg-transparent px-1 py-2">
                    <Tooltip
                      title={`Required number of Delegates to perform this event. Its dependes on the numbers of Tracks, Designations and Countries ( default number of countries ${defaultCountrys.size})`}>
                      <h5 className="text-center fs-6 text-disabled m-1">*Delegates Required {eventdelegates}</h5>
                    </Tooltip>
                  </small>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default PlanEvent;
