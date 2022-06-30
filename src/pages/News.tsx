import { Box, Card, CircularProgress, Grid, styled } from "@mui/material";
import moment from "moment";

import React, { FC, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

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

const StyledIcon = styled("img")`
  width: 30px;
  margin-top: 10px;
`;

const News: FC<Props> = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const [searchTermofNews, setSearchTermofNews] = useState("");
  const [news, setNews] = useState([]);

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 30,
  });
  useEffect(() => {
    const filteredData = cryptoNews?.value.filter((news: NewsType) =>
      news.name.toLocaleLowerCase().includes(searchTermofNews)
    );
    setNews(filteredData);
  }, [cryptoNews, searchTermofNews]);

  const demoNews =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  if (!cryptoNews?.value) return <CircularProgress />;
  return (
    <>
      {!simplified && <SearchBar setSearchTerm={setSearchTermofNews} />}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 6, md: 12 }}
        >
          {news?.map((news: NewsType) => (
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

                <div>
                  <StyledIcon
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl || demoNews
                    }
                    alt=""
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>{news.provider[0]?.name}</p>
                    <p>{moment(news.datePublished).fromNow()}</p>
                  </div>
                </div>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default News;
