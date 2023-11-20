import { api, apiAuth, apiJsonAuth } from "api";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { Divider, InputLabel, MenuItem, Select } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import { useGlobalContext } from "global/context";
import { Popup } from "layout/Popup";
import useError from "lib/errorResponse";
import { toast } from "react-toastify";
import AdditionalDetails from "./StudentEditAdditionalDetails";
import { Spinner } from "react-bootstrap";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";

const StudentEditPreference = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [userData, fullDetails, fetchDetails] = useOutletContext();
  const [activeTopic, setActiveTop] = React.useState(0);
  // Fetch Data
  const [g20Topics, setG20RTopics] = useState([]);

  const fetchTopic = async () => {
    try {
      const res3 = await api.get("/public/topics");
      if (res3.status === 200) {
        setG20RTopics(res3.data.result);
        setActiveTop(res3.data.fullDetails.topicId);
      }
    } catch (error) {
      // console.log("Error", error);
    }
  };
  useEffect(() => {
    fetchTopic();
  }, []);
  // Basic Update Formik
  const formik = useFormik({
    initialValues: {
      topicId: fullDetails?.topicId,
      sub_topicId: fullDetails?.sub_topicId,
      reporting_council: fullDetails?.reporting_council,
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (token) {
        setLoading(true);
        try {
          const res = await apiJsonAuth.put(
            `/student/profile?update_type=preference`,
            {
              topicId: values.topicId,
              sub_topicId: values.sub_topicId,
              reporting_council: "Yes",
              studentId: userData.id,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (res.status === 200) {
            toast.dismiss();
            toast.success(res.data.message);
            setLoading(false);
          }
        } catch (error) {
          if (error) {
            let msg = error.response.data.message ? error.response.data.message : "Something Went Wrong Check  your Network Connection";
            toast.dismiss();
            toast.error(msg);
          }
          ErrorResponder(error);
          setLoading(false);
        }
      }
    },
  });
  // console.log("Sub Topic : ", g20Topics);
  return (
    <>
      <div>
        <h4 className="mt-2 text-secondary">Event Details</h4>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <div className="row row-cols-1 row-cols-lg-2 mt-3 g-2">
            <div className="col">
              <h5>My favourite Discussion Theme is</h5>
            </div>
            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="topicId-label">Select Discussion Theme {g20Topics?.length}</InputLabel>
                <Select
                  labelId="topicId-label"
                  id="topicId"
                  // defaultValue={fullDetails?.topicId}
                  name={"topicId"}
                  label="Select Discussion Theme"
                  InputLabelProps={{ shrink: true }}
                  onChange={formik.handleChange}>
                  {g20Topics?.map((topic, i) => {
                    return (
                      <MenuItem onClick={() => setActiveTop(i)} key={i} value={topic?.id}>
                        {topic?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 mt-3 g-2">
            <div className="col">
              <h5>My favourite Sub Topic is</h5>
            </div>
            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="sub_topicId-label">Select Sub Topic</InputLabel>
                <Select labelId="sub_topicId-label" id="sub_topicId" defaultValue={fullDetails?.sub_topicId} name={"sub_topicId"} label="Select Sub Topic" InputLabelProps={{ shrink: true }} onChange={formik.handleChange}>
                  {g20Topics[activeTopic]?.sub_topics?.map((subTopic, i) => {
                    return (
                      <MenuItem value={subTopic?.id} key={i}>
                        {subTopic?.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            <Button color="success" variant="outlined" size="large" type="submit" disabled={loading} startIcon={loading ? <Spinner size="sm" /> : <CheckCircleOutlineOutlined />}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentEditPreference;
