import { Add, Details } from '@mui/icons-material';
import { Button, Input, TextField } from '@mui/material';
import { apiAuth, apiJson } from 'api';
import { useFormik } from 'formik';
import { useGlobalContext } from 'global/context';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import OfflineEventsList from './OfflineEventsList';
import { useRef } from 'react';
import moment from 'moment';

function OfflineEventConrtol() {
  const [details] = useOutletContext();
  const [eventForm, setEventForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState();
  const [file, setFile] = useState();
  const [eventId, setEventId] = useState();
  const inputImg = useRef();

  async function fetch() {
    try {
      const res = await apiAuth.get('/public/offline_event?instituteId=' + details?.instituteId + '&teacherId=' + details?.id);
      setEventDetails(res.data.result);
      // console.log(res.data.result);
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }
  useEffect(() => {
    if (details) {
      fetch();
    }
  }, [details, loading]);

  function uploadEventImage() {
    toast.loading('Uploading Image...');
    if (file && !loading) {
      setLoading(true);
      apiAuth
        .post('/public/offline_event_image', {
          img: file,
          eventId,
          instituteId: details?.instituteId,
          teacherId: details?.id,
        })
        .then((res) => {
          setLoading(false);
          inputImg.current.value = null;
          toast.dismiss();
          toast.success('Image Uploaded!');
          setFile();
        })
        .catch((err) => {
          toast.dismiss();
          setLoading(false);
          toast.warning('Something Went Wrong!');
          console.error(err);
        });
    } else {
      toast.warning('Select Image.');
    }
  }

  const { values, handleChange, resetForm, errors, handleSubmit, touched } = useFormik({
    initialValues: {
      teacherId: details?.id,
      instituteId: details?.instituteId,
      name: '',
      theme: '',
      date: '',
      location: '',
    },
    onSubmit: (value) => {
      value.instituteId = details?.instituteId;
      value.teacherId = details?.id;
      if (value.instituteId && value.teacherId && value.theme && value.name) {
        setLoading(true);
        apiJson
          .post('public/offline_event', value)
          .then((res) => {
            if (res.data.status == 200) {
              resetForm();
              setLoading(false);
              toast.success('Event Created');
            }
          })
          .catch((err) => {
            setLoading(false);
            toast.error('Something Went Wrong!!');
          });
      } else {
        setLoading(false);
        toast.warning('All Fields Are Required.');
      }
    },
  });

  return (
    <div>
      <h4 className="text-center text-decoration-underline position-relative">Event Media Upload</h4>
      <div className="position-relative">
        <div className="container d-flex justify-content-end">
          <Button variant="outlined" className="align-items-end" type="button" data-bs-toggle="modal" data-bs-target="#creatEventModal">
            Add Event
          </Button>
        </div>
        <div className="modal fade" id="creatEventModal" tabindex="-1" aria-labelledby="creatEventModal" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="creatEventModalTitel">
                  Create Event
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <TextField
                    required
                    size="medium"
                    className="m-1 my-2 px-1"
                    label="Vidyalaya Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    required
                    size="medium"
                    className="m-1 my-2 px-1"
                    multiline
                    minRows={2}
                    maxRows={4}
                    InputLabelProps={{ shrink: true }}
                    label="Details of Program"
                    name="theme"
                    value={values.theme}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    type="date"
                    size="medium"
                    className="m-1 my-2 px-1"
                    label="Event Date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    size="medium"
                    className="m-1 my-2 px-1"
                    label="Vidyalaya Location"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="bg-info shadow-sm border-1 rounded-2 p-1 px-2" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" disabled={loading} className="bg-success shadow-sm border-1 rounded-2 px-2 p-1">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="modal fade" id="imageUploadModal" tabindex="-1" aria-labelledby="imageUploadModal" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Event Images
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="container d-flex justify-content-center">
                    <Button variant="outlined" className="mx-auto p-2">
                      <input ref={inputImg} type="file" accept=".png, .jpg, .jpeg" onChange={(e) => setFile(e.target.files[0])} />
                    </Button>
                  </div>
                  <img className="img-thumbnail" src={file ? URL.createObjectURL(file) : ''} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="bg-info shadow-sm border-1 rounded-2 p-1 px-2" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" disabled={loading} onClick={uploadEventImage} className="bg-success shadow-sm border-1 rounded-2 px-2 p-1">
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            {eventDetails?.map((list) => (
              <div className="accordion-item">
                <h2 className="accordion-header" id={'flush-heading' + list?.id}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    onClick={() => {
                      setEventId(list?.id);
                    }}
                    data-bs-toggle="collapse"
                    data-bs-target={'#flush-collapse' + list?.id}
                    aria-expanded="false"
                    aria-controls="flush-collapseOne">
                    {list?.name} : {list?.location} {'( ' + moment(list?.date).format('Do MMM YYYY') + ' )'}
                  </button>
                </h2>
                <div
                  id={'flush-collapse' + list?.id}
                  className="accordion-collapse w-100 collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample">
                  {eventId && <OfflineEventsList eventId={list?.id} setEventId={setEventId} loading={loading} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfflineEventConrtol;
