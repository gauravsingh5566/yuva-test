import * as React from "react";
import Button from "@mui/material/Button";
import { JsonViewer } from "@textea/json-viewer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MailDialog({ detail, btnText }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="standard" size="sm" onClick={handleClickOpen}>
        {btnText}
      </Button>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <div className="p-3">{detail}</div>
      </Dialog>
    </div>
  );
}
