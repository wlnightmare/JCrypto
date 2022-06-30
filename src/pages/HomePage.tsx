import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/api";
import Crypto from "./Crypto";
import News from "./News";
type Props = {
  mode: boolean;
};

const Header = styled("h2")`
  margin: 15px 0;
`;

export const HomePage = (props: Props) => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) return <CircularProgress color="secondary" size="50" />;
  return (
    <>
      <h1 style={{ margin: "15px 0" }}> Global Crypto Stats</h1>
      <Grid
        container
        spacing={{ xs: 1, md: 4 }}
        columns={{ xs: 2, sm: 3, md: 14 }}
      >
        <Grid item xs={5}>
          <h3>Total Cryptocurrencies</h3>
          <p>{millify(globalStats.total)}</p>
        </Grid>
        <Grid item xs={5}>
          <h3>Total Exchanges</h3>
          <p>{millify(globalStats.totalExchanges)}</p>
        </Grid>
        <Grid item xs={5}>
          <h3>Total Market Cap</h3>
          <p>{`$${millify(globalStats.totalMarketCap)}`}</p>
        </Grid>
        <Grid item xs={5}>
          <h3>Total 24h Volume </h3>
          <p>{`$${millify(globalStats.total24hVolume)}`}</p>
        </Grid>
        <Grid item xs={5}>
          <h3>Total Markets</h3>
          <p>{millify(globalStats.totalMarkets)}</p>
        </Grid>
      </Grid>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header>Top 10 Cryptocurrencies in the world</Header>
        <h3>
          <Link to="/crypto">Show more</Link>
        </h3>
      </div>
      <Crypto mode={props.mode} simplified />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header>Latest Crypto News</Header>
        <h3>
          <Link to="/news">Show more</Link>
        </h3>
      </div>
      <News simplified />
    </>
  );
};
