import React, { createContext, useContext, useState, ReactNode } from "react";

type FavoriteMoviesContextType = {
  favoriteMovies: string[]; 
  addFavoriteMovie: (movie: string) => void;
  removeFavoriteMovie: (movie: string) => void;
};

const FavoriteMoviesContext = createContext<FavoriteMoviesContextType | undefined>(undefined);

export function useFavoriteMovies() {
  const context = useContext(FavoriteMoviesContext);
  if (context === undefined) {
    throw new Error("useFavoriteMovies must be used within a FavoriteMoviesProvider");
  }
  return context;
}

type FavoriteMoviesProviderProps = {
  children: ReactNode;
};

// Provider component
export function FavoriteMoviesProvider({ children }: FavoriteMoviesProviderProps) {
  const [favoriteMovies, setFavoriteMovies] = useState<string[]>([]);

  const addFavoriteMovie = (movie: string) => {
    setFavoriteMovies((prevMovies) => [...prevMovies, movie]);
  };

  const removeFavoriteMovie = (movie: string) => {
    setFavoriteMovies((prevMovies) => prevMovies.filter((m) => m !== movie));
  };

  const value = {
    favoriteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
  };

  return (
    <FavoriteMoviesContext.Provider value={value}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
}
