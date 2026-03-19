"use client"

import Link from 'next/link'
import { useSavedEvents } from '@/store/useSavedEvents';
import styles from './Navbar.module.css'
import { usePathname } from 'next/navigation';

const Navbar = () => {

    const savedCount = useSavedEvents((state) => state.savedEvents.length);
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? styles.active : '';
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <Link href="/" className={styles.navbarLogo}>
                    🎉 EventHub
                </Link>

                <ul className={styles.navbarMenu}>
                    <li>
                        <Link href="/" className={`${styles.navbarLink} ${isActive('/')}`}>
                            Início
                        </Link>
                    </li>
                    <li>
                        <Link href="/buscar" className={`${styles.navbarLink} ${isActive('/buscar')}`}>
                            Buscar Eventos
                        </Link>
                    </li>
                    <li>
                        <Link href="/salvos" className={`${styles.navbarLink} ${isActive('/salvos')}`}>
                            Meus Eventos
                            {savedCount > 0 && (
                                <span className={styles.badge}>{savedCount}</span>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;