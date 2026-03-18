import { ticketmasterApi } from "@/services/api";
import styles from "./buscar.module.css";
import SearchBar from "@/components/SearchBar";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import { formatToISODate } from "@/utils/helpers";
import EventPagination from "@/components/EventPagination";

interface BuscarPageProps {
    searchParams: Promise<{
        q?: string;
        city?: string;
        page?: string;
        startDate?: string;
        endDate?: string;
        category?: string;
    }>;
}

export default async function BuscarPage({ searchParams }: BuscarPageProps) {
    const { q: query = '', city = '', page = '0', startDate = '', endDate = '', category = '' } = await searchParams;

    const data = await ticketmasterApi.searchEvents({
        keyword: query,
        city: city,
        page: parseInt(page),
        startDate: formatToISODate(startDate),
        endDate: formatToISODate(endDate, true),
        category: category,
    });
    const events = data._embedded?.events || [];
    const pagination = data.page;
    return (
        <main className={styles.searchPage}>
            <header className={styles.searchHeader}>
                <h1>Buscar Eventos</h1>
                <SearchBar initialValue={query} />
            </header>

            <EventFilters />
            <div className={styles.searchResultsInfo}>
                {pagination.totalElements > 0 ? (
                    <p>
                        Encontrados <strong>{pagination.totalElements}</strong> eventos
                        {query && ` para "${query}"`}
                    </p>
                ) : (
                    <p>Nenhum evento encontrado. Tente ajustar os filtros.</p>
                )}
            </div>
            <div className="events-grid">
                {events.length > 0 ? events.map(event => (
                    <EventCard key={event.id} event={event} />
                )) : (
                    <div className={styles.emptyState}>
                        <p>Nenhum evento encontrado</p>
                    </div>
                )}
            </div>
            <EventPagination currentPage={parseInt(page)} pagination={pagination} />
        </main>
    )
}