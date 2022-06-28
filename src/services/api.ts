import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders = {
  'X-RapidAPI-Key': 'f38ec55bb4mshe9d08a480040bf8p166916jsn6a619fbf22c1',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  };

  const baseUrl ='https://coinranking1.p.rapidapi.com'

  const createRequest = (url:string) => ({ url, headers: cryptoApiHeaders });  
   
  export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptos: builder.query({
        query: (count) => createRequest(`/coins?limit=${count}`)
      })
    }),
  });
  export const {
    useGetCryptosQuery,
  } = cryptoApi;