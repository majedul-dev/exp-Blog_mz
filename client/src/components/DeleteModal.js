import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DeleteModal = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary'>Disagree</Button>
        <Button color='primary' autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
