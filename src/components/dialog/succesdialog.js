import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

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
          <div className="flex w-full justify-center self-center text-green-500">
            <CheckCircleRoundedIcon
              sx={{ width: "89px", height: "89px" }}
              color="success"
            />
          </div>
          <DialogContentText
            id="alert-dialog-description"
            className="text-center font-700 text-18"
          >
            {message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
