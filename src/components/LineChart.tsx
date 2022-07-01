import React, { FC } from "react";
import { ICoinHistoryResult } from "../types";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);
type LineChartProps = {
  coinHistory: ICoinHistoryResult;
  currentPrice?: string;
  coinName?: string;
};

export const LineChart: FC<LineChartProps> = ({
  coinHistory,
  currentPrice,
  coinName,
}) => {
  const coinPrice: string[] = [];
  const coinTimestamp: string[] = [];
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
        backgroundColor: "#ef5630",
        borderColor: "#ef5630",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "50px",
          color: "#ef5630",
        }}
      ></div>
      <Line data={data} options={options}></Line>
    </>
  );
};
