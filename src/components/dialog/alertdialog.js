import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

export default function ({ closedialog, dialog, onDelete }) {
  return (
    <div>
      <Dialog
        open={dialog}
        onClose={closedialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="flex flex-col w-full">
          <div className="flex w-full h-full justify-center self-center ">
            <HelpRoundedIcon
              sx={{ width: "89px", height: "89px" }}
              color="error"
            />
          </div>
          <DialogContentText
            id="alert-dialog-description"
            className="text-center font-700 text-18"
          >
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex justify-center gap-12 pb-32 px-12">
          <Button
            onClick={closedialog}
            autoFocus
            className="flex-1"
            color="error"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            className="flex-1"
            color="info"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
