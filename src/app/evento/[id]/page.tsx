import { getEventById, getPopularEvents } from "@/services/api";
import styles from "./evento.module.css";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import { formatDate, formatPrice, getEventCategories, getEventImage, getEventPrice, getEventStatus } from "@/utils/helpers";
import Hero from "./_components/hero.tsx";
import Info from "./_components/info";
import Countdown from "./_components/countdown";
import Action from "./_components/action";
import { Metadata } from "next";

interface EventoProps {
    params: Promise<{ id: string }>;
}
// gera os params estáticos para a página de eventos
export async function generateStaticParams() {
    try {
        const data = await getPopularEvents();
        const events = data._embedded?.events || [];

        return events.map((event) => ({
            id: String(event.id),
        }));
    } catch (error) {
        console.error("Erro ao gerar params estáticos:", error);
        return [];
    }
}

// gera os metadados para a página de eventos
export async function generateMetadata({ params }: EventoProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const event = await getEventById(id);
        const imageUrl = getEventImage(event.images);
        const eventDate = event.dates?.start?.dateTime ? formatDate(event.dates?.start?.dateTime) : '';

        return {
            title: `${event.name} | EventHub`,
            description: event.info || `Compre ingressos para ${event.name} no dia ${eventDate}.`,
            openGraph: {
                title: event.name,
                description: `Garanta seu lugar para ${event.name}!`,
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: `Pôster do evento ${event.name}`,
                    },
                ],
                type: 'website',
            },
        };
    } catch (error) {
        return {
            title: "Evento não encontrado | EventHub",
            description: "Detalhes do evento não estão disponíveis no momento."
        };
    }
}

// página de eventos
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