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
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import SearchBar from "../components/SearchBar";
import { COLORS } from "../constants/color";
import { useGetCryptosQuery } from "../services/api";
import { Currency, ModeType } from "../types";
import { addToCart } from "../app/favoriteSlice";
import { setData, toggledone } from "../app/coins.Slice";

type Props = {
  simplified?: boolean;
  mode: boolean;
};
const CryptoImg = styled("img")`
  width: 35px;
  object-fit: contain;
`;

export const numberWithCommas = (x: string, currency: string) => {
  if (currency === "USD") {
    return +x;
  } else {
    return +x * 470;
  }
};

const StyledTableHead = styled(TableHead)<ModeType>`
  background-color: ${(props) =>
    props.mode ? `${COLORS.HEADER}` : `${COLORS.LIGHT}`};
`;
const CoinTableCell = styled(TableCell)<ModeType>`
  color: ${(props) => (props.mode ? `white` : `black`)};
`;
const TableHeadTitle = styled(TableCell)<ModeType>`
  color: ${(props) => (props.mode ? "black" : "white")};
`;
const Coins: FC<Props> = ({ simplified, mode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const count = simplified ? 10 : 50;
  const symbol = useSelector((state: RootState) => state.currency.symbol);
  const currency = useSelector((state: RootState) => state.currency.currency);

  const cryptos = useSelector((state: RootState) => state.coins.coins);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data: cryptoList } = useGetCryptosQuery(count);

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin: Currency) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch(setData(filteredData));
  }, [cryptoList, searchTerm, dispatch]);

  const addToWishList = (item: Currency) => {
    dispatch(addToCart(item));
    dispatch(toggledone(item));
  };

  const headers = ["Coin", "Price", "24h Change", "Market Cap", "Wishlist"];
  if (!cryptos) return <CircularProgress />;
  return (
    <>
      {!simplified && <SearchBar setSearchTerm={setSearchTerm} />}

      <TableContainer
        style={{ backgroundColor: "transparent", cursor: "pointer" }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <StyledTableHead mode={mode}>
            <TableRow>
              {headers.map((head) => (
                <TableHeadTitle mode={mode} key={head}>
                  {head}
                </TableHeadTitle>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {cryptos?.map((coins: Currency) => {
              console.log(coins);
              return (
                <TableRow key={coins.uuid}>
                  <CoinTableCell
                    mode={mode}
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
                  </CoinTableCell>
                  <CoinTableCell mode={mode}>
                    {symbol}&nbsp;
                    {millify(numberWithCommas(coins.price, currency))}
                  </CoinTableCell>

                  <CoinTableCell
                    mode={mode}
                    style={{
                      color: +coins.price < 0 ? "rgb(14, 203, 129)" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {millify(+coins.change)}%
                  </CoinTableCell>
                  <CoinTableCell mode={mode}>
                    {symbol} &nbsp;
                    {millify(numberWithCommas(coins.marketCap, currency))}
                  </CoinTableCell>
                  <CoinTableCell mode={mode}>
                    <FavoriteBorderIcon
                      style={{ color: coins.done && mode ? "red" : "black" }}
                      onClick={() => addToWishList(coins)}
                    />
                  </CoinTableCell>
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
