import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import millify from "millify";
import React, { FC, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useGetCryptosQuery } from "../services/api";
import { Currency } from "../types";
const CryptoImg = styled("img")`
  width: 35px;
`;
type Props = {
  simplified?: boolean;
};
const Crypto: FC<Props> = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptoList.data.coins.filter((coin: Currency) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <CircularProgress />;
  return (
    <>
    {!simplified && 
    
      <SearchBar setSearchTerm={setSearchTerm} />
    }

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {cryptos?.map((currency: Currency) => (
            <Grid item xs={2} sm={4} md={4} key={currency.uuid}>
              <Card style={{ padding: "16px" }}>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>{currency.name}</h3>
                  <CryptoImg src={currency.iconUrl} alt="icon" />
                </Box>
                <Divider />
                <p>Price: {millify(parseInt(currency.price))}</p>
                <p>Market Cap: {millify(parseInt(currency.marketCap))}</p>
                <p>Daily Change: {millify(parseInt(currency.change))}</p>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Crypto;
