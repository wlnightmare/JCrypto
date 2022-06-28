import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import moment from "moment";

import React, { FC, useState } from "react";
import { useGetCryptosQuery } from "../services/api";
import { useGetCryptoNewsQuery } from "../services/cryptoNews";
import { NewsType } from "../types";

type Props = {
  simplified?: boolean;
};

const StyledImg = styled("img")`
  object-fit: contain;
`;

const StyledCard = styled(Card)`
  &:hover {
    transform: translateY(0) scale(1.1);
    transition: 0.2s;
  }
  height: 300px;
`;

const News: FC<Props> = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  const demoNews =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  if (!cryptoNews?.value) return <CircularProgress />;
  return (
    <>
      {!simplified && <input></input>}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 6, md: 12 }}
        >
          {cryptoNews?.value?.map((news: NewsType) => (
            <Grid key={news.name} item xs={2} sm={4} md={4}>
              <StyledCard style={{ padding: "16px" }}>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>{news?.name}</h3>
                  <StyledImg
                    src={news?.image?.thumbnail?.contentUrl || demoNews}
                  />
                </Box>
                <p>{news?.description}</p>
                {/* 
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl || demoNews
                    }
                    alt=""
                  />
                  <p>{news.provider[0]?.name}</p>
                  <p>
                    {moment(news.datePublished).format("DD MMM YYYY HH:mm:ss")}
                  </p>
                </div> */}
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default News;
