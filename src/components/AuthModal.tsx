import { Modal } from "@mui/material";
import { FC, useState } from "react";
import { setClose } from "../app/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { ModalOpenClose } from "../types";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

const AuthModal: FC<ModalOpenClose> = ({ open }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(false);
  const handleClose = () => {
    dispatch(setClose());
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        justifyContent: "column",
        alignItems: "center",
      }}
    >
      <>
        {value ? (
          <SignUp handleClose={handleClose} />
        ) : (
          <SignIn handleClose={handleClose} />
        )}
      </>
    </Modal>
  );
};

export { AuthModal };
