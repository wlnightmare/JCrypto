import { MenuList, MenuItem, styled, Button, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { ModeType } from "../types";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { COLORS } from "../constants/color";

const StyledHeader = styled(Typography)<ModeType>`
  color: ${COLORS.WHITE};
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-top: 15px;
  @media (max-width: 800px) {
    display: none;
  }
`;
const StyledDiv = styled("div")<ModeType>`
  position: fixed;
  left: 0;
  height: 100vh;
  background-color: ${(props) =>
    props.mode ? `${COLORS.DETAILS}` : `${COLORS.LIGHT}`};
  width: 15%;
  @media (max-width: 1000px) {
    width: 22%;
  }

  @media (max-width: 800px) {
    background-color: transparent;
    height: 8vh;
    position: fixed;
    width: 100%;
    z-index: 100;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  width: 180px;
  &:hover {
    border: 1px solid white;
    background-color: transparent;
  }
  &:focus {
    border: 1px solid white;
    background-color: transparent;
  }
`;
const StyledButton = styled(Button)`
  text-decoration: none;
  font-size: 18px;
  color: white;
  text-transform: none;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 800px) {
    color: white;
  }
`;
const StyledMenuList = styled(MenuList)<ModeType>`
  position: absolute;
  @media (max-width: 800px) {
    background-color: ${(props) =>
      props.mode ? `${COLORS.DETAILS}` : `${COLORS.LIGHT}`};
    margin-top: 52px;
  }
`;

const MenuButton = styled(Button)`
  display: none !important;
  position: absolute !important;

  top: 15px !important;
  font-size: 1.2rem !important;
  border: none !important;
  @media (max-width: 800px) {
    display: block !important;
  }
`;

const navBarLinks = [
  {
    path: "/",
    icon: <HomeIcon style={{ color: "white" }} />,
    name: "Home",
  },
  {
    path: "/news",
    icon: <NewspaperIcon style={{ color: "white" }} />,
    name: "News",
  },

  {
    path: "/crypto",
    icon: <CurrencyBitcoinIcon style={{ color: "white" }} />,
    name: "Cryptocoins",
  },
];

export const NavBar: FC<ModeType> = ({ mode }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(0);
  const [isClicked, setClicked] = useState(true);

  const navigate = useNavigate();

  const handleClick = (path: string) => {
    setClicked(true);
    navigate(path);
  };
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <>
      <StyledDiv mode={mode}>
        <StyledHeader mode={mode} onClick={() => navigate("/")}>
          JCrypto
        </StyledHeader>
        <MenuButton onClick={() => setActiveMenu(!activeMenu)}>
          <MenuIcon style={{ color: mode ? "white" : `${COLORS.LIGHT}` }} />
        </MenuButton>
        {activeMenu && (
          <StyledMenuList mode={mode}>
            {navBarLinks.map((list) => (
              <StyledMenuItem
                onClick={() => {
                  handleClick(list.path);
                  setActiveMenu(false);
                }}
                key={list.name}
                style={{ marginBottom: "15px" }}
              >
                {list.icon}
                <StyledButton>{list.name}</StyledButton>
              </StyledMenuItem>
            ))}
          </StyledMenuList>
        )}
      </StyledDiv>
    </>
  );
};
