import { Box, Card, CircularProgress, styled } from "@mui/material";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useGetCryptoNewsQuery } from "../services/cryptoNews";
import { ModeType, NewsType } from "../types";

type Props = {
  simplified?: boolean;
  mode: boolean;
};

const StyledImg = styled("img")`
  object-fit: contain;
`;

const StyledIcon = styled("img")`
  width: 30px;
  margin-top: 10px;
`;
const StyledCardsContainer = styled("div")`
  display: flex;

  gap: 22px;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    justify-content: center;
  }
`;

const StyledCard = styled(Card)<ModeType>`
  &:hover {
    transform: translateY(0) scale(1.1);
    transition: 0.2s;
  }
  min-height: 100%;
  width: 300px;
  background-color: #fbfbfb;
  padding: 10px;
`;

const News: FC<Props> = ({ simplified, mode }) => {
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

  if (!cryptoNews?.value) return <CircularProgress />;
  return (
    <>
      {!simplified && <SearchBar setSearchTerm={setSearchTermofNews} />}
      <StyledCardsContainer>
        {news?.map((news: NewsType) => (
          <StyledCard mode={mode} key={news.name}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h3>{news?.name}</h3>
              <StyledImg
                src={news?.image?.thumbnail?.contentUrl}
                alt={news?.name.substring(0, 10)}
              />
            </Box>
            <p>{news?.description}</p>

            <div>
              <StyledIcon
                src={news.provider[0]?.image?.thumbnail?.contentUrl}
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
        ))}
      </StyledCardsContainer>
    </>
  );
};

export default News;
