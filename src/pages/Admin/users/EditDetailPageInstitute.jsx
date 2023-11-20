import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
const EditDetailPage = () => {
  const { instituteId } = useParams();
  const [allInstituteData, setallInstituteData] = useState([]);
  const [institute, setInstitute] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    institution_name: "",
    bio: "",
    contact: "",
    institution_address: "",
    phone: "",
    email: "",
    first_name: "",
    last_name: "",
    logo: "",
    page: "",
    pincode: "",
    state: "",
    status: "",
    twitter: "",
    ytb: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}institute/updateInstitute/${instituteId}`, formData);
      if (response.status === 200) {
        // Show a success toast message
        toast.dismiss();
        toast.success("Successfully Updated");

        // Fetch the updated institute data
        await fetchAllInstitute();

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
  const fetchAllInstitute = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "institute/allInOne");
      setallInstituteData(res.data.allInsitute);
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchAllInstitute();
  }, []);
  useEffect(() => {
    if (allInstituteData.length > 0) {
      const foundInstitute = allInstituteData.find((institute) => {
        return institute.id == instituteId;
      });
      setFormData(foundInstitute);
      setInstitute(foundInstitute);
    }
  }, [instituteId, allInstituteData]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="" style={{ color: "#ff8100" }}>
          {institute.institution_name}
        </h1>
        <div className="" style={{ marginRight: "12%" }} onClick={() => setShowModal(true)}>
          <button className="editDetailbutton">Edit</button>
        </div>
      </div>
      <br />
      <br />
      <div className="d-flex justify-content-center align-items-center" style={{ textAlign: "center", minWidth: "40%" }}>
        <table className="table table-hover table-striped ">
          <tbody>
            <tr>
              <th>Institute Name</th>
              <th>{institute.institution_name}</th>
            </tr>
            <tr>
              <th>Bio</th>
              <th>{institute.bio}</th>
            </tr>
            <tr>
              <th>Contact</th>
              <th>{institute.contact}</th>
            </tr>
            <tr>
              <th>Address</th>
              <th>{institute.institution_address}</th>
            </tr>
            <tr>
              <th>Phone</th>
              <th>{institute.phone}</th>
            </tr>
            <tr>
              <th>Email</th>
              <th>{institute.email}</th>
            </tr>
            <tr>
              <th>First Name</th>
              <th>{institute.first_name}</th>
            </tr>
            <tr>
              <th>Last Name</th>
              <th>{institute.last_name}</th>
            </tr>
            <tr>
              <th>Logo</th>
              <th>{institute.logo}</th>
            </tr>
            <tr>
              <th>Page</th>
              <th>{institute.page}</th>
            </tr>
            <tr>
              <th>Pincode</th>
              <th>{institute.pincode}</th>
            </tr>
            <tr>
              <th>State</th>
              <th>{institute.state}</th>
            </tr>
            <tr>
              <th>Status</th>
              <th>{institute.status}</th>
            </tr>
            <tr>
              <th>Twitter</th>
              <th>{institute.twitter}</th>
            </tr>

            <tr>
              <th>Youtube</th>
              <th>{institute.ytb}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Modal dialogClassName="wider-modal" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Institute</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center" style={{ textAlign: "center", minWidth: "40%" }}>
              <table className="table table-hover table-striped ">
                <tbody>
                  <tr>
                    <th>Institute Name</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="institution_name" value={formData.institution_name} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Bio</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="bio" value={formData.bio} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Contact</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="contact" value={formData.contact} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="institution_address" value={formData.institution_address} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <th>
                      <input readOnly style={{ width: "78%" }} type="text" name="email" value={formData.email} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>First Name</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Logo</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="logo" value={formData.logo} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Page</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="page" value={formData.page} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Pincode</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>State</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="state" value={formData.state} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="status" value={formData.status} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Twitter</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="twitter" value={formData.twitter} onChange={handleChange} />
                    </th>
                  </tr>
                  <tr>
                    <th>Youtube</th>
                    <th>
                      <input style={{ width: "78%" }} type="text" name="ytb" value={formData.ytb} onChange={handleChange} />
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end">
              <button className="saveEditButton" style={{}} onClick={handleSubmit}>
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default EditDetailPage;
