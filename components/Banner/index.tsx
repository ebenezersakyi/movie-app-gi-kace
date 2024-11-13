import Image from "next/image";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoIosStar } from "react-icons/io";
import { FaRegCirclePlay } from "react-icons/fa6";

import { useRouter } from "next/router";
import { LuInfo } from "react-icons/lu";
import MovieModal from "../Modal/MovieModal";
import { MovieType } from "../../types";

function Banner({ movies }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const handleOpen = (movie: any) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  const router = useRouter();

  const handleNavigate = (movieId: any) => {
    router.push(`/movies/${movieId}`);
  };

  const genres = ["Comedy", "Romance", "Action"];
  return (
    <div>
      <MovieModal isOpen={isOpen} onClose={handleClose} movie={selectedMovie} />
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
      >
        {movies?.map((movie: any, index: any) => {
          return (
            <div key={index} className="w-[100%] h-[80vh] relative">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                alt={movie?.title}
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-full object-cover"
                priority
              />

              <div className="absolute top-0 left-0 right-0 bottom-0 z-10 inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-00" />

              <div className="flex items-center content-center absolute h-full w-full top-0 z-20 bg-[rgba(0,0,0,0.4)] p-7 text-left sm:p-20 lg:p-52">
                <div className="w-[100%] flex flex-col lg:w-[55%] ">
                  <span className="text-[20px] text-red-300 font-thin">
                    Science Fiction
                  </span>
                  <span className="flex mt-[5px] space-x-1">
                    {[1, 2, 3, 4, 5].map((item, index) => {
                      return <IoIosStar key={index} size={15} color="white" />;
                    })}
                  </span>
                  <span className="text-white font-roboto text-[35px] font-semibold sm:text-[50px] text-shadow">
                    {movie?.title}
                  </span>
                  <span className="text-white font-roboto text-[15px] mt-[15px] line-clamp-4">
                    {movie?.overview}
                  </span>

                  <div className="flex space-x-2 items-center">
                    <button
                      className=" relative w-48 px-4 py-3 text-white border border-red-950 mt-[30px] bg-red-400 rounded-lg overflow-hidden group"
                      onClick={() => {
                        handleNavigate(movie?.id);
                      }}
                    >
                      <span className="absolute inset-0 transition-all duration-500 ease-in-out bg-gradient-to-r from-red-600 to-red-950 group-hover:translate-x-full"></span>
                      <span className="flex items-center justify-center relative z-10 font-roboto">
                        <FaRegCirclePlay color="white" className="mr-2" />
                        Watch now
                      </span>
                    </button>
                    <button
                      className=" relative w-48 px-4 py-3 text-white border border-gray-950 mt-[30px] bg-gray-400 rounded-lg overflow-hidden group"
                      onClick={() => {
                        handleOpen(movie);
                      }}
                    >
                      <span className="absolute inset-0 transition-all duration-500 ease-in-out bg-gradient-to-r from-gray-600 to-gray-950 group-hover:translate-x-full"></span>
                      <span className="flex items-center justify-center relative z-10 font-roboto">
                        <LuInfo color="white" className="mr-2" />
                        More info
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Banner;
