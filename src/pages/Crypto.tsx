import { Box, CircularProgress, Divider, styled } from "@mui/material";
import millify from "millify";
import React, { FC, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useGetCryptosQuery } from "../services/api";
import { Currency, ModeType } from "../types";

type Props = {
  simplified?: boolean;
  mode: boolean;
};

const CryptoImg = styled("img")`
  width: 35px;
  object-fit: contain;
`;

const StyledCardsCointainer = styled("div")`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  @media (max-width: 700px) {
    justify-content: center;
  }
`;
const StyledCardItem = styled("div")<ModeType>`
  background-color: ${(props) => (props.mode ? "#cabac8" : "white")};
  margin-top: 10px;
  height: 150px;
  padding: 16px;
  width: 250px;
  &:hover {
    transform: translateY(0) scale(1.1);
    transition: 0.2s;
  }
`;

const Crypto: FC<Props> = ({ simplified, mode }) => {
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

      <StyledCardsCointainer>
        {cryptos?.map((currency: Currency) => (
          <StyledCardItem mode={mode}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{currency.name}</h3>
              <CryptoImg src={currency.iconUrl} alt="icon" />
            </Box>
            <Divider />
            <p>Price: {millify(+currency.price)}</p>
            <p>Market Cap: {millify(parseInt(currency.marketCap))}</p>{" "}
            <p>Daily Change: {millify(parseInt(currency.change))}</p>
          </StyledCardItem>
        ))}
      </StyledCardsCointainer>
    </>
  );
};

export default Crypto;
