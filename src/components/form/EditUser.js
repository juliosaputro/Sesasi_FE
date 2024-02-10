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
  name: "",
  user: "",
  pass: "",
};

const schema = yup.object().shape({
  name: yup.string().required("This column must be filled in."),
  user: yup.string().required("This column must be filled in."),
  pass: yup
    .string()
    .required()
    .min(6, "This column must be filled in and minimal 6 character."),
});

function EditUser() {
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
    fetch_data_edit({}, `users/${id_edit}`);
  }
  useEffect(() => {
    if (res_data_edit.success) {
      setDataEdit(res_data_edit.success_res.user);
    }
  }, [res_data_edit.success]);

  useEffect(() => {
    fetch_data();
  }, [id_edit]);
  useEffect(() => {
    setValue("name", dataEdit?.name || "");
    setValue("user", dataEdit?.user || "");
    setValue("pass", dataEdit?.pass || "");
  }, [setValue, dataEdit]);
  // func edit

  const [edit_data_note, res_edit_note] = useEdit(`users/${id_edit}`);

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
    edit_data_note(data);
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
                label="Name"
                name="name"
                type="text"
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputText
                control={control}
                label="Username"
                name="user"
                multiline={true}
                error={!!errors.user}
                helperText={errors?.user?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputText
                control={control}
                label="Password"
                name="pass"
                multiline={true}
                error={!!errors.pass}
                helperText={errors?.pass?.message}
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

export default EditUser;
