import { MenuList, MenuItem, styled, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import "../App.css";
type Props = {};

const StyledHeader = styled("p")`
  color: white;
  text-align: center;
  font-weight: bold;
  margin-top: 15px;
`;
const StyledGrid = styled("div")`
  background-color: #ef5630;
  width: 15%;

  float: left;
`;
const StyledMenuItem = styled(MenuItem)`
  &:hover {
    border: 1px solid white;
    background-color: transparent;
  }
`;
const StyledButton = styled(Button)`
  text-decoration: none;
  color: white;
  text-transform: none;
  @media (max-width: 960px) {
    display: none;
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

export const NavBar = ({}: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <StyledGrid>
        <StyledHeader>JCrypto</StyledHeader>
        <MenuList>
          {navBarLinks.map((list) => (
            <StyledMenuItem key={list.name} style={{ marginBottom: "15px" }}>
              <img alt="icon" src={list.src}></img>
              <StyledButton onClick={() => navigate(list.path)}>
                {list.name}
              </StyledButton>
            </StyledMenuItem>
          ))}
        </MenuList>
      </StyledGrid>
    </>
  );
};
