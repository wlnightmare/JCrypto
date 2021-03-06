import { NavBar } from "./components/NavBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import News from "./pages/News";
import { styled } from "@mui/material";
import Coins from "./pages/Coins";
import { CryptoDetails } from "./components/CryptoDetails";
import TopBar from "./components/TopBar";
import { useAppSelector } from "./hooks/redux-hooks";

const StyledDiv = styled("div")`
  display: flex;
  min-height: 100vh;
  @media (max-width: 500px) {
    justify-content: center;
  }
`;

const App = () => {
  const mode = useAppSelector((state) => state.mode.darkmode);

  const className = "app " + (mode ? "dark-content" : "");
  return (
    <>
      <div className={className}>
        <TopBar />
        <StyledDiv>
          <div className="nav">
            <NavBar mode={mode} />
          </div>

          <div className="main">
            <Routes>
              <Route path="/" element={<HomePage mode={mode} />}></Route>
              <Route path="/news" element={<News mode={mode} />}></Route>
              <Route path="/crypto" element={<Coins mode={mode} />}></Route>
              <Route
                path="/crypto/:coinId"
                element={<CryptoDetails mode={mode} />}
              />
            </Routes>
          </div>
        </StyledDiv>
      </div>
    </>
  );
};

export default App;
