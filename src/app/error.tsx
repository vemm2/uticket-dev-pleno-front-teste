'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import styles from './error.module.css';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    return (
        <div className={styles.container}>
            <div className={styles.content}>


                <h2 className={styles.title}>Ops! Algo deu errado.</h2>
                <p className={styles.description}>
                    Não foi possível carregar o conteúdo solicitado. Por favor, tente novamente.
                </p>

                <button
                    className={styles.button}
                    onClick={() => reset()}
                    aria-label="Tentar carregar a página novamente"
                >
                    Tentar novamente
                </button>
            </div>
        </div>
    );
}