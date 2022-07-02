import { Button, CircularProgress, Divider, styled } from "@mui/material";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { COLORS } from "../constants/color";
import { time } from "../constants/mockData";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/api";
import { Currency, ModeType } from "../types";
import { LineChart } from "./LineChart";

const CoinHeading = styled("div")<ModeType>`
  display: flex;
  flex-direction: column;
  width: 25%;
  float: left;
  color: ${(props) =>
    props.mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`};
  margin-right: 10px;
  padding: 10px;
  font-weight: bold;

  @media (max-width: 800px) {
    justify-content: center;
    width: 100%;
    align-items: center;
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
const ButtonContainer = styled("div")`
  margin-top: 20;
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 10px;
`;
type ButtonType = {
  selected: boolean;
};
const SelectButton = styled(Button)<ButtonType>`
  border: 2px solid #ef5630;
  border-radius: 5;
  padding: 10;
  padding-left: 20;
  padding-right: 20;
  font-weight: ${(props) => (props.selected ? "700" : "500")};
  font-family: "Montserrat Alternates", sans-serif;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#ef5630" : "")};
  color: ${(props) => (props.selected ? "white" : "black")};
  &:hover {
    background-color: "#ef5630";
    border: 2px solid #ef5630;
    color: black;
  }
  width: 22%;
`;
const CryptoDetails: FC<ModeType> = ({ mode }) => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState<string>("24h");
  const { data } = useGetCryptoDetailsQuery(coinId);
  const { data: dataHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoDetail: Currency = data?.data?.coin;
  const coinHistory = dataHistory?.data;

  if (!cryptoDetail && !coinHistory) return <CircularProgress />;

  return (
    <ContainerDiv>
      <CoinHeading mode={mode}>
        <img style={{ maxWidth: "180px" }} src={cryptoDetail?.iconUrl} />
        <h2 style={{ margin: 20, fontSize: "30px" }}>
          {cryptoDetail?.name}
          {cryptoDetail?.symbol}
        </h2>
        {HTMLReactParser(cryptoDetail?.description?.substring(0, 245))}
        <Title>Rank: {cryptoDetail?.rank}</Title>
        <Title>Current Price: {millify(+cryptoDetail?.price)}</Title>
        <Title>Market Cap: {millify(+cryptoDetail?.marketCap)}</Title>
      </CoinHeading>
      <StyledDivider mode={mode} orientation="vertical" flexItem />

      <MainContainer>
        <LineChart
          mode={mode}
          coinHistory={coinHistory!}
          currentPrice={millify(+cryptoDetail?.price ?? 0)}
          coinName={cryptoDetail?.name}
        />
        <ButtonContainer>
          {time.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => setTimeperiod(day.value)}
              selected={day.value === timeperiod}
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
