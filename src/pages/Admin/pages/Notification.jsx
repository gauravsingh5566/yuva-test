import { Send } from "@mui/icons-material";
import { Autocomplete, Button, CircularProgress, FormControl, FormLabel, Option, Select, Stack, Textarea } from "@mui/joy";
import { apiJsonAuth } from "api";
import MyCKEditor from "components/MyCKEditor";
import { useFormik } from "formik";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Notification() {
  const [notifyType, setNotifyType] = useState("all");
  const [userList, setUserList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const UserSelectRef = useRef();
  const formik = useFormik({
    initialValues: {
      role: "all",
      desc: "",
      heading: "",
      subHeading: "",
    },
    onSubmit: (value) => {
      if (["specific", "institute"].includes(notifyType) && (selected?.length === 0 || selected === null)) {
        return toast.warning("Selcet the spectific User OR Institute ");
      } else {
        value.desc = desc;
        Swal.fire({
          title: "Send Notification",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Send",
          confirmButtonColor: "success",
        }).then(({ isConfirmed }) => {
          if (isConfirmed) {
            apiJsonAuth
              .post("/public/notification", {
                ...value,
                type: notifyType,
                users: selected,
              })
              .then((res) => {
                toast.success("Notification is Send.");
                setSelected([]);
                setDesc("");
                formik.resetForm();
              })
              .catch();
          }
        });
      }
    },
  });
  useEffect(() => {
    const temp = userList
      ? userList?.flatMap((l) => ({
          label: l.id + "  :  " + l.name,
          id: l.id,
        }))
      : [];
    setOptionList(temp);
  }, [userList]);

  const fetchUsers = () => {
    setLoading(true);
    apiJsonAuth
      .put("/public/notification", {
        role: formik.values.role,
        type: notifyType,
      })
      .then(({ data: { userList } }) => {
        setUserList(userList);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [formik.values.role, notifyType]);

  return (
    <div>
      <SimpleBreadCrumb2
        page={`Notification Manager`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/notification", text: "Notification", active: true },
        ]}
      />
      <div className="container py-3">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-6  my-2">
              <FormControl>
                <FormLabel>Notification is For :</FormLabel>
                <Select
                  name="type"
                  value={formik.values.role}
                  onChange={(e, value) => {
                    formik.setFieldValue("role", value);
                    value === "all" || value === "both" ? setNotifyType("all") : setNotifyType("specific");
                    setSelected([]);
                  }}>
                  <Option value="student">Student</Option>
                  <Option value="teacher">Teacher</Option>
                  <Option value="admin">Institute</Option>
                  <Option value="both">Students + Teachers</Option>
                  <Option value="all">All</Option>
                </Select>
              </FormControl>
            </div>
            <div className="col-6  my-2">
              <FormControl>
                <FormLabel>Send notification to :</FormLabel>
                <Select
                  name="type"
                  value={notifyType}
                  onChange={(e, value) => {
                    setNotifyType(value);
                    setSelected([]);
                  }}>
                  <Option value="specific" disabled={formik.values.role === "all" || formik.values.role === "both"}>
                    specific Users
                  </Option>
                  <Option value="institute" disabled={formik.values.role === "admin" || formik.values.role === "all"}>
                    Specific Institute
                  </Option>
                  <Option value="all">All</Option>
                </Select>
              </FormControl>
            </div>
            <div hidden={!(notifyType === "specific" || notifyType === "institute")} className="col my-2">
              <FormControl>
                <FormLabel>Send notification to :</FormLabel>
                <Stack>
                  <Autocomplete
                    ref={UserSelectRef}
                    multiple={!(notifyType === "institute")}
                    value={selected}
                    onChange={(e, value) => {
                      setSelected(value);
                    }}
                    loading={loading}
                    endDecorator={loading ? <CircularProgress size="sm" sx={{ bgcolor: "background.surface" }} /> : null}
                    options={optionList ?? []}
                    placeholder="select Users"
                  />
                </Stack>
              </FormControl>
            </div>
          </div>
          <Textarea className="my-2" name="heading" placeholder="Enter Heading" value={formik.values.heading} onChange={formik.handleChange}></Textarea>
          <Textarea className="my-2" name="subHeading" placeholder="Enter Sub Heading" value={formik.values.subHeading} onChange={formik.handleChange}></Textarea>
          <div className="my-2">
            <MyCKEditor content={desc} setContent={setDesc} />
          </div>
          <div className="d-flex my-2">
            <Button type="submit" endDecorator={<Send className="fs-6" />}>
              Send Notification
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Notification;
