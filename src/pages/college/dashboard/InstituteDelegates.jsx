import { AutoAwesomeMosaic, Clear, ClearAll, DownloadDone, Refresh, Search } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import NotFoundGif from 'layout/NotFoundGif';
import { pop2, Popup } from 'layout/Popup';
import ParkingLot from 'lib/autoAssign';
import useError from 'lib/errorResponse';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';
import { object } from 'yup';
import StudentDelegateCard from './components/StudentDelegateCard';
import { toast } from 'react-toastify';
import SimpleBreadCrumb from 'layout/SimpleBreadCrumb';

const InstituteDelegates = () => {
  const { details, fetchDetails } = useOutletContext();
  const [responce, setResponce] = useState();
  const [delegatesList, setDelegateList] = useState([]);
  const [eventPlan, setEventPlan] = useState();
  const [delegates, setDelegates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { userData, token } = useGlobalContext();
  const { ErrorResponder } = useError();
  // Fetch Delegates and Reload Functionality
  const fetchDelegates = async () => {
    if (token) {
      try {
        const res = await apiJsonAuth.post(
          `/institute/delegates?search=${searchTerm}`,
          {
            instituteId: userData?.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          setDelegates(res.data.result);
        }
      } catch (error) {
        ErrorResponder(error); // Popup("error", error.response.data.message);
      }
    }
  };

  //fetching YMG20 Event Plan
  async function fetchData() {
    if (token) {
      try {
        const responce = await apiJsonAuth.get('institute/event', {
          headers: {
            Authorization: token,
          },
        });
        if (responce?.data?.result[0]) {
          setResponce(responce?.data?.result[0]);
        }
      } catch (err) {
        console.error('DATA FETCHING :', err);
      }
    }
  }
  React.useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
  //Remove From Delegates
  const removeFromDelegate = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove student from delegates',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/8213/8213126.png',
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiJsonAuth.delete(`/institute/delegate?studentId=${id}`, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status === 200) {
            fetchDelegates();
            toast.dismiss();
            toast.success(res.status.message);
          }
        } catch (err) {
          ErrorResponder(err);
          // Popup("error", err.response.data.message);
        }
      }
    });
  };
  useEffect(() => {
    if (searchTerm === '') {
      fetchDelegates();
    }
  }, [searchTerm]);
  // End Fetch Delegates and Reload Functionality

  // ======================= Playing With The Counts =======================
  const [delegatesCount, setDelegatesCount] = useState(0);
  const [minDelegatesCount, setMinDelegatesCount] = useState(1);
  useEffect(() => {
    setDelegatesCount(delegates?.length);
  }, [delegates]);
  // ======================= End Playing With The Counts =======================

  //////////////////////////////////Destructuring Data//////////////////////////////////
  useEffect(() => {
    // var coutryWiseStudent = (responce?.country ? JSON.parse(responce?.country)?.length : 0)
    // var designationWiseStudent = 0 // (responce?.designation ? JSON.parse(responce?.designation)?.length : 0)
    // var trackWiseStudent = (responce?.track ? JSON.parse(responce?.track)?.length : 0)
    if (responce) {
      if (responce?.track && responce?.country && responce.designation && responce.theme) {
        setEventPlan({
          ...eventPlan,
          track: JSON.parse(responce?.track),
          country: JSON.parse(responce?.country),
          designation: JSON.parse(responce?.designation),
          theme: JSON.parse(responce?.theme),
        });
      }
    }
  }, [responce]);
  /************************************************************************************/

  ////////////////////////////// Shorting Delegates ////////////////////////////////////////////
  useEffect(() => {
    var count = 0;
    const delegateSet = new Set([]);
    if (eventPlan) {
      eventPlan?.track?.forEach((track, trackIndex) => {
        eventPlan?.designation[track]?.forEach((designation, designationIndex) => {
          eventPlan?.country?.forEach((country, countryIndex) => {
            delegateSet.add([{ count, track, designation, country }]);
            count = count + 1;
          });
        });
      });
      setDelegateList(delegateSet);
      setMinDelegatesCount(count);
    }
  }, [eventPlan]);

  const delegateAssigner = (SpaceObj) => {
    let count = 0;

    delegatesList.forEach(([{ track, designation, country }]) => {
      if (SpaceObj.isFull()) {
        return;
      }
      SpaceObj.park({
        name: delegates[count].first_name,
        delegateId: delegates[count].id,
        track: track,
        theme: eventPlan.theme[track],
        country: country,
        designation: designation,
      });
      count = count + 1;
      if (SpaceObj.isFull()) {
        try {
          const AssignResponse = apiJsonAuth.post('/institute/delegates/autoassign', SpaceObj?.slots, {
            headers: {
              Authorization: token,
            },
          });
          Promise.resolve(AssignResponse)
            .then((value) => {
              if (value.status === 200) {
                pop2.success({ title: 'Assigned Successfully', description: value?.data?.message, timer: 2500 });
                setTimeout(() => {
                  fetchDetails();
                  fetchDelegates();
                }, 2000);
              }
            })
            .catch((error) => {
              pop2.error({ title: 'Error', description: error?.response?.data?.message, timer: 2000 });
              setTimeout(() => {
                fetchDetails();
                fetchDelegates();
                setEventPlan(false);
              }, 2000);
            });
        } catch (error) {
          ErrorResponder(error);
        }
      }
    });
    // Confirmation After Assignment
    // End Confirmation After Assignment
  };

  const AutoAssignHandler = () => {
    Swal.fire({
      title: 'Are you sure?',
      html: `<ul class="text-start list-group"><li class="list-group-item"> Once you Auto Assign, designations and countries to delegates you won't be able to perform the following actions:</li><li  class="list-group-item">⦾ Add or remove delegates</li><li  class="list-group-item">⦾ Update something on 'Plan Your YMG20'</li></ul>`,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/8213/8213126.png',
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result?.isConfirmed) {
        if (minDelegatesCount === delegatesCount) {
          Popup('loading');
          // Creating Empty Space For Delegates
          const EmptySpace = new ParkingLot(minDelegatesCount);
          setTimeout(() => {
            delegateAssigner(EmptySpace);
          }, 1000);
        } else {
          pop2.warning({
            title: `${minDelegatesCount > delegatesCount ? 'Add' : 'Remove'} ${Math.abs(minDelegatesCount - delegatesCount)} Delegates to Continue`,
          });
        }
      }
    });
  };
  // ===============================End AutoAssig ========================
  return (
    <div>
      <SimpleBreadCrumb page={`Participants`} />
      <div className="container mt-2">
        <div className="row g-2">
          <div class="col-12 col-lg-6">
            <div class="input-group">
              <input
                class="form-control rounded-0"
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    fetchDelegates();
                  }
                }}
                value={searchTerm}
                placeholder="Search Student Name Here...."
                aria-label="Search Student Name Here...."
                aria-describedby="button-addon2"
              />
              {searchTerm.length ? (
                <button
                  class="btn btn-outline-secondary rounded-0"
                  type="button"
                  id="button-addon3"
                  onClick={() => {
                    setSearchTerm('');
                    fetchDelegates();
                  }}>
                  <i class="bi bi-x-circle"></i>
                </button>
              ) : (
                ''
              )}
              <button
                class="btn btn-success rounded-0"
                type="button"
                id="button-addon2"
                onClick={() => {
                  fetchDelegates();
                }}>
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <p>Total Delegates is {delegates.length}</p>
        </div>
        {delegates.length ? (
          <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-2">
            {delegates.map((delegate, i) => {
              return <StudentDelegateCard key={i} details={details} student={delegate} removeFromDelegate={removeFromDelegate} />;
            })}
          </div>
        ) : (
          <NotFoundGif text={'No Student Delegates Added Yet!'} />
        )}
      </div>
    </div>
  );
};

export default InstituteDelegates;
