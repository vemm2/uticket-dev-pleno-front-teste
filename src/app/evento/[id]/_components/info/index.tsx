import styles from "../../evento.module.css"
import { Event } from "@/types/ticketmaster";
import { formatDate, formatPrice, getEventPrice } from "@/utils/helpers";

interface InfoProps {
    event: Event
}

const Info = ({ event }: InfoProps) => {
    const eventPrice = getEventPrice(event.priceRanges);


    const venue = event._embedded?.venues?.[0];
    return (

        <section className={styles.eventSection}>
            <h2>Informações do Evento</h2>
            <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>📅 Data e Hora</span>
                    <span className={styles.infoValue}>
                        {formatDate(event.dates.start.dateTime || event.dates.start.localDate)}
                    </span>
                </div>

                {venue && (
                    <>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>📍 Local</span>
                            <span className={styles.infoValue}>{venue.name}</span>
                        </div>

                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>🏙️ Cidade</span>
                            <span className={styles.infoValue}>
                                {venue.city?.name}, {venue.state?.stateCode}
                            </span>
                        </div>

                        {venue.address?.line1 && (
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>📮 Endereço</span>
                                <span className={styles.infoValue}>{venue.address.line1}</span>
                            </div>
                        )}
                    </>
                )}

                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>💰 Preço</span>
                    <span className={styles.infoValue}>
                        {eventPrice.min > 0
                            ? `${formatPrice(eventPrice.min)} - ${formatPrice(eventPrice.max)}`
                            : 'Grátis'}
                    </span>
                </div>
            </div>
        </section>


    )
}
export default Info