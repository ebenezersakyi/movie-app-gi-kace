import React from "react";
import Layout from "../../../components/Layout";
import { GetServerSideProps } from "next";
import { MovieType } from "../../../types";
import Card from "../../../components/Common/Card";
import Image from "next/image";
import { useRouter } from "next/router";

interface AccountPageProps {
  movies: MovieType[];
}

// Dummy user profile for demonstration
const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
};

const Account = ({ movies }: AccountPageProps) => {
  const router = useRouter();

  // Handle user logout
  const handleLogout = () => {
    router.push(`/`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white flex flex-col items-center pt-[100px]">
        <div className="mt-10 w-full max-w-4xl px-4">
          <div className="flex items-center space-x-4">
            <Image
              src={`https://cdn-icons-png.freepik.com/512/6596/6596121.png`}
              alt="User Avatar"
              width="0"
              height="0"
              sizes="100vw"
              priority
              className="w-24 h-24 rounded-full object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold">{userProfile.name}</h1>
              <p className="text-gray-400">{userProfile.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Favorite Movies</h2>
            <div className="flex flex-col items-center space-y-2 sm:grid grid-cols-2 space-x-4 md:grid-cols-3 gap-4">
              {movies?.slice(0, 6).map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
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
      movies,
    },
  };
};

export default Account;
