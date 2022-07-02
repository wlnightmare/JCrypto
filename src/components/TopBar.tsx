import React from "react";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../app/modalSlice";
import { setDarkTheme, setDefaultTheme } from "../app/themeSlice";
import { setCurrency } from "../app/symbolSlice";
import { Button, Container, NativeSelect, styled } from "@mui/material";
import { ModeType } from "../types";
import { COLORS } from "../constants/color";
import { RootState } from "../app/store";
import RegisterModal from "./Modal";
import LightModeIcon from "@mui/icons-material/LightMode";

const StyledButton = styled(Button)`
  position: fixed;
  z-index: 1000;
  top: 10px;
  right: 3%;
  color: orange;
`;
const StyledSelect = styled(NativeSelect)<ModeType>`
  position: fixed;
  color: ${(props) =>
    props.mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`};
  background-color: transparent;
  z-index: 1000;

  top: 15px;
  right: 13%;
  width: 100px;
  height: 30px;

  @media (max-width: 800px) {
    right: 15%;
  }
  @media (max-width: 700px) {
    right: 18%;
  }
  @media (max-width: 600px) {
    right: 21%;
  }
`;
const OpenModalButton = styled(Button)<ModeType>`
  position: fixed;
  border: ${(props) =>
    props.mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`};
  color: ${(props) =>
    props.mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`};
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  z-index: 1000;
  top: 9px;
  right: 8%;
  @media (max-width: 700px) {
    right: 10%;
    color: ${COLORS.SECONDARY};
  }
`;

const TopBar = () => {
  const pathname = useLocation().pathname;

  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.mode.darkmode);
  const open = useSelector((state: RootState) => state.modal.open);
  const currency = useSelector((state: RootState) => state.currency.currency);

  const handleClick = () => {
    dispatch(setOpen());
  };

  const setDark = () => {
    dispatch(setDarkTheme());
  };

  const setDefault = () => {
    dispatch(setDefaultTheme());
  };
  const handleChange = (event: any) => {
    if (typeof event.target.value === "string") {
      dispatch(setCurrency(event.target.value));
    }
  };
  return (
    <>
      {pathname !== "/news" ? (
        <StyledSelect
          onChange={(e) => handleChange(e)}
          value={currency}
          mode={mode}
        >
          <option value={"USD"}>USD</option>
          <option value={"KZT"}>KZT</option>
        </StyledSelect>
      ) : null}

      <OpenModalButton mode={mode} onClick={handleClick}>
        Sign in
      </OpenModalButton>
      {open && <RegisterModal open={open} />}
      {!mode ? (
        <StyledButton onClick={setDark}>
          <Brightness3Icon />
        </StyledButton>
      ) : (
        <StyledButton onClick={setDefault}>
          <LightModeIcon />
        </StyledButton>
      )}
    </>
  );
};

export default TopBar;
