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
