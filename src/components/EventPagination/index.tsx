'use client'

import { PageInfo } from "@/types/ticketmaster";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import styles from "./EventPagination.module.css";

interface EventPaginationProps {
    currentPage: number;
    pagination: PageInfo;
}

const EventPagination = ({ currentPage, pagination }: EventPaginationProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());

        router.push(`${pathname}?${params.toString()}`, { scroll: true });
    };
    return (
        <>
            {pagination.totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        className={styles.paginationBtn}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        ← Anterior
                    </button>

                    <span className={styles.paginationInfo}>
                        Página {currentPage + 1} de {pagination.totalPages}
                    </span>

                    <button
                        className={styles.paginationBtn}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= pagination.totalPages - 1}
                    >
                        Próxima →
                    </button>
                </div>
            )}
        </>
    )
}

export default EventPagination