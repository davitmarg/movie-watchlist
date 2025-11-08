import type { Movie } from "../../../App/types";
import styles from "./MovieItem.module.css";
import { FaCheckCircle } from "react-icons/fa";

interface MovieItemProps {
    movie: Movie;
    onRemove: () => void;
}

export function MovieItem({ movie, onRemove }: MovieItemProps) {
    return (
        <div className={styles.movieItem}>
            <img
                src={movie.Poster}
                alt={movie.Title}
                className={styles.poster}
            />
            <div className={styles.info}>
                <span className={styles.title}>{movie.Title}</span>
                <span className={styles.year}>{movie.Year}</span>
            </div>
            <button className={styles.watchedButton} onClick={onRemove}>
                <FaCheckCircle title="Mark as watched" />
            </button>
        </div>
    );
}
