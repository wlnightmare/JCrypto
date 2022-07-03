import { Button, CircularProgress, Divider, styled } from "@mui/material";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../app/store";
import { COLORS } from "../constants/color";
import { numberWithCommas } from "../pages/Coins";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/api";
import { Currency, ModeType } from "../types";
import { LineChart } from "./LineChart";

type Props = { mode: boolean };

const CoinHeading = styled("div")<ModeType>`
  display: flex;
  flex-direction: column;
  width: 25%;
  float: left;
  color: ${(props) => (props.mode ? `${COLORS.WHITE}` : `${COLORS.DETAILS}`)};
  margin-right: 10px;
  padding: 10px;
  font-weight: bold;

  @media (max-width: 800px) {
    justify-content: center;
    width: 100%;
    margin-left: -60px;
    align-items: center;
  }
  @media (max-width: 900px) {
  }
`;
const ContainerDiv = styled("div")`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Title = styled("div")`
  font-size: 25px;
  margin-top: 10px;
`;
const MainContainer = styled("div")`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const StyledDivider = styled(Divider)<ModeType>`
  border: ${(props) => (props.mode ? "1px solid white" : "1px solid grey")};
  @media (max-width: 800px) {
    display: none;
  }
`;

const SelectButton = styled(Button)<ModeType>`
  border: 2px solid white;
  border-radius: 5;
  padding: 10;
  padding-left: 20;
  padding-right: 20;
  font-weight: bold;
  font-family: "Montserrat Alternates", sans-serif;
  cursor: pointer;
  background-color: ${(props) =>
    props.mode ? `${COLORS.HEADER}` : `${COLORS.LIGHT}`};
  color: ${(props) => (props.mode ? `${COLORS.SECONDARY}` : "white")};
  &:hover {
    background-color: white;
    border: 2px solid ${COLORS.DETAILS};
    color: black;
  }
  width: 22%;
`;

const CoinHeader = styled("h2")<ModeType>`
  color: ${(props) => (props.mode ? `white` : "black")};
`;
const CryptoDetails: FC<Props> = ({ mode }) => {
  const symbol = useSelector((state: RootState) => state.currency.symbol);
  const currency = useSelector((state: RootState) => state.currency.currency);
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState<string>("7d");
  const { data } = useGetCryptoDetailsQuery(coinId);
  const { data: dataHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoDetail: Currency = data?.data?.coin;
  const coinHistory = dataHistory?.data;

  const time = ["24h", "7d", "30d", "1y"];

  if (!cryptoDetail && !coinHistory) return <CircularProgress />;

  return (
    <ContainerDiv>
      <CoinHeading mode={mode}>
        <img
          style={{ maxWidth: "180px" }}
          src={cryptoDetail?.iconUrl}
          alt="img"
        />
        <CoinHeader mode={mode} style={{ margin: 20, fontSize: "30px" }}>
          {cryptoDetail?.name}
          &nbsp;
          {cryptoDetail?.symbol}
        </CoinHeader>

        {HTMLReactParser(cryptoDetail?.description.substring(0, 245))}
        <Title>Rank: {cryptoDetail?.rank}</Title>
        <Title>
          Current Price:
          {symbol}&nbsp;
          {millify(numberWithCommas(cryptoDetail.price, currency))}
        </Title>
        <Title>
          Market Cap:
          {symbol}&nbsp;
          {millify(numberWithCommas(cryptoDetail.marketCap, currency))}
        </Title>
      </CoinHeading>
      <StyledDivider mode={mode} orientation="vertical" flexItem />

      <MainContainer>
        <LineChart
          mode={mode}
          coinHistory={coinHistory!}
          currentPrice={millify(+cryptoDetail?.price ?? 0)}
          coinName={cryptoDetail?.name}
        />
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            gap: "10px",
          }}
        >
          {time.map((day) => (
            <SelectButton mode={mode} onClick={() => setTimeperiod(day)}>
              {day}
            </SelectButton>
          ))}
        </div>
      </MainContainer>
    </ContainerDiv>
  );
};

export { CryptoDetails };
