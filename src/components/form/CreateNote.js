import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputText from "../InputText";
import { useEdit, useGet, usePost } from "../../helper/request";
import Successdialog from "../../components/dialog/succesdialog";
import Errordialog from "../../components/dialog/errordialog";
const defaultValues = {
  title: "",
  note: "",
};

const schema = yup.object().shape({
  title: yup.string().required("This column must be filled in."),
  note: yup.string().required("This column must be filled in."),
});

function CreateNote() {
  const location = useLocation();
  const navigate = useNavigate();
  //alert dialog state
  const [msgResponse, setMsgResponse] = useState("");
  const [errorDialog, setErrorDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [dataEdit, setDataEdit] = useState();

  const { action, id_edit } = location.state || {};

  const { control, handleSubmit, watch, formState, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const form = watch();

  // get data
  const [fetch_data_edit, res_data_edit] = useGet();

  function fetch_data() {
    fetch_data_edit({}, `notes/${id_edit}`);
  }
  useEffect(() => {
    if (res_data_edit.success) {
      // console.log(res_data_edit.success_res);
      setDataEdit(res_data_edit.success_res.note);
    }
  }, [res_data_edit.success]);

  useEffect(() => {
    if (res_data_edit.failed) {
      console.log("error get", res_data_edit.error_res);
    }
  }, [res_data_edit.failed]);

  useEffect(() => {
    fetch_data();
  }, [id_edit]);
  useEffect(() => {
    setValue("title", dataEdit?.title || "");
    setValue("note", dataEdit?.note || "");
  }, [setValue, dataEdit]);
  // create template

  const [create_data_note, res_data_note] = usePost("notes");

  useEffect(() => {
    if (res_data_note.success) {
      // console.log(res_data_note.success_res);
      setMsgResponse(res_data_note.success_res.message || "successfull");
      setSuccessDialog(true);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [res_data_note.success]);

  useEffect(() => {
    if (res_data_note.failed) {
      setErrorDialog(true);
      setMsgResponse(res_data_note.error_res.data.message);
    }
  }, [res_data_note.failed]);

  // func edit

  const [edit_data_note, res_edit_note] = useEdit(`notes/${id_edit}`);

  useEffect(() => {
    if (res_edit_note.success) {
      setSuccessDialog(true);
      setMsgResponse(res_edit_note.success_res.message);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    }
  }, [res_edit_note.success]);

  useEffect(() => {
    if (res_edit_note.failed) {
      setMsgResponse("Failed to Edit Data!");
      setErrorDialog(true);
    }
  }, [res_edit_note.failed]);

  function onSubmit(data) {
    if (action === "Edit") {
      edit_data_note(data);
    } else {
      create_data_note(data);
    }
  }

  if (_.isEmpty(form)) {
    return null;
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24">
        <div className="p-20">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <InputText
                control={control}
                label="Title"
                name="title"
                type="text"
                error={!!errors.title}
                helperText={errors?.title?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputText
                control={control}
                label="Note"
                name="note"
                multiline={true}
                error={!!errors.note}
                helperText={errors?.note?.message}
              />
            </Grid>
          </Grid>
        </div>
      </form>
      <div className="flex items-center justify-end p-8 gap-6">
        <Button
          className="mx-8"
          variant="contained"
          color="error"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          className="mx-8"
          variant="contained"
          color="info"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </div>
      <Successdialog dialog={successDialog} message={msgResponse} />
      <Errordialog
        dialog={errorDialog}
        closedialog={() => setErrorDialog(false)}
        message={msgResponse}
      />
    </div>
  );
}

export default CreateNote;
