import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import { formattedDate } from "../../utils/dateUtils";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useRouter } from "next/router";

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: any;
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, onClose, movie }) => {
  const router = useRouter();

  const handleNavigate = (movieId: any) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className=" bg-black w-[90%] rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 scale-100 opacity-100 sm:w-[600px] lg:w-[900px]">
            <div className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                alt={movie?.title}
                sizes="100vw"
                width={0}
                height={0}
                priority
                className="w-[100%] h-[400px] object-cover md:h-[450px]"
              />
              <div className="flex w-full px-4 items-center absolute top-[300px] left-0 z-10 justify-between">
                <div>
                  <h2 className="text-[20px] font-bold text-white font-roboto text-shadow md:text-[40px]">
                    {movie.title}
                  </h2>
                  <div>
                    <button
                      className=" relative w-48 px-4 py-3 text-white border border-red-950 mt-[10px] bg-red-400 rounded-lg overflow-hidden group"
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
                  </div>
                </div>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                  alt={movie?.title}
                  style={{
                    width: "70px",
                    height: "100px",
                    borderRadius: 10,
                    objectFit: "cover",
                    border: "4px solid white",
                  }}
                  sizes="100vw"
                  width={0}
                  height={0}
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div className="p-4">
              <p className="mt-2 text-gray-200">{movie.overview}</p>
              <p className="text-[15px] text-gray-400 font-roboto mt-[20px]">
                Release Date: {formattedDate(movie.release_date)}
              </p>
              <p className="text-[15px] text-gray-400 font-roboto">
                Rating: {movie.vote_average} / 10
              </p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black rounded-full p-2 md:top-2 md:right-2"
            >
              <IoClose color="white" size={25} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieModal;
