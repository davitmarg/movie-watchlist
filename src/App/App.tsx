import { useState } from "react";
import type { Movie, MovieList } from "./types";
import { Controls } from "../components/Controls";
import { List } from "../components/List";
import { AddMoviePopup } from "../components/AddMoviePopup";
import styles from "./App.module.css";

const initialList: MovieList = {
    id: "main-list",
    name: "My Watchlist",
    movies: [],
};

function App() {
    const [list, setList] = useState<MovieList>(initialList);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // --- Simplified Movie Functions ---
    const addMovie = (movie: Movie) => {
        // Add movie if it's not already in the list
        if (!list.movies.find((m) => m.imdbID === movie.imdbID)) {
            setList((prevList) => ({
                ...prevList,
                movies: [...prevList.movies, movie],
            }));
        }
    };

    const removeMovie = (movieId: string) => {
        setList((prevList) => ({
            ...prevList,
            movies: prevList.movies.filter((m) => m.imdbID !== movieId),
        }));
    };

    return (
        <div className={styles.app}>
            {/* The List component now displays the title */}
            <List list={list} onRemoveMovie={removeMovie} />

            {/* The 'Controls' component now only has one button */}
            <Controls onAddMovieClick={() => setIsPopupOpen(true)} />

            {/* The popup no longer needs the 'lists' prop */}
            {isPopupOpen && (
                <AddMoviePopup
                    onClose={() => setIsPopupOpen(false)}
                    onAddMovie={addMovie}
                />
            )}
        </div>
    );
}

export default App;
