import { NavBar } from "./components/NavBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import News from "./pages/News";
import Exchange from "./pages/Exchange";

import { Button, styled } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import { useDispatch, useSelector } from "react-redux";

import { setDarkTheme, setDefaultTheme } from "./app/themeSlice";
import { RootState } from "./app/store";

import Coins from "./pages/Coins";
import { setOpen } from "./app/modalSlice";
import RegisterModal from "./components/Modal";

const StyledButton = styled(Button)`
  position: fixed;
  z-index: 1000;
  top: 10px;
  right: 3%;
  color: orange;
`;
const OpenModalButton = styled(Button)`
  position: fixed;
  z-index: 1000;
  top: 10px;
  right: 8%;
  @media (max-width: 700px) {
    right: 10%;
  }
`;
const StyledDiv = styled("div")`
  display: flex;
  min-height: 100vh;
  @media (max-width: 500px) {
    justify-content: center;
  }
`;

const App = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.mode.darkmode);
  const open = useSelector((state: RootState) => state.modal.open);

  const handleClick = () => {
    dispatch(setOpen());
  };

  const setDark = () => {
    dispatch(setDarkTheme());
  };

  const setDefault = () => {
    dispatch(setDefaultTheme());
  };

  const className = "app " + (mode ? "dark-content" : "");
  return (
    <>
      <div className={className}>
        <OpenModalButton onClick={handleClick}>Sign in</OpenModalButton>
        {open && <RegisterModal open={open} />}
        <StyledDiv>
          {!mode ? (
            <StyledButton onClick={setDark}>
              <Brightness3Icon />
            </StyledButton>
          ) : (
            <StyledButton onClick={setDefault}>
              <LightModeIcon />
            </StyledButton>
          )}
          <div className="nav">
            <NavBar />
          </div>

          <div className="main">
            <Routes>
              <Route path="/" element={<HomePage mode={mode} />}></Route>
              <Route path="/news" element={<News mode={mode} />}></Route>
              <Route path="/exchange" element={<Exchange />}></Route>
              <Route path="/crypto" element={<Coins mode={mode} />}></Route>
            </Routes>
          </div>
        </StyledDiv>
      </div>
    </>
  );
};

export default App;
