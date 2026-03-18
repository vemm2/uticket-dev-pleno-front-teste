import { Event } from "@/types/ticketmaster";
import { getEventCategories, getEventImage, getEventStatus } from "@/utils/helpers";
import Image from "next/image";
import styles from "../../evento.module.css"
interface HeroProps {
    event: Event
}

const Hero = ({ event }: HeroProps) => {
    const eventImage = getEventImage(event.images);
    const categories = getEventCategories(event.classifications);
    const eventStatus = getEventStatus(event);
    return (
        <header className={styles.eventHero}>
            <Image
                width={1920}
                height={1080}
                src={eventImage}
                alt={event.name}
                className={styles.eventHeroImage}
            />
            <div className={styles.eventHeroOverlay}>
                <div className={styles.eventHeroContent}>
                    <div className={styles.eventCategories}>
                        {categories.map((cat, index) => (
                            <span key={index} className={styles.categoryTag}>{cat}</span>
                        ))}
                    </div>
                    <h1 className={styles.eventTitle}>{event.name}</h1>
                    <span className={`${styles.statusBadge} ${styles[`status${eventStatus.replace(/\s/g, '')}`] || ''}`}>
                        {eventStatus}
                    </span>
                </div>
            </div>

        </header>
    )
}

export default Hero