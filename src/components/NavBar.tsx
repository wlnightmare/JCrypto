import {
  MenuList,
  MenuItem,
  styled,
  Button,
  Typography,
  Icon,
} from "@mui/material";
import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import "../App.css";
import { CurrencyExchange } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import NewspaperIcon from "@mui/icons-material/Newspaper";

type Props = {};

const StyledHeader = styled(Typography)`
  color: #ef5630;
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
  background-color: white;
  width: 15%;
  @media (max-width: 1000px) {
    width: 20%;
  }
  @media (max-width: 800px) {
    height: 8vh;
    position: fixed;
    width: 100%;
    z-index: 100;
    background-color: #ef5630;
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
  font-size: 18px;
  color: #ef5630;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 800px) {
    color: white;
  }

  text-transform: none;
  font-family: "Montserrat Alternates", sans-serif;
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
  border: none !important;
  @media (max-width: 800px) {
    display: block !important;
  }
`;

const navBarLinks = [
  {
    path: "/",
    icon: <HomeIcon style={{ color: "#ef5630" }} />,
    name: "Home",
  },
  {
    path: "/news",
    icon: <NewspaperIcon style={{ color: "#ef5630" }} />,
    name: "News",
  },
  {
    path: "/exchange",
    icon: <CurrencyExchange style={{ color: "#ef5630" }} />,
    name: "Exchange",
  },
  {
    path: "/crypto",
    icon: <CurrencyBitcoinIcon style={{ color: "#ef5630" }} />,
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
