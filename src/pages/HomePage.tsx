import styled from "@emotion/styled";
import { CircularProgress, Divider, Grid } from "@mui/material";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/api";
import News from "./News";

import Coins from "./Coins";
import { ModeType } from "../types";
import { COLORS } from "../constants/color";
import { titles } from "../constants/mockData";
import { FC } from "react";

const Header = styled("h2")<ModeType>`
  margin: 15px auto;
  color: ${(props) =>
    props.mode ? `${COLORS.HEADER}` : `${COLORS.SECONDARY}`};
`;
const StyledTitle = styled("p")<ModeType>`
  font-size: 18px;
  font-weight: 500;
  margin: 13px;
  @media (max-width: 800px) {
    display: none;
  }
  color: ${(props) => (props.mode ? `${COLORS.DETAILS}` : `grey `)};
`;

const StyledDivider = styled(Divider)<ModeType>`
  border: ${(props) =>
    props.mode ? `1px solid ${COLORS.DETAILS}` : `1px solid ${COLORS.TITLE}`};
  display: block;
  margin-top: 15px;
`;

const ShowIcon = styled("p")<ModeType>`
  display: none;
  font-size: 24px;
  color: ${(props) =>
    props.mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`};
  @media (max-width: 800px) {
    display: block;
    float: right;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const StyledGridItem = styled(Grid)<ModeType>`
  color: white;
  color: ${(props) => (props.mode ? "white" : `${COLORS.DETAILS}`)};
  @media (max-width: 800px) {
    text-align: center;
  }
`;
const StyledHeader = styled("h1")<ModeType>`
  color: white;
  color: ${(props) =>
    props.mode ? `${COLORS.HEADER}` : `${COLORS.SECONDARY}`};
  font-family: "Poppins", sans-serif;

  margin: 15px 0;
  @media (max-width: 800px) {
    text-align: center;
    margin: 0;
  }
`;

export const HomePage: FC<ModeType> = ({ mode }) => {
  const { data } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (!globalStats) return <CircularProgress />;

  return (
    <>
      <StyledHeader mode={mode}>Global Crypto Stats</StyledHeader>

      <Grid
        container
        spacing={{ xs: 1, md: 4 }}
        columns={{ xs: 2, sm: 3, md: 14 }}
      >
        {titles.map((title) => (
          <StyledGridItem mode={mode} item xs={5}>
            <h3>{title.header}</h3>
            <p>{millify(+globalStats[title.key])}</p>
          </StyledGridItem>
        ))}
      </Grid>
      <StyledDivider mode={mode} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header mode={mode}>Top 10 Cryptocurrencies in the world</Header>
        <StyledLink to="/crypto">
          <StyledTitle mode={mode}>Show more</StyledTitle>
          <ShowIcon mode={mode}> ↓</ShowIcon>
        </StyledLink>
      </div>
      <Coins mode={mode} simplified />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header mode={mode}>Latest Crypto News</Header>
        <StyledLink to="/news">
          <StyledTitle mode={mode}>Show more</StyledTitle>
          <ShowIcon mode={mode}> ↓</ShowIcon>
        </StyledLink>
      </div>
      <News mode={mode} simplified />
    </>
  );
};
