import styled from "@emotion/styled";
import { Button, CircularProgress, Divider, Grid } from "@mui/material";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/api";
import News from "./News";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Coins from "./Coins";
import { ModeType } from "../types";

type Props = {
  mode: boolean;
};

const Header = styled("h2")`
  margin: 15px 0;
  @media (max-width: 800px) {
    text-align: center;
  }
`;
const StyledTitle = styled("p")`
  font-size: 18px;
  font-weight: bold;
`;

const StyledDivider = styled(Divider)`
  display: block;
  margin-top: 15px;
`;
const ShowIcon = styled(KeyboardArrowDownIcon)`
  display: none;
  @media (max-width: 700px) {
    display: block;
    float: right;
  }
`;
const StyledLink = styled(Link)<ModeType>`
  text-decoration: none;
  color: ${(props) => (!props.mode ? "white" : "black")};
  @media (max-width: 700px) {
    display: none;
  }
`;
const StyledGridItem = styled(Grid)`
  @media (max-width: 800px) {
    text-align: center;
  }
`;
const StyledHeader = styled("h1")`
  margin: 15px 0;
  @media (max-width: 800px) {
    text-align: center;
    margin: 0;
  }
`;
export const HomePage = (props: Props) => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) return <CircularProgress color="secondary" size="50" />;
  return (
    <>
      <StyledHeader>Global Crypto Stats</StyledHeader>

      <Grid
        container
        spacing={{ xs: 1, md: 4 }}
        columns={{ xs: 2, sm: 3, md: 14 }}
      >
        <StyledGridItem item xs={5}>
          <h3>Total Cryptocurrencies</h3>
          <p>{millify(globalStats.total)}</p>
        </StyledGridItem>
        <StyledGridItem item xs={5}>
          <h3>Total Exchanges</h3>
          <p>{millify(globalStats.totalExchanges)}</p>
        </StyledGridItem>
        <StyledGridItem item xs={5}>
          <h3>Total Market Cap</h3>
          <p>{`$${millify(globalStats.totalMarketCap)}`}</p>
        </StyledGridItem>
        <StyledGridItem item xs={5}>
          <h3>Total 24h Volume </h3>
          <p>{`$${millify(globalStats.total24hVolume)}`}</p>
        </StyledGridItem>
        <StyledGridItem item xs={5}>
          <h3>Total Markets</h3>
          <p>{millify(globalStats.totalMarkets)}</p>
        </StyledGridItem>
      </Grid>
      <StyledDivider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header>Top 10 Cryptocurrencies in the world</Header>
        <StyledTitle style={{ marginTop: 10 }}>
          <ShowIcon></ShowIcon>
          <StyledLink mode to="/crypto">
            Show more
          </StyledLink>
        </StyledTitle>
      </div>
      <Coins simplified />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header>Latest Crypto News</Header>
        <StyledTitle style={{ marginTop: 10 }}>
          <ShowIcon></ShowIcon>
          <StyledLink mode to="/crypto">
            Show more
          </StyledLink>
        </StyledTitle>
      </div>
      <News mode={props.mode} simplified />
    </>
  );
};
