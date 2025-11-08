import React from "react";
import styles from "./Controls.module.css";

interface ControlsProps {
    onAddMovieClick: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onAddMovieClick }) => {
    return (
        <div className={styles.controls}>
            <button
                className={`${styles.button} ${styles.primary}`}
                onClick={onAddMovieClick}
            >
                Add a Movie
            </button>
        </div>
    );
};
