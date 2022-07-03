import Brightness3Icon from "@mui/icons-material/Brightness3";
import { useLocation } from "react-router-dom";
import { setOpen } from "../app/modalSlice";
import { setDarkTheme, setDefaultTheme } from "../app/themeSlice";
import { setCurrency } from "../app/symbolSlice";
import { Button, styled } from "@mui/material";
import { ModeType } from "../types";
import { COLORS } from "../constants/color";
import { AuthModal } from "./AuthModal";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { removeUser, setUser } from "../app/userSlice";
import { auth, onAuthStateChanged } from "../firebase";
import { ChangeEvent, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const StyledButton = styled(Button)`
  position: absolute;
  z-index: 1000;
  top: 10px;
  right: 5%;
  margin-right: -16px;

  color: orange;
`;
const StyledSelect = styled("select")<ModeType>`
  position: absolute;
  font-family: "Poppins", sans-serif;

  border: 0;
  color: ${(props) => (props.mode ? "black" : `white`)};

  background-color: ${(props) =>
    props.mode ? `${COLORS.HEADER}` : `${COLORS.LIGHT}`};
  z-index: 1000;
  border-radius: 4px;
  top: 8px;
  right: 13%;
  width: 80px;
  height: 36px;
`;
const OpenModalButton = styled(Button)<ModeType>`
  position: absolute;
  background-color: ${(props) =>
    props.mode ? `${COLORS.HEADER}` : `${COLORS.LIGHT}`};
  border: ${(props) =>
    props.mode ? `${COLORS.HEADER}` : `${COLORS.SECONDARY}`};
  color: ${(props) => (props.mode ? "black" : `white`)};
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  z-index: 1000;
  top: 9px;
  right: 8%;
`;

const TopBar = () => {
  const pathname = useLocation().pathname;
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const mode = useAppSelector((state) => state.mode.darkmode);
  const open = useAppSelector((state) => state.modal.open);
  const currency = useAppSelector((state) => state.currency.currency);
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          setUser({
            email: userAuth.email,
            id: userAuth.uid,
            token: userAuth.refreshToken,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });
    return () => unSubcribe();
  }, [dispatch]);
  const handleClick = () => {
    dispatch(setOpen());
  };

  const setDark = () => {
    dispatch(setDarkTheme());
  };

  const setDefault = () => {
    dispatch(setDefaultTheme());
  };
  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(removeUser());
      })
      .catch((err) => alert(err.message));
  };
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (typeof event.target.value === "string") {
      dispatch(setCurrency(event.target.value));
    }
  };

  return (
    <>
      {pathname !== "/news" ? (
        <StyledSelect onChange={handleChange} value={currency} mode={mode}>
          <option value={"USD"}>USD</option>
          <option value={"KZT"}>KZT</option>
        </StyledSelect>
      ) : null}

      {isAuth ? (
        <OpenModalButton mode={mode} onClick={handleLogOut}>
          Logout
        </OpenModalButton>
      ) : (
        <OpenModalButton mode={mode} onClick={handleClick}>
          <div>Login {open && <AuthModal open={open} />}</div>
        </OpenModalButton>
      )}

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
