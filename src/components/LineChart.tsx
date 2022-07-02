import React, { FC } from "react";
import { ICoinHistoryResult, ModeType } from "../types";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { COLORS } from "../constants/color";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { numberWithCommas } from "../pages/Coins";

ChartJS.register(...registerables);
type LineChartProps = {
  coinHistory: ICoinHistoryResult;
  currentPrice?: string;
  coinName?: string;
  mode: boolean;
};

const StyledLine = styled(Line)<ModeType>`
  background-color: ${(props) => (props.mode ? "black" : "")};
`;

export const LineChart: FC<LineChartProps> = ({
  coinHistory,
  currentPrice,
  coinName,
  mode,
}) => {
  const coinPrice: string[] = [];
  const coinTimestamp: string[] = [];

  const currency = useSelector((state: RootState) => state.currency.currency);

  for (let i = 0; i < coinHistory?.history.length!; i += 1) {
    coinPrice.push(coinHistory?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.history.length!; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.history[i].timestamp * 1000).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`,
        borderColor: mode ? `${COLORS.DETAILS}` : `${COLORS.SECONDARY}`,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${coinName} to USD`,
      },
    },
  };

  return (
    <>
      <StyledLine mode={mode} data={data} options={options}></StyledLine>
    </>
  );
};
