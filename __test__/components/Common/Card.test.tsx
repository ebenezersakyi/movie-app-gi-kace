import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe } from "node:test";
import Card from "../../../components/Common/Card";
import { useRouter } from "next/router";
import { formattedDate } from "../../../utils/dateUtils";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../utils/dateUtils", () => ({
  formattedDate: jest.fn().mockImplementation((date) => date),
}));

const mockMovie = {
  adult: false,
  backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
  genre_ids: [16, 10751, 35, 28],
  id: 519182,
  original_language: "en",
  original_title: "Despicable Me 4",
  overview:
    "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
  popularity: 3517.779,
  poster_path: "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
  release_date: "2024-06-20",
  title: "Despicable Me 4",
  video: false,
  vote_average: 7.218,
  vote_count: 397,
};

describe("Card Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders movie details correctly", () => {
    render(<Card movie={mockMovie} />);

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
    expect(
      screen.getByText(`Release Date: ${mockMovie.release_date}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Rating: ${mockMovie.vote_average} / 10`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockMovie.title)).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`
    );
  });

  it("navigates to movie page on Play button click", () => {
    render(<Card movie={mockMovie} />);

    // Find the Play button by its SVG path
    const playButton: any = screen
      .getAllByRole("button")
      .find((button) =>
        button.innerHTML.includes("m96 448 320-192L96 64v384z")
      );
    const { push } = useRouter();

    fireEvent.click(playButton);

    expect(push).toHaveBeenCalledWith(`/movies/${mockMovie.id}`);
  });
});
