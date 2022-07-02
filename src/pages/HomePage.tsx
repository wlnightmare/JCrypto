import styled from "@emotion/styled";
import { Button, CircularProgress, Divider, Grid } from "@mui/material";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/api";
import News from "./News";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Coins from "./Coins";
import { ModeType } from "../types";
import { COLORS } from "../constants/color";
import { backgroundUrl, titles } from "../constants/mockData";

type Props = {
  mode: boolean;
};

const Header = styled("h2")<ModeType>`
  margin: 15px auto;
  color: ${(props) =>
    props.mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`};
`;
const StyledTitle = styled("p")<ModeType>`
  font-size: 18px;
  font-weight: bold;
  @media (max-width: 800px) {
    display: none;
  }
  color: ${(props) =>
    props.mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`};
`;

const StyledDivider = styled(Divider)<ModeType>`
  border: ${(props) =>
    props.mode
      ? `1px solid ${COLORS.DETAILS}`
      : `1px solid ${COLORS.SECONDARY}`};
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

const BackgroundContainer = styled("div")`
  padding: 5px 16px;
  width: 100%;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
const StyledGridItem = styled(Grid)<ModeType>`
  color: white;
  color: ${(props) =>
    props.mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`};
  @media (max-width: 800px) {
    text-align: center;
  }
`;
const StyledHeader = styled("h1")<ModeType>`
  color: white;
  color: ${(props) =>
    props.mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`};
  font-family: "Poppins", sans-serif;

  margin: 15px 0;
  @media (max-width: 800px) {
    text-align: center;
    margin: 0;
  }
`;

export const HomePage = (props: Props) => {
  const { data } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (!globalStats) return <CircularProgress />;

  return (
    <>
      <BackgroundContainer>
        <StyledHeader mode={props.mode}>Global Crypto Stats</StyledHeader>

        <Grid
          container
          spacing={{ xs: 1, md: 4 }}
          columns={{ xs: 2, sm: 3, md: 14 }}
        >
          {titles.map((title) => (
            <StyledGridItem mode={props.mode} item xs={5}>
              <h3>{title.header}</h3>
              <p>{millify(+globalStats[title.key])}</p>
            </StyledGridItem>
          ))}
        </Grid>
      </BackgroundContainer>
      <StyledDivider mode={props.mode} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header mode={props.mode}>Top 10 Cryptocurrencies in the world</Header>
        <StyledLink to="/crypto">
          <StyledTitle mode={props.mode}>Show more</StyledTitle>
          <ShowIcon mode={props.mode}> ↓</ShowIcon>
        </StyledLink>
      </div>
      <Coins simplified />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header mode={props.mode}>Latest Crypto News</Header>

        <StyledLink to="/news">
          <StyledTitle mode={props.mode}>Show more</StyledTitle>
          <ShowIcon mode={props.mode}> ↓</ShowIcon>
        </StyledLink>
      </div>
      <News mode={props.mode} simplified />
    </>
  );
};
