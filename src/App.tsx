import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavBar } from "./components/NavBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import News from "./pages/News";
import Exchange from "./pages/Exchange";
import Crypto from "./pages/Crypto";
import { ThemeContext, themes } from "./context";
import { useState } from "react";
import { Button, styled } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness3Icon from "@mui/icons-material/Brightness3";

const StyledButton = styled(Button)`
  position: absolute;
  z-index: 1000;
  top: 20px;
  right: 3%;
  color: orange;
`;
const App = () => {
  const [theme, setTheme] = useState(themes.dark);
  const [darkMode, setDarkMode] = useState(true);

  const changeTheme = (theme: string) => {
    setTheme(theme);
  };

  const className = "app " + (theme ? "white-content" : "");

  console.log(theme);
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className={className}>
        <ThemeContext.Consumer>
          {({ changeTheme }) => (
            <StyledButton
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            >
              {darkMode ? <Brightness3Icon /> : <LightModeIcon />}
            </StyledButton>
          )}
        </ThemeContext.Consumer>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container style={{ minHeight: "100vh" }} spacing={3}>
            <NavBar />

            <Grid item xs={8}>
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/news" element={<News />}></Route>
                <Route path="/exchange" element={<Exchange />}></Route>
                <Route path="/crypto" element={<Crypto />}></Route>
              </Routes>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
