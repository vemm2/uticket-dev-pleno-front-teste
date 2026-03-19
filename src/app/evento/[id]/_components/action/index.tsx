'use client'

import { Event } from "@/types/ticketmaster";
import { useToggleSave } from "@/hooks/useTooggleSave";
import styles from "../../evento.module.css"
interface ActionProps {
    event: Event;
    isSaved: boolean;
}

const Action = ({ event, isSaved }: ActionProps) => {
    const { handleSaveToggle } = useToggleSave(event);
    return (
        <div className={styles.actionCard}>
            <button
                className={`${styles.saveButtonLarge} ${isSaved ? styles.saved : ''}`}
                onClick={handleSaveToggle}
            >
                {isSaved ? '❤️ Salvo nos favoritos' : '🤍 Salvar evento'}
            </button>

            {event.url && (
                <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.buyButton}
                >
                    🎫 Comprar ingressos
                </a>
            )}
        </div>
    )
}
export default Action