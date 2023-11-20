import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { apiAuth, apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";

import { FormControlLabel, Radio, RadioGroup, Select, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import { CheckCircleOutlineOutlined, Info } from "@mui/icons-material";
import useError from "lib/errorResponse";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const InstituteEditInfrastructure = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [details, fetchDetails] = useOutletContext();
  // Bsic Formik
  useEffect(() => {
    useFormik.initialValues = {
      question1: details?.io_q1,
      question2: details?.io_q2,
      question3: details?.io_q3,
      question4: details?.io_q4,
      question5: details?.io_q5,
      question6: details?.io_q6,
      question7: details?.io_q7,
      question8: details?.io_q8,
      question9: details?.io_q9,
    };
  }, [details]);
  const formik = useFormik({
    initialValues: {
      question1: details?.io_q1,
      question2: details?.io_q2,
      question3: details?.io_q3,
      question4: details?.io_q4,
      question5: details?.io_q5,
      question6: details?.io_q6,
      question7: details?.io_q7,
      question8: details?.io_q8,
      question9: details?.io_q9,
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      if (token) {
        try {
          const res = await apiJsonAuth.put(`/institute/profile?update_type=preference`, values, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status === 200) {
            toast.success(res?.data?.message);
            fetchDetails();
            setLoading(false);
          }
        } catch (error) {
          ErrorResponder(error);
          setLoading(false);
        }
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
          <div className="col">
            <h5>Number of students in your institution (Approx) ?</h5>
          </div>
          <div className="col">
            <TextField id="question1" type={"number"} fullWidth variant="outlined" value={formik?.values.question1} onChange={formik?.handleChange} error={formik?.touched.question1 && Boolean(formik?.errors.question1)} helperText={formik?.touched.question1 && formik?.errors.question1} />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
          <div className="col">
            <h5>Does your institution have an auditorium ?</h5>
          </div>
          <div className="col">
            <RadioGroup id="question2" name="question2" defaultValue={formik?.values.question2} onChange={formik?.handleChange} error={formik?.touched.question2 && Boolean(formik?.errors.question2)} helperText={formik?.touched.question2 && formik?.errors.question2}>
              <FormControlLabel value="Yes" checked={"Yes" === formik?.values.question2} control={<Radio />} label="Yes" />
              <FormControlLabel value="No" checked={"No" === formik?.values.question2} control={<Radio />} label="No" />
            </RadioGroup>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 mt-3">
          <div className="col">
            <h5>Number of large halls available for the summit</h5>
            <p className="fs-6 text-secondary">A typical YMG20 may require upto 3 seperate rooms/halls to conduct Track Meetings simultaneously. A large hall should be able to seat 60 students comfortably on 20 benches.</p>
          </div>
          <div className="col">
            <TextField id="question3" name="question3" type={"number"} fullWidth value={formik?.values.question3} onChange={formik?.handleChange} error={formik?.touched.question3 && Boolean(formik?.errors.question3)} helperText={formik?.touched.question3 && formik?.errors.question3} />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 mt-3">
          <div className="col">
            <h5> Does your institute conduct a Model United Nations?</h5>
          </div>
          <div className="col">
            <FormControl>
              <RadioGroup id="question4" name="question4" defaultValue={formik?.values.question4} onChange={formik?.handleChange} InputLabelProps={{ shrink: true }} error={formik?.touched.question4 && Boolean(formik?.errors.question4)} helperText={formik?.touched.question4 && formik?.errors.question4}>
                <FormControlLabel value="Yes" checked={"Yes" === formik?.values.question4} control={<Radio />} label="Yes" />
                <FormControlLabel value="No" checked={"No" === formik?.values.question4} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 mt-3">
          <div className="col">
            <h5>Does your institute conduct a Youth Parliament?</h5>
          </div>
          <div className="col">
            <FormControl>
              <RadioGroup id="question5" name="question5" defaultValue={formik?.values.question5} onChange={formik?.handleChange} error={formik?.touched.question5 && Boolean(formik?.errors.question5)} helperText={formik?.touched.question5 && formik?.errors.question5}>
                <FormControlLabel value="Yes" checked={"Yes" === formik?.values.question5} control={<Radio />} label="Yes" />
                <FormControlLabel value="No" checked={"No" === formik?.values.question5} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 mt-3">
          <div className="col">
            <h5> Would you like to use Yuvamanthan’s printing services to print your summit collaterals?</h5>
          </div>
          <div className="col">
            <FormControl>
              <RadioGroup id="question6" name="question6" defaultValue={formik?.values.question6} onChange={formik?.handleChange} error={formik?.touched.question6 && Boolean(formik?.errors.question6)} helperText={formik?.touched.question6 && formik?.errors.question6}>
                <FormControlLabel value="Yes" checked={"Yes" === formik?.values.question6} control={<Radio />} label="Yes" />
                <FormControlLabel value="No" checked={"No" === formik?.values.question6} control={<Radio />} label="No thanks we have our own printers" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 mt-3">
          <div className="col">
            <h5> WiFi Available </h5>
            <p className="fs-6 text-secondary">
              Each venue, room or hall should ideally have access to WiFi or Mobile Internet for students to be able to access student dashboards. Else a space needs to be allocated where students can take notes on the Discussion Board and Vote through it. If no internet is available, YMG20 should be conducted through pen and paper and voting
              should be conducted by raising of hands
            </p>
          </div>
          <div className="col">
            <FormControl>
              <RadioGroup id="question7" name="question7" defaultValue={formik?.values.question7} onChange={formik?.handleChange} error={formik?.touched.question7 && Boolean(formik?.errors.question7)} helperText={formik?.touched.question7 && formik?.errors.question7}>
                <FormControlLabel value="Yes" checked={"Yes" === formik?.values.question7} control={<Radio />} label="Yes" />
                <FormControlLabel value="No" checked={"No" === formik?.values.question7} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 mt-3">
          <div className="col">
            <h5> Projector available? </h5>
            <p className="fs-6 text-secondary">A projector in each room is a great addition when delegates are voting to show them the results</p>
          </div>
          <div className="col">
            <FormControl>
              <RadioGroup id="question8" name="question8" defaultValue={formik?.values.question8} onChange={formik?.handleChange} error={formik?.touched.question8 && Boolean(formik?.errors.question8)} helperText={formik?.touched.question8 && formik?.errors.question8}>
                <FormControlLabel value="Yes" checked={"Yes" === formik?.values.question8} control={<Radio />} label="Yes" />
                <FormControlLabel value="No" checked={"No" === formik?.values.question8} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-2 mt-3">
          <div className="col">
            <h5>Sound and Acoustics at Venues - Microphone Available?</h5>
            <p className="fs-6 text-secondary">A microphone in every room will help delegates be heard properly</p>
          </div>
          <div className="col">
            <FormControl>
              <RadioGroup id="question9" name="question9" defaultValue={formik?.values.question9} onChange={formik?.handleChange} error={formik?.touched.question9 && Boolean(formik?.errors.question9)} helperText={formik?.touched.question9 && formik?.errors.question9}>
                <FormControlLabel value="Yes" checked={"Yes" === formik?.values.question9} control={<Radio />} label="Yes" />
                <FormControlLabel value="No" checked={"No" === formik?.values.question9} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="mt-4">
          <Button disabled={loading} startIcon={loading ? <Spinner size="sm" /> : <CheckCircleOutlineOutlined />} color="success" variant="outlined" size="large" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InstituteEditInfrastructure;
