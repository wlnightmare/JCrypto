import { Modal } from "@mui/material";
import { FC, useState } from "react";
import { setClose } from "../app/modalSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { ModalOpenClose } from "../types";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { StyledBox } from "../constants/formStyle";

const AuthModal: FC<ModalOpenClose> = ({ open }) => {
  const dispatch = useAppDispatch();

  const [isSigned, setIsSigned] = useState(true);
  const handleClose = () => {
    dispatch(setClose());
  };
  const handleChangeForm = () => {
    setIsSigned(!isSigned);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title "
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        justifyContent: "column",
        alignItems: "center",
      }}
    >
      <StyledBox>
        {isSigned ? (
          <SignIn
            handleClose={handleClose}
            handleChangeForm={handleChangeForm}
          />
        ) : (
          <SignUp
            handleClose={handleClose}
            handleChangeForm={handleChangeForm}
          />
        )}
      </StyledBox>
    </Modal>
  );
};

export { AuthModal };
