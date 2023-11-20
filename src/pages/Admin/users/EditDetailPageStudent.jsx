import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Form, Button } from "react-bootstrap";
import { apiAuth, apiJsonAuth } from "api";

const EditDetailPageStudent = () => {
  const { studentId } = useParams();
  const [allStudentData, setallStudentData] = useState([]);
  const [student, setStudent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    address: "",
    contact: "",
    email: "",
    bio: "",
    dob: "",
    gender: "",
    instituteId: "",
    profile: "",
    role: "",
    status: "",
    twitter: "",
    ytb: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}student/updateStudent/${studentId}`, formData);
      if (response.status === 200) {
        // Show a success toast message
        toast.dismiss();
        toast.success("Successfully Updated");

        // Fetch the updated institute data
        fetchAllStudent();
        // Close the modal and perform any other necessary actions
        setShowModal(false);
      } else {
        toast.dismiss();
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something Went Wrong");
      console.error(error);
      // Handle the error (e.g., display an error message)
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fetchAllStudent = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "student/allInOne");
      setallStudentData(res.data.allStudent);
    } catch (error) {
      console.error(error);
    }
  };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const ChangePassword = async () => {
    try {
      if (password == confirmPassword) {
        const res = await apiJsonAuth.post("admin/student/reset-password", { studentId, password });
        setPassword("");
        setConfirmPassword("");
        setPasswordModal(false);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchAllStudent();
  }, []);

  useEffect(() => {
    if (allStudentData.length > 0) {
      const foundStudent = allStudentData.find((student) => {
        return student.id == studentId;
      });
      setFormData(foundStudent);
      setStudent(foundStudent);
    }
  }, [allStudentData, studentId]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fs-3">{student.first_name + " " + student.last_name}</h1>
        <div>
          <div className="d-flex justify-content-end">
            <button className="btn rounded-0" onClick={() => setPasswordModal(true)}>
              Change Password
            </button>
            <button className="btn rounded-0 ms-2" onClick={() => setShowModal(true)}>
              Edit Details
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-striped border p-2">
          <tbody>
            <tr>
              <th className="p-3">First Name</th>
              <th className="p-3">{student.first_name}</th>
            </tr>
            <tr>
              <th className="p-3">Last Name</th>
              <th className="p-3">{student.last_name}</th>
            </tr>
            <tr>
              <th className="p-3">Father Name</th>
              <th className="p-3">{student.father_name}</th>
            </tr>
            <tr>
              <th className="p-3">Address</th>
              <th className="p-3">{student.address}</th>
            </tr>
            <tr>
              <th className="p-3">Contact</th>
              <th className="p-3">{student.contact}</th>
            </tr>
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">{student.email}</th>
            </tr>
            <tr>
              <th className="p-3">Bio</th>
              <th className="p-3">{student.bio}</th>
            </tr>
            <tr>
              <th className="p-3">Date Of Birth</th>
              <th className="p-3">{student.dob}</th>
            </tr>
            <tr>
              <th className="p-3">Gender</th>
              <th className="p-3">{student.gender}</th>
            </tr>
            <tr>
              <th className="p-3">Institute Id</th>
              <th className="p-3">{student.instituteId}</th>
            </tr>
            <tr>
              <th className="p-3">Profile</th>
              <th className="p-3">{student.profile}</th>
            </tr>
            <tr>
              <th>Role</th>
              <th>{student.role}</th>
            </tr>
            <tr>
              <th className="p-3">Status</th>
              <th className="p-3">{student.status}</th>
            </tr>
            <tr>
              <th className="p-3">Twitter</th>
              <th className="p-3">{student.twitter}</th>
            </tr>

            <tr>
              <th className="p-3">Youtube</th>
              <th className="p-3">{student.ytb}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Modal show={passwordModal} onHide={() => setPasswordModal(false)} dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" className="form-control rounded-0 p-1 my-2" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" className="form-control rounded-0 p-1 my-2" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className="btn btn-success rounded-0" onClick={ChangePassword}>
              Submit
            </button>
          </Modal.Body>
        </Modal>
        <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-dark">Edit Institute</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row  text-start g-3">
              <div className="col">
                <label>First Name</label>
                <input className="form-control rounded-0 p-1" type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label>Last Name</label>
                <input class="form-control rounded-0 p-1" type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label>Father name</label>
                <input class="form-control rounded-0 p-1" type="text" name="father_name" value={formData.father_name} onChange={handleChange} />
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <label>Contact</label>
                <input class="form-control rounded-0 p-1" type="text" name="contact" value={formData.contact} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label>Email</label>
                <input class="form-control rounded-0 p-1" type="text" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label>Date Of Birth</label>
                <input class="form-control rounded-0 p-1" type="text" name="dob" value={formData.dob} onChange={handleChange} />
              </div>
              <div className="col-12 col-lg-6">
                <label>Bio</label>
                <textarea class="form-control rounded-0 p-1" style={{ height: 80 }} type="text" name="bio" onChange={handleChange}>
                  {formData.bio}
                </textarea>
              </div>
              <div className="col-12 col-lg-6">
                <label>Address</label>
                <textarea class="form-control rounded-0 p-1" style={{ height: 80 }} type="text" name="address" onChange={handleChange}>
                  {formData.address}
                </textarea>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <label>Gender</label>
                <input class="form-control rounded-0 p-1" type="text" name="gender" value={formData.gender} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label>Institute Id</label>
                <input class="form-control rounded-0 p-1" type="text" name="instituteId" value={formData.instituteId} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label>Profile</label>
                <input class="form-control rounded-0 p-1" type="text" name="profile" value={formData.profile} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label>Role</label>
                <input class="form-control rounded-0 p-1" type="text" name="role" value={formData.role} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label>Status</label>
                <input class="form-control rounded-0 p-1" type="text" name="status" value={formData.status} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label>Twitter</label>
                <input class="form-control rounded-0 p-1" type="text" name="twitter" value={formData.twitter} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label>Youtube</label>
                <input class="form-control rounded-0 p-1" type="text" name="ytb" value={formData.ytb} onChange={handleChange} />
              </div>
              <div className="col-12">
                <button className="w-100 btn rounded-0 btn-success" style={{}} onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default EditDetailPageStudent;
