import React, { FC } from "react";
import { ICoinHistoryResult, ModeType } from "../types";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { COLORS } from "../constants/color";

import { styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

ChartJS.register(...registerables);
type LineChartProps = {
  coinHistory: ICoinHistoryResult;
  currentPrice?: string;
  coinName?: string;
  mode: boolean;
};

const StyledLine = styled(Line)<ModeType>`
  background-color: ${(props) => (props.mode ? "transparent" : "")};
  @media (max-width: 800px) {
    margin-left: -20px;
  }
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
        label: `Price in ${currency}`,
        data: coinPrice,
        fill: false,
        backgroundColor: mode ? `${COLORS.HEADER}` : `${COLORS.LIGHT}`,
        borderColor: mode ? `${COLORS.HEADER}` : `${COLORS.LIGHT}`,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${coinName} to ${currency}`,
      },
    },
  };

  return (
    <>
      <StyledLine mode={mode} data={data} options={options}></StyledLine>
    </>
  );
};
