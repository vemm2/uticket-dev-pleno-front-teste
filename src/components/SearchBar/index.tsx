'use client';

import React, { useState, useEffect, useRef } from 'react';
import { debounce } from '@/utils/helpers';
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

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        term ? params.set('q', term) : params.delete('q');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    const debouncedSearchRef = useRef(
        debounce((term: string) => {
            handleSearch(term);
        }, 500)
    );
    useEffect(() => {
        debouncedSearchRef.current(searchTerm);
    }, [searchTerm]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm('');
        handleSearch('');
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
                        onClick={handleClear}
                        aria-label="Limpar busca"
                    >
                        ✕
                    </button>
                )}
            </div>
        </form>
    )
}