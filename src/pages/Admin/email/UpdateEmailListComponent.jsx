import { Dialog, MenuItem } from "@mui/material";
import { apiAuth, apiJsonAuth } from "api";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const UpdateEmailListComponent = ({ reload, id, detail }) => {
  const [show, setShow] = useState(false);
  const [updateDetail, setUpdateDetail] = useState({
    email: detail?.email ? detail?.email : "",
    type: detail?.type ? detail?.type : "whitelist",
    description: detail?.description ? detail?.description : "",
  });
  const UpdateEmailList = async () => {
    try {
      const res = await apiJsonAuth.put("admin/email-list", { ...updateDetail, id });
      if (res.status == 200) {
        toast.success("Email List Added");
        setShow(false);
        setUpdateDetail({ email: "", type: "whitelist", description: "" });
        reload();
      }
    } catch (error) {
      let msg = error?.response?.data?.message ? error?.response?.data?.message : "Something Went Wrong Check your Network Connection";
      toast.error(msg);
    }
  };
  return (
    <>
      <MenuItem className="btn h-100 rounded-0" onClick={() => setShow(true)}>
        Update Email
      </MenuItem>
      <Dialog fullWidth={true} open={show} onClose={() => setShow(false)} dialogClassName="modal-90w">
        <Modal.Body className="p-3">
          <h4>Add Email</h4>
          <input type="text" className="form-control rounded-0 p-1 my-2" placeholder="Write email" value={updateDetail.email} onChange={(e) => setUpdateDetail({ ...updateDetail, email: e.target.value })} />
          <select name="type" className="form-select rounded-0 py-2" value={updateDetail?.type} onChange={(e) => setUpdateDetail({ ...updateDetail, type: e.target.value })}>
            <option value={"whitelist"}>Whitelist</option>
            <option value={"blacklist"}>BlackList</option>
            <option value={"whitelist"}>Whitelist</option>
          </select>
          <textarea type="text" className="form-control rounded-0 p-1 my-2" placeholder="Write Description" onChange={(e) => setUpdateDetail({ ...updateDetail, description: e.target.value })}>
            {updateDetail.description}
          </textarea>
          <button className="btn btn-success rounded-0" onClick={UpdateEmailList}>
            Submit
          </button>
        </Modal.Body>
      </Dialog>
    </>
  );
};

export default UpdateEmailListComponent;
