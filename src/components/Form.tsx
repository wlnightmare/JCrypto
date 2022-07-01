import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { getFormFieldState } from "../util/getFormFieldState";
import { validateEmail, validatePassword } from "../util/validateFormInputs";

type FormProps = {
  title: string;
  handleClick: (email: string, password: string) => void;
};
export type FormValues = {
  email: string;
  password: string;
};

export const Form: FC<FormProps> = ({ title, handleClick }) => {
  const { handleSubmit, reset, control } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onSubmit = useCallback(
    ({ email, password }: FormValues) => {
      handleClick(email, password);
    },
    [handleClick]
  );

  return (
    <Box sx={modalStyle}>
      <Typography variant="h5">Complete Form</Typography>
      <form style={{ marginTop: "10px" }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 2 }} required>
          <Controller
            name="email"
            control={control}
            rules={{
              required: false,
              validate: (value: string) => {
                if (validateEmail(value)) {
                  return true;
                } else {
                  return "Incorrect email type";
                }
              },
            }}
            render={({ field, fieldState, formState }) => (
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                {...getFormFieldState(formState, fieldState)}
                {...field}
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }} required>
          <Controller
            name="password"
            control={control}
            rules={{
              required: false,
              validate: (value: string) => {
                if (validatePassword(value)) {
                  return true;
                } else {
                  return "Minimal 8 charaters";
                }
              },
            }}
            render={({ field, formState, fieldState }) => (
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                {...getFormFieldState(formState, fieldState)}
                {...field}
              />
            )}
          />
        </FormControl>
        <Button variant="contained" type="submit" onClick={() => reset()}>
          {title}
        </Button>
      </form>
    </Box>
  );
};
