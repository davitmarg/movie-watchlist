import React from "react";
import type { MovieList } from "../../App/types";
import { MovieItem } from "./MovieItem";
import styles from "./List.module.css";

interface ListProps {
    list: MovieList;
    onRemoveMovie: (movieId: string) => void;
}

export const List: React.FC<ListProps> = ({ list, onRemoveMovie }) => {
    return (
        <div className={styles.list}>
            <h1 className={styles.name}>{list.name}</h1>

            <div className={styles.movieContainer}>
                {list.movies.length === 0 ? (
                    <p className={styles.emptyMovies}>
                        Add movies using the button below!
                    </p>
                ) : (
                    list.movies.map((movie) => (
                        <MovieItem
                            key={movie.imdbID}
                            movie={movie}
                            onRemove={() => onRemoveMovie(movie.imdbID)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
