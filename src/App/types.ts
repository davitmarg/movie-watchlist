export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
}

export interface MovieList {
    id: string;
    name: string;
    movies: Movie[];
}
