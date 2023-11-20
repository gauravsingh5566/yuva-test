import { apiAuth, apiJsonAuth } from "api";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const AddEmailListComponent = ({ reload }) => {
  const [show, setShow] = useState(false);
  const [addEmailDetail, setAddEmailDetail] = React.useState({
    email: "",
    type: "whitelist",
    description: "",
  });
  const AddEmailList = async () => {
    try {
      const res = await apiJsonAuth.post("admin/email-list/new", addEmailDetail);
      if (res.status == 200) {
        toast.success("Email List Added");
        setShow(false);
        setAddEmailDetail({ email: "", type: "whitelist", description: "" });
        reload();
      }
    } catch (error) {
      let msg = error?.response?.data?.message ? error?.response?.data?.message : "Something Went Wrong Check your Network Connection";
      toast.error(msg);
    }
  };
  return (
    <>
      <button className="btn h-100 rounded-0" onClick={() => setShow(true)}>
        Add Email
      </button>
      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Add Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control rounded-0 p-1 my-2" placeholder="Write email" value={addEmailDetail.email} onChange={(e) => setAddEmailDetail({ ...addEmailDetail, email: e.target.value })} />
          <select name="type" className="form-select" onChange={(e) => setAddEmailDetail({ ...addEmailDetail, type: e.target.value })}>
            <option value={"whitelist"}>Whitelist</option>
            <option value={"blacklist"}>BlackList</option>
            <option value={"whitelist"}>Whitelist</option>
          </select>
          <textarea type="text" className="form-control rounded-0 p-1 my-2" placeholder="Write Description" onChange={(e) => setAddEmailDetail({ ...addEmailDetail, description: e.target.value })}>
            {addEmailDetail.description}
          </textarea>
          <button className="btn btn-success rounded-0" onClick={AddEmailList}>
            Submit
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddEmailListComponent;
