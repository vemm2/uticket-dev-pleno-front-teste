'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSavedEvents } from '@/store/useSavedEvents';
import EventCard from '@/components/EventCard';
import styles from './salvos.module.css';

export default function SavedEventsPage() {
    const { savedEvents, clearSavedEvents, maxEvents, getRemainingSlots } = useSavedEvents();

    const remainingSlots = getRemainingSlots();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleClearAll = () => {
        if (window.confirm('Tem certeza que deseja remover todos os eventos salvos?')) {
            clearSavedEvents();
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className={styles.savedEventsPage}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Meus Eventos</h1>
                    <p className={styles.pageSubtitle}>
                        {savedEvents.length} de {maxEvents} eventos salvos
                        {remainingSlots > 0 && ` • ${remainingSlots} ${remainingSlots === 1 ? 'vaga disponível' : 'vagas disponíveis'}`}
                    </p>
                </div>

                {savedEvents.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        className={styles.clearAllButton}
                    >
                        Limpar todos
                    </button>
                )}
            </div>

            {savedEvents.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>❤️</div>
                    <h2>Nenhum evento salvo ainda</h2>
                    <p>
                        Explore eventos e salve seus favoritos para encontrá-los facilmente aqui.
                    </p>
                    <Link href="/buscar" className={styles.exploreButton}>
                        Explorar Eventos
                    </Link>
                </div>
            ) : (
                <>
                    <div className={styles.savedInfo}>
                        <p>
                            💡 <strong>Dica:</strong> Você pode salvar até {maxEvents} eventos.
                            Clique no ❤️ nos cards para gerenciar seus favoritos.
                        </p>
                    </div>

                    <div className="events-grid">
                        {savedEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}