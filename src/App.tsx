import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavBar } from "./components/NavBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import News from "./pages/News";
import Exchange from "./pages/Exchange";
import Crypto from "./pages/Crypto";

import { Button, styled } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import { useDispatch, useSelector } from "react-redux";

import { setDarkTheme, setDefaultTheme } from "./app/themeSlice";
import { RootState } from "./app/store";

const StyledButton = styled(Button)`
  position: absolute;
  z-index: 1000;
  top: 20px;
  right: 3%;
  color: orange;
`;

const App = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.mode.darkmode);

  const setDark = () => {
    dispatch(setDarkTheme());
  };

  const setDefault = () => {
    dispatch(setDefaultTheme());
  };

  const className = "app " + (mode ? "dark-content" : "");
  return (
    <div className={className}>
      {!mode ? (
        <StyledButton onClick={setDark}>
          <Brightness3Icon />
        </StyledButton>
      ) : (
        <StyledButton onClick={setDefault}>
          <LightModeIcon />
        </StyledButton>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container style={{ minHeight: "100vh" }} spacing={3}>
          <NavBar />

          <Grid item xs={8}>
            <Routes>
              <Route path="/" element={<HomePage mode={mode} />}></Route>
              <Route path="/news" element={<News />}></Route>
              <Route path="/exchange" element={<Exchange />}></Route>
              <Route path="/crypto" element={<Crypto mode={mode} />}></Route>
            </Routes>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default App;
