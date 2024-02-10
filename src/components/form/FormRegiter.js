import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import InputText from "../InputText";
import InputPassword from "../InputPassword";
import { Box, Button, Typography } from "@mui/material";
import { useLogin } from "../../helper/request";
import { updateToken, updateUser } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../../components/dialog/errordialog";

const defaultValues = {
  name: "",
  user: "",
  pass: "",
  submit: null,
};

const schema = yup.object().shape({
  name: yup.string().required("This column must be filled in."),
  user: yup.string().required("This column must be filled in."),
  pass: yup
    .string()
    .required("This column must be filled in and")
    .min(6, " Minimal 6 character."),
});

export default function FormRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msgResponse, setMsgResponse] = useState("");
  const [errorDelete, setErrorDelete] = useState(false);
  const { control, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const form = watch();

  const [func_register_user, res_register_user] = useLogin("register");

  function onSubmit(data) {
    func_register_user(data);
  }

  useEffect(() => {
    if (res_register_user.success) {
      dispatch(updateUser(res_register_user.success_res.user));
      dispatch(updateToken(res_register_user.success_res.access_token));
      navigate("/sign-in");
    }
  }, [res_register_user.success]);

  useEffect(() => {
    if (res_register_user.failed) {
      setMsgResponse(
        res_register_user.error_res?.data?.message || "Sign In Failed!"
      );
      setErrorDelete(true);
    }
  }, [res_register_user.failed]);

  if (_.isEmpty(form)) {
    return null;
  }
  return (
    <div className="flex flex-col justify-center items-center ">
      <form className="flex flex-col justify-center w-full mt-12">
        <InputText
          control={control}
          label="Name"
          name="name"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <InputText
          control={control}
          label="Username"
          name="user"
          error={!!errors.user}
          helperText={errors?.user?.message}
        />
        <InputPassword
          control={control}
          label="Password"
          name="pass"
          error={!!errors.pass}
          helperText={errors?.pass?.message}
        />
        <Box sx={{ my: 2 }}>
          <Button
            variant="contained"
            color="info"
            className=" w-full mt-16"
            aria-label="Sign in"
            type="submit"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </Button>
        </Box>
        <div className="flex flex-auto flex-row gap-2 justify-end mt-3">
          <Typography className="">Don't have an account?</Typography>
          <Typography
            component={"a"}
            href="/sign-in"
            color={"#0288D1"}
            sx={{ textDecoration: "underline" }}
          >
            Sign In
          </Typography>
        </div>
      </form>
      <ErrorDialog
        dialog={errorDelete}
        closedialog={() => setErrorDelete(false)}
        message={msgResponse}
      />
    </div>
  );
}
