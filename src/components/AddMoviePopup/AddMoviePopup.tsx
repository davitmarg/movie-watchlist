import React, { useState, useEffect } from "react";
import type { Movie } from "../../App/types";
import { searchMovies } from "../../services/omdbApi";
import styles from "./AddMoviePopup.module.css";

interface AddMoviePopupProps {
    onClose: () => void;
    onAddMovie: (movie: Movie) => void;
}

export const AddMoviePopup: React.FC<AddMoviePopupProps> = ({
    onClose,
    onAddMovie,
}) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    // Debounced search effect
    useEffect(() => {
        const timerId = setTimeout(() => {
            if (query) {
                searchMovies(query).then(setResults);
            } else {
                setResults([]);
            }
        }, 500);
        return () => clearTimeout(timerId);
    }, [query]);

    const handleSubmit = () => {
        if (selectedMovie) {
            onAddMovie(selectedMovie);
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <h2>Add a Movie</h2>

                {/* 1. Movie Search (Dropdown is gone) */}
                <label htmlFor="movie-search">Search for a movie:</label>
                <input
                    id="movie-search"
                    type="text"
                    className={styles.input}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., The Matrix"
                />
                <div className={styles.results}>
                    {results.map((movie) => (
                        <div
                            key={movie.imdbID}
                            className={`${styles.resultItem} ${
                                selectedMovie?.imdbID === movie.imdbID
                                    ? styles.selected
                                    : ""
                            }`}
                            onClick={() => setSelectedMovie(movie)}
                        >
                            {movie.Title} ({movie.Year})
                        </div>
                    ))}
                </div>

                {/* 2. Actions */}
                <div className={styles.actions}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSubmit} disabled={!selectedMovie}>
                        Add to List
                    </button>
                </div>
            </div>
        </div>
    );
};
