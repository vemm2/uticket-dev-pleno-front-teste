'use client';
import Link from 'next/link';
import React from 'react'
import { Event } from '@/types/ticketmaster'
import {
    formatDate,
    formatPrice,
    getEventImage,
    getEventPrice,
    getEventStatus
} from '@/utils/helpers';
import styles from './EventCard.module.css'
import { useSavedEvents } from '@/store/useSavedEvents';
interface EventCardProps {
    event: Event
}
const EventCard = ({ event }: EventCardProps) => {
    const { saveEvent, removeEvent, isEventSaved } = useSavedEvents();
    const isSaved = isEventSaved(event?.id);

    const eventImage = getEventImage(event.images);
    const eventPrice = getEventPrice(event.priceRanges);
    const eventStatus = getEventStatus(event);
    const venue = event._embedded?.venues?.[0];

    const handleSaveToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (isSaved) {
            removeEvent(event.id);
        } else {
            const result = saveEvent(event);
            if (!result.success) {
                alert(result.message);
            }
        }
    };

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
                    className={`${styles.saveButton} ${isSaved ? styles.saved : ''}`}
                    onClick={handleSaveToggle}
                    aria-label={isSaved ? 'Remover dos favoritos' : 'Salvar evento'}
                >
                    {isSaved ? '❤️' : '🤍'}
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