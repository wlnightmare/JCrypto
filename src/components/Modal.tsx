import { Modal } from "@mui/material";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setClose } from "../app/modalSlice";

type Props = {
  open: boolean;
};
const RegisterModal: FC<Props> = ({ open }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setClose());
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>dddd</div>
    </Modal>
  );
};

export default RegisterModal;
