import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export default function ({ closedialog, dialog, onDelete, message = "" }) {
  return (
    <div>
      <Dialog
        open={dialog}
        onClose={closedialog}
        hideBackdrop={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="ml-200"
      >
        <DialogContent className="flex flex-col w-full">
          <div className="flex w-full justify-center self-center text-red-500">
            <CancelRoundedIcon
              sx={{ width: "89px", height: "89px" }}
              color="error"
            />
          </div>
          <DialogContentText
            id="alert-dialog-description"
            className="text-center font-700 text-18"
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closedialog} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
