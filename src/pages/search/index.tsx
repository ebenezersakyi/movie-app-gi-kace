import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Card from "../../../components/Common/Card";
import { MovieType } from "../../../types";
import Head from "next/head";
import { BarLoader } from "react-spinners";
import { IoClose, IoFilter } from "react-icons/io5";

function Search() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Handle filter change
  const handleFilterChange = (e: any) => {
    setSelectedFilter(e.target.value);
  };

  const router = useRouter();
  const { query } = router.query;

  // Fetch movies based on search query
  const getMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const moviesData = await res.json();
      setMovies(moviesData.results);
      setFilteredMovies(moviesData.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      getMovies();
    }
  }, [query]);

  const closeDialog = () => {
    setShowFilterDialog(false);
  };

  // Apply selected filter to the movie list
  const applyFilter = () => {
    let filtered: MovieType[] = [];

    switch (selectedFilter) {
      case "all":
        filtered = movies;
      case "adult-content":
        filtered = movies.filter((item: MovieType) => {
          return item.adult == true;
        });
        break;
      case "safe-for-work":
        filtered = movies.filter((item: MovieType) => {
          return item.adult == false;
        });
        break;
      default:
        break;
    }
    setFilteredMovies(filtered);
    setShowFilterDialog(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex w-full h-[100vh] align-middle items-center justify-center content-center">
          <BarLoader color="white" speedMultiplier={1} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Eben&apos;s video app - {query?.toString()}</title>
        <meta
          name="description"
          content="A Next.js movie app using the TMDB API, featuring popular movies, a detail page, and search functionality. Created for a frontend assessment."
        />
      </Head>

      {/* Start of filter Dialog */}
      {showFilterDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeDialog}
          />
          <div className=" bg-black p-[20px] w-[90%] h-[60%] rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 scale-100 opacity-100 sm:w-[500px]">
            <h2 className="text-[20px] mb-2 font-bold">Filters</h2>

            <div className="flex flex-col space-y-4 mt-5">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="all"
                  name="content-filter"
                  value="all"
                  checked={selectedFilter === "all"}
                  onChange={handleFilterChange}
                  className="form-radio"
                />
                <label htmlFor="all" className="text-white">
                  All
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="adult-content"
                  name="content-filter"
                  value="adult-content"
                  checked={selectedFilter === "adult-content"}
                  onChange={handleFilterChange}
                  className="form-radio"
                />
                <label htmlFor="adult-content" className="text-white">
                  Adult content
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="safe-for-work"
                  name="content-filter"
                  value="safe-for-work"
                  checked={selectedFilter === "safe-for-work"}
                  onChange={handleFilterChange}
                  className="form-radio"
                />
                <label htmlFor="safe-for-work" className="text-white">
                  Safe for work
                </label>
              </div>
            </div>

            <button
              onClick={applyFilter}
              className="absolute bottom-4 right-4 bg-white rounded-md p-1 px-4 text-black font-roboto"
            >
              Apply
            </button>

            <button
              onClick={closeDialog}
              className="absolute top-4 right-4 bg-black rounded-full p-2 md:top-2 md:right-2"
            >
              <IoClose color="white" size={25} />
            </button>
          </div>
        </div>
      )}
      {/* end of filter Dialog */}

      <div className="pt-[100px] px-[30px]">
        <div className="flex justify-between items-center">
          <span className="text-[25px]">
            Showing results for &quot;{query}&quot;
          </span>
          <span
            className=" cursor-pointer"
            onClick={() => {
              setShowFilterDialog(true);
            }}
          >
            <IoFilter size={25} color="white" />
          </span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-[50px]">
          {filteredMovies.map((movie: MovieType) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Search;
