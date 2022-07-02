import {
  CircularProgress,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import millify from "millify";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

import SearchBar from "../components/SearchBar";
import { COLORS } from "../constants/color";
import { useGetCryptosQuery } from "../services/api";
import { Currency, ModeType } from "../types";

const CryptoImg = styled("img")`
  width: 35px;
  object-fit: contain;
`;

type Props = {
  simplified?: boolean;
  mode?: boolean;
};

const numberWithCommas = (x: string, currency: string) => {
  if (currency === "USD") {
    return +x;
  } else {
    return +x * 470;
  }
};

const Coins: FC<Props> = ({ simplified, mode }) => {
  const navigate = useNavigate();
  const symbol = useSelector((state: RootState) => state.currency.symbol);
  const currency = useSelector((state: RootState) => state.currency.currency);
  const count = simplified ? 10 : 100;
  const { data: cryptoList } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin: Currency) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  const headers = ["Coin", "Price", "24h Change", "Market Cap", "Graph"];
  if (!cryptoList) return <CircularProgress />;
  return (
    <>
      {!simplified && <SearchBar setSearchTerm={setSearchTerm} />}

      <TableContainer
        style={{ backgroundColor: COLORS.WHITE, cursor: "pointer" }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: COLORS.SECONDARY }}>
            <TableRow>
              {headers.map((head) => (
                <TableCell
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontFamily: "Montserrat Alternates",
                  }}
                  key={head}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptos?.map((coins: Currency) => {
              return (
                <TableRow key={coins.uuid}>
                  <TableCell
                    style={{ display: "flex" }}
                    onClick={() => navigate(`/crypto/${coins.uuid}`)}
                  >
                    <CryptoImg src={coins.iconUrl} alt="icon" />
                    <div style={{ marginLeft: 10 }}>
                      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                        {coins.symbol}
                      </p>
                      <p>{coins.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {symbol}&nbsp;
                    {millify(numberWithCommas(coins.price, currency))}
                  </TableCell>

                  <TableCell
                    style={{
                      color: +coins.price < 0 ? "rgb(14, 203, 129)" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {millify(+coins.change)}%
                  </TableCell>
                  <TableCell>
                    {symbol} &nbsp;
                    {millify(numberWithCommas(coins.marketCap, currency))}
                  </TableCell>
                  <TableCell>тут граф</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Coins;
