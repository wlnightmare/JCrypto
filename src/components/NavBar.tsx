import { MenuList, MenuItem, Grid, styled } from "@mui/material";
import { link } from "fs";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
type Props = {};


const StyledHeader = styled("p")`
  color: white;
  text-align: center;
  font-weight: bold;
`;
const StyledGrid = styled(Grid)`
  background-color: #ef5630;
  width:100%;
  @media (max-width: 1086px){
    color:red;
  }
`;
const StyledMenuItem = styled(MenuItem)`
&:hover {
 border:1px solid white;
 background-color:transparent;
},


`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
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
  return (
    <>
      <StyledGrid item xs={2}>
        <StyledHeader>JCrypto</StyledHeader>
        <MenuList>
          {navBarLinks.map((list) => (
            <StyledMenuItem
              key={list.name}
              style={{ marginBottom: "15px", display: "flex", gap: "10px" }}
            >
              <img alt="icon" src={list.src}></img>
              <StyledLink to={list.path}>{list.name}</StyledLink>
            </StyledMenuItem>
          ))}
        </MenuList>
      </StyledGrid>
    </>
  );
};
