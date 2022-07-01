import { FormValues } from "../components/Form";
import { ControllerFieldState, UseFormStateReturn } from "react-hook-form";

export function getFormFieldState(
  formState: UseFormStateReturn<FormValues>,
  fieldState: ControllerFieldState
) {
  return {
    error: formState.isSubmitted && !!fieldState.error,
    helperText: formState.isSubmitted && fieldState.error?.message,
  };
}
