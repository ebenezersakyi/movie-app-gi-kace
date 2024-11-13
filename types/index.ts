export type ProductionCompany = {
  id: number;
  name: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Collection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type MovieType = {
  id: number;
  adult: boolean;
  title: string;
  imageUrl: string;
  description?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: Date;
  runtime: string;
  budget: number;
  vote_average: number;
  origin_country: string[];
  production_companies: ProductionCompany[];
  genres: Genre[];
  belongs_to_collection?: Collection;
};
