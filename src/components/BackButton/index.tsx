'use client'

import styles from "./BackButton.module.css";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter()
    return (
        <button onClick={() => router.back()} className={styles.backButton}>
            ← Voltar
        </button>
    )
}

export default BackButton