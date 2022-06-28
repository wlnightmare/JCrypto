import { ThemeContext } from "@emotion/react";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  styled,
} from "@mui/material";
import millify from "millify";
import React, { FC, useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useGetCryptosQuery } from "../services/api";
import { Currency } from "../types";
type Props = {
  simplified?: boolean;
};

const CryptoImg = styled("img")`
  width: 35px;
  object-fit: contain;
`;
const StyledCard = styled(Card)`
  &:hover {
    transform: translateY(0) scale(1.1);
    transition: 0.2s;
  }
`;

const Crypto: FC<Props> = ({ simplified }) => {
  const themeContext = useContext(ThemeContext);
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin: Currency) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <CircularProgress />;
  return (
    <>
      {!simplified && <SearchBar setSearchTerm={setSearchTerm} />}

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {cryptos?.map((currency: Currency) => (
            <Grid item xs={2} sm={4} md={4} key={currency.uuid}>
              <StyledCard style={{ padding: "16px" }}>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>{currency.name}</h3>
                  <CryptoImg src={currency.iconUrl} alt="icon" />
                </Box>
                <Divider />
                <p>Price: {millify(+currency.price)}</p>
                <p>Market Cap: {millify(parseInt(currency.marketCap))}</p>{" "}
                <p>Daily Change: {millify(parseInt(currency.change))}</p>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Crypto;
