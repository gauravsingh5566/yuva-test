import { CalendarMonth, CheckCircleOutlineOutlined, HelpOutlineOutlined } from "@mui/icons-material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useGlobalContext } from "global/context";
import { apiAuth, apiJsonAuth } from "api";
import { toast } from "react-toastify";
import moment from "moment";
import { Spinner } from "react-bootstrap";
const themes = [
  "Future of Work: Industry 4.0, Innovation, & 21st-Century Skills",
  "Peacebuilding and Reconciliation: Usheringin an Era of No War",
  "Climate Change and Disaster Risk Reduction:Making Sustainability a Way of Life",
  "Shared Future: Youth in Democracy and Governance Youth in Legislature And Politics",
  "Health, Wellbeing, and Sports: Agenda forYouth",
];
function InstituteEditEvent() {
  const inputDate = useRef();
  let [date, setDate] = useState("");
  let [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);
  let [update, setUpdate] = useState(0);
  const { userData } = useGlobalContext();
  async function getEventDate() {
    try {
      const res = await apiAuth.get("institute/onboard/event-update?id=" + userData?.id);
      if (res.status === 200) {
        setEventDate(res?.data?.result[0]);
        setDate(res?.data?.result[0]?.appointment_date);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const Formik = useFormik({
    initialValues: {
      appointment_date: eventDate?.appointment_date,
      deadline: eventDate?.deadline,
      theme: eventDate?.theme ?? "",
    },
    enableReinitialize: true,
    onSubmit: async (value, action) => {
      setLoading(true);
      try {
        const res = await apiJsonAuth.post(`institute/onboard/event-update?id=` + userData?.id, {
          Date: moment(date.$d).format("YYYY-MM-DD") || eventDate.appointment_date,
          deadline: value.deadline,
          theme: value.theme,
        });
        if (res.status === 200) {
          toast.dismiss();
          toast.success("Event Updated Successfully");
          setUpdate(update + 1);
          setLoading(false);
        }
      } catch (err) {
        toast.dismiss();
        toast.warning("Event Updation failed");
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    getEventDate();
  }, []);
  return (
    <div>
      <div>
        <form onSubmit={Formik.handleSubmit}>
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>Event Date</h5>
              <p className="fs-6">Choose A Date On Which You Want To Organise Yuvamanthan Model G20. Ideally you should plan a Model G20 Summit 15 days in advance.</p>
            </div>
            <div className="col">
              <div className="p-2 border rounded-4">
                <LocalizationProvider dateAdapter={AdapterDayjs} className="py-4 hide-few-things">
                  <StaticDatePicker
                    disablePast={true}
                    value={Formik?.values?.appointment_date}
                    slots={{
                      ActionBar: <> </>,
                    }}
                    orientation={"landscape"}
                    onChange={(newDate) => {
                      setDate(newDate);
                      Formik.setFieldValue("appointment_date", newDate);
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>Student Registrations Deadline</h5>
              <p className="fs-6">Select a deadline for students to register for the YMG20 summit that you wish to organise in your institution. Ideally, the deadline should be kept atleast a week before the summit so that the students get ample time to prepare.</p>
            </div>
            <div className="col">
              <Button
                fullWidth
                startIcon={<CalendarMonth />}
                onClick={() => {
                  inputDate.current.showPicker();
                }}
                className="fs-6 lh-1 p-3 rouded"
                variant="outlined">
                {Formik.values.deadline ? Formik.values.deadline : eventDate?.deadline}
                <input ref={inputDate} className="opacity-0 position-absolute" type="date" name="deadline" onChange={Formik.handleChange} max={moment(new Date(date)).format("YYYY-MM-DD")} min={moment().format("YYYY-MM-DD")} />
              </Button>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>Select Theme for the Event.</h5>
            </div>
            <div className="col">
              <select className="mx-auto form-select mt-0 w-100 py-3" name="theme" as="select" value={Formik.values.theme} onChange={Formik.handleChange}>
                <option value="" disabled>
                  Select a Theme
                </option>
                {themes.map((theme, i) => {
                  return <option key={i}>{theme}</option>;
                })}
              </select>
              <small className="text-danger">{Formik?.errors?.theme && Formik?.touched?.theme ? Formik?.errors?.theme : ""}</small>
            </div>
          </div>
          <div className="mt-4">
            <Button startIcon={loading ? <Spinner size="sm" /> : <CheckCircleOutlineOutlined />} color="success" variant="outlined" disabled={Formik.isSubmitting} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InstituteEditEvent;
