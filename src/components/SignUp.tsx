import { createUserWithEmailAndPassword, auth } from "../firebase";
import { setUser } from "../app/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { FC } from "react";
import { FormControl, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { getFormFieldState } from "../util/getFormFieldState";
import { validateEmail, validatePassword } from "../util/validateFormInputs";
import { AuthProp, FormValues } from "../types";
import {
  CustomBox,
  StyledButton,
  StyledLine,
  StyledSubmitButton,
} from "../constants/formStyle";

export const SignUp: FC<AuthProp> = ({ handleClose, handleChangeForm }) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.mode.darkmode);
  const { handleSubmit, reset, control } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRegister = async ({ email, password }: FormValues) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        handleClose();
        reset();
      })
      .catch(() => alert("Invalid user!"));
  };

  return (
    <CustomBox>
      <Typography variant="h5">Complete Sign Up Form</Typography>
      <form
        style={{ marginTop: "10px" }}
        onSubmit={handleSubmit(handleRegister)}
      >
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
                id="signUp email"
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
                  return "At least one upper case, lower case, digit must be and min 8";
                }
              },
            }}
            render={({ field, formState, fieldState }) => (
              <TextField
                id="signUp password"
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
          Sign Up
        </StyledSubmitButton>
      </form>
      <StyledLine>
        Already have an account?
        <StyledButton onClick={handleChangeForm}>Login</StyledButton>
      </StyledLine>
    </CustomBox>
  );
};
