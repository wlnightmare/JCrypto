import {
  Button,
  Container,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from "@mui/material";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { FC, MouseEventHandler, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/api";
import { Currency, ModeType } from "../types";
import { LineChart } from "./LineChart";

type Props = { mode: boolean };

const CoinHeading = styled("div")`
  display: flex;
  flex-direction: column;
  width: 25%;
  float: left;
  margin-right: 10px;
  padding: 10px;
  font-weight: bold;
  font-family: "Montserrat Alternates", sans-serif;
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

const SelectButton = styled(Button)`
  border: 2px solid white;
  border-radius: 5;
  padding: 10;
  padding-left: 20;
  padding-right: 20;
  font-weight: bold;
  font-family: "Montserrat Alternates", sans-serif;
  cursor: pointer;
  background-color: #ef5630;
  color: white;
  &:hover {
    background-color: white;
    border: 2px solid #ef5630;
    color: black;
  }
  width: 22%;
`;
const CryptoDetails: FC<Props> = ({ mode }) => {
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

  return (
    <ContainerDiv>
      <CoinHeading>
        <img style={{ maxWidth: "180px" }} src={cryptoDetail?.iconUrl} />
        <h2 style={{ margin: 10, fontSize: "30px" }}>
          {cryptoDetail?.name} ({cryptoDetail?.symbol})
        </h2>

        {HTMLReactParser(cryptoDetail?.description.substring(0, 245))}
        <Title>Rank: {cryptoDetail?.rank}</Title>
        <Title>Current Price: {millify(+cryptoDetail?.price)}</Title>
        <Title>Market Cap: {millify(+cryptoDetail?.marketCap)}</Title>
      </CoinHeading>
      <StyledDivider mode={mode} orientation="vertical" flexItem />
      <MainContainer>
        <LineChart
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
            <SelectButton onClick={() => setTimeperiod(day)}>
              {day}
            </SelectButton>
          ))}
        </div>
      </MainContainer>
    </ContainerDiv>
  );
};

export { CryptoDetails };
