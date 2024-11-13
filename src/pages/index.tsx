import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import Card from "../../components/Common/Card";
import { MovieType } from "../../types";
import { useEffect, useState } from "react";
import Head from "next/head";

interface HomePageProps {
  movies: MovieType[];
}

const HomePage = ({ movies }: HomePageProps) => {
  const [bannerMovies, setBannerMovies] = useState<any>([]);

  // Function to get random movies for the carousel component
  function getRandomMovies(arr: MovieType[], numItems: number): MovieType[] {
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, numItems);
  }

  useEffect(() => {
    const randomMovies = getRandomMovies(movies, 3);
    setBannerMovies(randomMovies);
  }, [movies]);

  return (
    <Layout>
      <Head>
        <title>Eben&apos;s movie app</title>
        <meta
          name="description"
          content="A Next.js movie app using the TMDB API, featuring popular movies, a detail page, and search functionality. Created for a frontend assessment."
        />
      </Head>
      {bannerMovies.length > 0 && <Banner movies={bannerMovies} />}
      <div className="relative p-[20px]">
        <div className="flex flex-wrap gap-4 justify-center">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();
  const movies: MovieType[] = data.results;

  return {
    props: {
      movies: movies,
    },
  };
};

export default HomePage;
