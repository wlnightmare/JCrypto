import { MenuList, MenuItem, styled, Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import "../App.css";
type Props = {};

const StyledHeader = styled(Typography)`
  color: white;
  text-align: center;
  font-weight: bold;
  margin-top: 15px;
  @media (max-width: 800px) {
    display: none;
  }
`;
const StyledDiv = styled("div")`
  position: fixed;
  left: 0;
  height: 100vh;
  background-color: #ef5630;
  width: 15%;
  @media (max-width: 800px) {
    height: 8vh;
    position: fixed;
    width: 100%;
    z-index: 100;
  }
`;
const StyledMenuItem = styled(MenuItem)`
  flex: 1 0 auto;
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
  color: white;
  text-transform: none;
  font-family: "Inter", sans-serif;
`;
const StyledMenuList = styled(MenuList)`
  position: absolute;
  @media (max-width: 800px) {
    background-color: #ef5630;
    margin-top: 52px;
  }
`;

const MenuButton = styled(Button)`
  display: none !important;
  position: absolute !important;

  top: 15px !important;
  font-size: 1.2rem !important;
  background-color: var(--bgSecondary) !important;
  border: none !important;
  @media (max-width: 800px) {
    display: block !important;
  }
`;

const navBarLinks = [
  {
    path: "/",
    src: require("../icons/home1.svg").default,
    name: "Home",
  },
  {
    path: "/news",
    src: require("../icons/news.svg").default,
    name: "News",
  },
  {
    path: "/exchange",
    src: require("../icons/exhange.svg").default,
    name: "Exchange",
  },
  {
    path: "/crypto",
    src: require("../icons/crypto.svg").default,
    name: "Cryptocoins",
  },
];

export const NavBar: FC<Props> = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(0);

  const navigate = useNavigate();
  const handleClick = (path: string) => {
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
      <StyledDiv>
        <StyledHeader>JCrypto</StyledHeader>
        <MenuButton onClick={() => setActiveMenu(!activeMenu)}>
          <MenuIcon style={{ color: "grey" }} />
        </MenuButton>
        {activeMenu && (
          <StyledMenuList>
            {navBarLinks.map((list) => (
              <StyledMenuItem
                onClick={() => handleClick(list.path)}
                key={list.name}
                style={{ marginBottom: "15px" }}
              >
                <img alt="icon" src={list.src}></img>
                <StyledButton>{list.name}</StyledButton>
              </StyledMenuItem>
            ))}
          </StyledMenuList>
        )}
      </StyledDiv>
    </>
  );
};
