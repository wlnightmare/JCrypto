export interface Currency {
  "24hVolume": string;
  btcPrice: string;
  change: string;
  coinrankingUrl: string;
  color: string;
  iconUrl: string;
  listedAt: string;
  lowVolume: boolean;
  marketCap: string;
  name: string;
  price: string;
  rank: number;
  sparkline: string[];
  symbol: string;
  tier: number;
  uuid: string;
  allTimeHigh: ICoinHistoryData;
  supply: ICoinSupply;
  numberOfExchanges: number;
  numberOfMarkets: number;
  description: string;
  links: ICoinLinks[];
  done: boolean;
}
export interface ICoinHistoryResult {
  change: string;
  history: ICoinHistoryData[];
}
export interface ICoinHistoryData {
  price: string;
  timestamp: number;
}
export interface ICoinLinks {
  name: string;
  type: string;
  url: string;
}
export interface ICoinSupply {
  confirmed: boolean;
  total: string;
  circulating: string;
}

export interface NewsType {
  name: string;
  description: string;
  image: Thumbnail;
  provider: Provider[];
  datePublished: string;
}

export interface Thumbnail {
  thumbnail: {
    contentUrl: string;
  };
}

export interface Provider {
  name: string;
  image: {
    thumbnail: {
      contentUrl: string;
    };
  };
}

export interface ThemeContextType {
  theme: string;
  changeTheme: (value: string) => void;
}

export type ModeType = {
  mode: boolean;
};

export interface ThemeStore {
  darkmode: boolean;
}

export interface FavoriteStore {
  wishlist: Currency[];
}
export type AuthProp = {
  handleClose: () => void;
  handleChangeForm: () => void;
};
export type FormValues = {
  email: string;
  password: string;
};
export type ModalOpenClose = {
  open: boolean;
};
export type LineChartProps = {
  coinHistory: ICoinHistoryResult;
  currentPrice?: string;
  coinName?: string;
  mode: boolean;
};
export type NavbarType = {
  mode: boolean;
  location: string;
};
