import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const InputText = ({
  label = "",
  name = "",
  control,
  multiline = false,
  error,
  helperText,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          sx={{ marginBlock: 2 }}
          label={label}
          placeholder={label}
          id={name}
          variant="outlined"
          fullWidth
          required
          multiline={multiline}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default InputText;
