import type { Movie } from "../../App/types";

const API_KEY = "f540d1bb"; // not important can stay in the code
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

interface OmdbSearchResponse {
    Search?: Movie[];
    Error?: string;
    Response: "True" | "False";
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
    if (query.length < 3) {
        return [];
    }

    try {
        const response = await fetch(`${API_URL}&s=${query}`);
        const data: OmdbSearchResponse = await response.json();

        if (data.Response === "True" && data.Search) {
            return data.Search;
        } else {
            console.error(data.Error);
            return [];
        }
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return [];
    }
};
