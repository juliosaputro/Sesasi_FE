import React from "react";
import { Typography, Avatar, Container } from "@mui/material";
import FormRegister from "../components/form/FormRegiter";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Register() {
  return (
    <Container component={"main"} maxWidth="xs">
      <div className="flex flex-col justify-center items-center mt-24">
        <Avatar
          sx={{ m: 1, bgcolor: "#0288d1", width: "60px", height: "60px" }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          fontWeight="bold"
          fontSize="36px"
        >
          Sign Up
        </Typography>
      </div>
      <FormRegister />
    </Container>
  );
}
