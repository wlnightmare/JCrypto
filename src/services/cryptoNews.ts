import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': 'f38ec55bb4mshe9d08a480040bf8p166916jsn6a619fbf22c1',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'    
}

const baseUrl  = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url:string) =>({url,headers: newsApiHeaders})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptoNews: builder.query({
        query: ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
      })
    }),
  });

  export const {useGetCryptoNewsQuery} = cryptoNewsApi