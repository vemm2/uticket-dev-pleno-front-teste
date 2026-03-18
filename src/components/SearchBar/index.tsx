'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './SeachBar.module.css';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface SearchBarProps {
    initialValue?: string;
}

export default function SearchBar({ initialValue = '' }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState(initialValue)

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const currentQuery = searchParams.get('q') || '';
        if (searchTerm === currentQuery) return;

        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (searchTerm) {
                params.set('q', searchTerm);
            } else {
                params.delete('q');
            }

            params.delete('page');

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, searchParams, pathname, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        searchTerm ? params.set('q', searchTerm) : params.delete('q');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };


    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <div className={styles.searchInputContainer}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar eventos por nome, artista, local..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Buscar eventos"
                />
                {searchTerm && (
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={() => setSearchTerm('')}
                        aria-label="Limpar busca"
                    >
                        ✕
                    </button>
                )}
            </div>
        </form>
    )
}