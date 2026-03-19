'use client'
import { BRAZILIAN_CITIES, CATEGORIES } from "@/constants/eventFilters";
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import styles from "./EventFilters.module.css"

const EventFilters = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const getParam = (key: string) => searchParams.get(key) || '';

    const updateQuery = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(name, value)
        } else {
            params.delete(name)
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const handleReset = () => {
        const query = searchParams.get('q')

        const newParams = new URLSearchParams()

        if (query) newParams.set('q', query)

        router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
    }
    // verificar sobre startDate e endDate
    const hasFilters = searchParams.has('city') || searchParams.has('startDate') || searchParams.has('endDate') || searchParams.has('category')

    return (
        <div className={styles.eventFilters}>
            <div className={styles.filtersHeader}>
                <button className={styles.toggleFiltersBtn} onClick={() => setIsOpen(!isOpen)}>
                    <span className={styles.iconWrapper}>
                        {isOpen ? '▼' : '▶'}
                    </span>
                    Filtros
                    {hasFilters && <span className={styles.activeIndicator}>•</span>}
                </button>
                {hasFilters && (
                    <button className={styles.resetFiltersBtn} onClick={handleReset}>
                        Limpar tudo
                    </button>
                )}
            </div>

            {isOpen && (
                <div className={styles.filtersContent}>
                    <div className={styles.filterGroup}>
                        <label>Cidade</label>
                        <select
                            value={searchParams.get('city') || ''}
                            onChange={(e) => updateQuery('city', e.target.value)}
                        >
                            {BRAZILIAN_CITIES.map(city => <option key={city.value} value={city.value}>{city.label}</option>)}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Categoria</label>
                        <select
                            value={searchParams.get('category') || ''}
                            onChange={(e) => updateQuery('category', e.target.value)}
                        >
                            {CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                        </select>
                    </div>

                    {/* Datas */}
                    <div className={styles.filterGroup}>
                        <label htmlFor={styles.startDateFilter}>Data início</label>
                        <input
                            id='startDateFilter'
                            type="date"
                            value={getParam('startDate')}
                            onChange={(e) => updateQuery('startDate', e.target.value)}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <label htmlFor={styles.endDateFilter}>Data fim</label>
                        <input
                            id='endDateFilter'
                            type="date"
                            value={getParam('endDate')}
                            onChange={(e) => updateQuery('endDate', e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventFilters