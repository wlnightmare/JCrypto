import { Button, CircularProgress, Divider, styled } from "@mui/material";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { COLORS } from "../constants/color";
import { time } from "../constants/mockData";
import { useAppSelector } from "../hooks/redux-hooks";
import { changeSymbol } from "../pages/Coins";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/api";
import { Currency, ICoinHistoryResult, ModeType } from "../types";
import { LineChart } from "./LineChart";

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
    margin-left: -20px;
    float: left;
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
  margin-left: 23px;
  @media (max-width: 1110px) {
    margin-left: 30px;
  }
  @media (max-width: 1000px) {
    margin-left: 39px;
  }
`;
const ButtonContainer = styled("div")`
  margin-top: 20;
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 10px;
`;

const SelectButton = styled(Button)<ModeType>`
  border-radius: 5;
  margin-top: 10px;
  font-weight: bold;
  font-family: "Montserrat Alternates", sans-serif;
  cursor: pointer;
  background-color: ${(props) =>
    props.mode ? `${COLORS.HEADER}` : `${COLORS.LIGHT}`};
  color: ${(props) => (props.mode ? `${COLORS.SECONDARY}` : "white")};
  &:hover {
    background-color: ${COLORS.DETAILS};
    color: ${(props) => (props.mode ? `${COLORS.WHITE}` : `${COLORS.DETAILS}`)};
  }
  @media (max-width: 500px) {
    padding: 3px 3px;
  }
`;

const CoinHeader = styled("h3")<ModeType>`
  color: ${(props) => (props.mode ? `${COLORS.WHITE}` : `${COLORS.DETAILS}`)};
  font-size: 27px !important;
  @media (max-width: 900px) {
    font-size: 19px !important;
  }
`;
const CryptoDetails: FC<ModeType> = ({ mode }) => {
  const symbol = useAppSelector((state) => state.currency.symbol);
  const currency = useAppSelector((state) => state.currency.currency);
  const [timeperiod, setTimeperiod] = useState<string>("24h");
  const { coinId } = useParams();
  const { data } = useGetCryptoDetailsQuery(coinId);
  const { data: dataHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoDetail: Currency = data?.data?.coin;
  const coinHistory: ICoinHistoryResult = dataHistory?.data;

  if (!cryptoDetail && !coinHistory) return <CircularProgress />;

  return (
    <ContainerDiv>
      <CoinHeading mode={mode}>
        <img
          style={{ maxWidth: "180px" }}
          alt={cryptoDetail?.name}
          src={cryptoDetail?.iconUrl}
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
          {millify(changeSymbol(cryptoDetail.price, currency))}
        </Title>
        <Title>
          Market Cap:
          {symbol}&nbsp;
          {millify(changeSymbol(cryptoDetail.marketCap, currency))}
        </Title>
      </CoinHeading>
      <StyledDivider mode={mode} orientation="vertical" flexItem />
      <MainContainer>
        <LineChart
          mode={mode}
          coinHistory={coinHistory}
          currentPrice={millify(+cryptoDetail?.price ?? 0)}
          coinName={cryptoDetail?.name}
        />
        <ButtonContainer>
          {time.map((day) => (
            <SelectButton
              mode={mode}
              key={day.value}
              onClick={() => setTimeperiod(day.value)}
            >
              {day.label}
            </SelectButton>
          ))}
        </ButtonContainer>
      </MainContainer>
    </ContainerDiv>
  );
};

export { CryptoDetails };
