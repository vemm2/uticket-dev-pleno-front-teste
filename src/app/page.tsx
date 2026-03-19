import Link from 'next/link';
import EventCard from '../components/EventCard';

import styles from './page.module.css';
import { getPopularEvents } from '@/services/api';

const HomePage = async () => {
  const data = await getPopularEvents()
  const events = data._embedded?.events || []

  return (
    <main className={styles.homePage}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Descubra eventos incríveis perto de você</h1>
          <p className={styles.heroSubtitle}>Encontre shows, festivais, esportes e muito mais</p>
          <Link href="/buscar" className={styles.heroCta}>
            Explorar Eventos
          </Link>
        </div>
      </section>
      <section className={styles.eventsSection}>
        <div className={styles.sectionHeader}>
          <h2>Eventos Populares</h2>
          <Link href="/buscar" className={styles.seeAllLink}>
            Ver todos →
          </Link>
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
      </section>
      <section className={styles.featuresSection}>
        <h2>Por que usar o EventHub?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎫</span>
            <h3>Variedade de Eventos</h3>
            <p>Shows, esportes, teatro e muito mais em um só lugar</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>📍</span>
            <h3>Eventos Locais</h3>
            <p>Descubra o que está acontecendo na sua cidade</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>❤️</span>
            <h3>Salve Favoritos</h3>
            <p>Guarde seus eventos preferidos para não perder</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🔔</span>
            <h3>Fácil de Usar</h3>
            <p>Interface simples e intuitiva para encontrar eventos</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;