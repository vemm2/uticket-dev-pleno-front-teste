import { getEventById } from "@/services/api";
import styles from "./evento.module.css";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import { formatDate, formatPrice, getEventCategories, getEventImage, getEventPrice, getEventStatus } from "@/utils/helpers";
import Hero from "./_components/hero.tsx";
import Info from "./_components/info";
import Countdown from "./_components/countdown";
import Action from "./_components/action";

interface EventoProps {
    params: Promise<{ id: string }>;
}

const EventoPage = async ({ params }: EventoProps) => {
    const { id } = await params
    const event = await getEventById(id)




    return (
        <main className={styles.eventDetailsPage}>
            <BackButton />
            <Hero event={event} />
            <div className={styles.eventContent}>
                <div className={styles.eventMain}>
                    <Info event={event} />
                    <Countdown targetDate={event.dates.start.dateTime || event.dates.start.localDate} status={event.dates.status.code} />
                    {/* Event info */}
                    {event.info && (
                        <section className={styles.eventSection}>
                            <h2>Sobre o Evento</h2>
                            <p className={styles.eventDescription}>{event.info}</p>
                        </section>
                    )}
                    {/* Event important notes */}
                    {event.pleaseNote && (
                        <section className={styles.eventSection}>
                            <h2>Informações Importantes</h2>
                            <p className={styles.eventNote}>{event.pleaseNote}</p>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className={styles.eventSidebar}>
                    <Action event={event} isSaved={false} />

                    {/* Sidebar Seatmap */}

                    {event.seatmap?.staticUrl && (
                        <div className={styles.seatmapCard}>
                            <h3>Mapa de Assentos</h3>
                            <Image
                                src={event.seatmap.staticUrl}
                                alt="Mapa de assentos"
                                className={styles.seatmapImage}
                                width={352}
                                height={264.5}
                            />
                        </div>
                    )}

                </div>
            </div>
        </main >
    )
}

export default EventoPage