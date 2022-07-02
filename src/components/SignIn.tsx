import { auth, signInWithEmailAndPassword } from "../firebase";
import { setUser } from "../app/userSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { FC } from "react";
import { AuthProp, FormValues } from "../types";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { getFormFieldState } from "../util/getFormFieldState";
import { validateEmail, validatePassword } from "../util/validateFormInputs";
import { modalStyle } from "../constants/formStyle";

export const SignIn: FC<AuthProp> = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, reset, control } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = async ({ email, password }: FormValues) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        reset();
      })
      .catch(() => alert("Invalid user!"));
  };

  return (
    <Box sx={modalStyle}>
      <Typography variant="h5">Complete Form</Typography>
      <form style={{ marginTop: "10px" }} onSubmit={handleSubmit(handleLogin)}>
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
        <Button variant="contained" type="submit" onClick={handleClose}>
          Sign In
        </Button>
      </form>
      <p>
        Don't have an account? <Button>Register</Button>
      </p>
    </Box>
  );
};
