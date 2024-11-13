import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Banner from "../../../components/Banner";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, ...rest } = props;
    return <img {...rest} priority={priority ? "true" : undefined} />;
  },
}));

jest.mock("react-responsive-carousel", () => ({
  Carousel: ({ children }: any) => <div>{children}</div>,
}));

describe("Banner Component", () => {
  const mockMovies = [
    {
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
    },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders movie details correctly", () => {
    render(<Banner movies={mockMovies} />);
    expect(screen.getByText("Despicable Me 4")).toBeInTheDocument();
    expect(
      screen.getByText(/Gru and Lucy and their girls/)
    ).toBeInTheDocument();
  });

  test("navigates to movie page on 'Watch now' button click", () => {
    render(<Banner movies={mockMovies} />);
    const watchNowButton = screen.getByText(/watch now/i);
    const { push } = useRouter();
    fireEvent.click(watchNowButton);
    expect(push).toHaveBeenCalledWith(`/movies/${mockMovies[0].id}`);
  });
});
