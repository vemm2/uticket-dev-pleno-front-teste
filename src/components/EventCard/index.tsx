'use client';
import Link from 'next/link';
import { Event } from '@/types/ticketmaster'
import { useToggleSave } from "@/hooks/useTooggleSave";
import {
    formatDate,
    formatPrice,
    getEventImage,
    getEventPrice,
    getEventStatus
} from '@/utils/helpers';
import styles from './EventCard.module.css'
import { useSavedEvents } from '@/store/useSavedEvents';
import { useEffect, useState } from 'react';
interface EventCardProps {
    event: Event
}
const EventCard = ({ event }: EventCardProps) => {
    const [isMounted, setIsMounted] = useState(false);

    const { handleSaveToggle } = useToggleSave(event);
    const { isEventSaved } = useSavedEvents();
    const isSaved = isEventSaved(event?.id);

    const eventImage = getEventImage(event.images);
    const eventPrice = getEventPrice(event.priceRanges);
    const eventStatus = getEventStatus(event);
    const venue = event._embedded?.venues?.[0];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Link href={`/evento/${event.id}`} className={styles.eventCard}>
            <div className={styles.eventCardImageContainer}>
                <img
                    src={eventImage}
                    alt={event.name}
                    className={styles.eventCardImage}
                    loading="lazy"
                />
                <button
                    className={`${styles.saveButton} ${isMounted && isSaved ? styles.saved : ''}`}
                    onClick={handleSaveToggle}
                    aria-label={isMounted && isSaved ? 'Remover dos favoritos' : 'Salvar evento'}
                >
                    {isMounted && isSaved ? '❤️' : '🤍'}
                </button>
                <span className={`${styles.statusBadge} ${styles[`status${eventStatus.replace(/\s/g, '')}`] || ''}`}>
                    {eventStatus}
                </span>
            </div>

            <div className={styles.eventCardContent}>
                <h3 className={styles.eventCardTitle}>{event.name}</h3>

                <div className={styles.eventCardInfo}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}>📅</span>
                        <span className={styles.infoText}>
                            {formatDate(event.dates.start.dateTime || event.dates.start.localDate)}
                        </span>
                    </div>

                    {venue && (
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>📍</span>
                            <span className={styles.infoText}>
                                {venue.city?.name}, {venue.state?.stateCode}
                            </span>
                        </div>
                    )}

                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}>💰</span>
                        <span className={styles.infoText}>
                            {eventPrice.min > 0
                                ? `${formatPrice(eventPrice.min)} - ${formatPrice(eventPrice.max)}`
                                : 'Grátis'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;