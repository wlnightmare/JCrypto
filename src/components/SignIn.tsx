import { auth, signInWithEmailAndPassword } from "../firebase";
import { setUser } from "../app/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { FC } from "react";
import { AuthProp, FormValues } from "../types";
import {
  Box,
  Button,
  FormControl,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { getFormFieldState } from "../util/getFormFieldState";
import { validateEmail, validatePassword } from "../util/validateFormInputs";
import {
  StyledLine,
  CustomBox,
  StyledSubmitButton,
  StyledButton,
} from "../constants/formStyle";

export const SignIn: FC<AuthProp> = ({ handleClose, handleChangeForm }) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.mode.darkmode);
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
        handleClose();
      })
      .catch(() => alert("Invalid user!"));
  };

  return (
    <CustomBox>
      <Typography variant="h5" textAlign="center">
        Complete Sign In Form
      </Typography>
      <form style={{ marginTop: "10px" }} onSubmit={handleSubmit(handleLogin)}>
        <FormControl fullWidth sx={{ mb: 2 }} required>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
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
                id="signIn email"
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
              required: true,
              validate: (value: string) => {
                if (validatePassword(value)) {
                  return true;
                } else {
                  return "Incorrect password";
                }
              },
            }}
            render={({ field, formState, fieldState }) => (
              <TextField
                id="signIn password"
                label="password"
                variant="outlined"
                type="password"
                {...getFormFieldState(formState, fieldState)}
                {...field}
              />
            )}
          />
        </FormControl>
        <StyledSubmitButton mode={mode} variant="contained" type="submit">
          Sign In
        </StyledSubmitButton>
      </form>
      <StyledLine>
        Don't have an account?
        <StyledButton onClick={handleChangeForm}>Register</StyledButton>
      </StyledLine>
    </CustomBox>
  );
};
