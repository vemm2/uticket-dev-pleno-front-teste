'use client'


import { getCountdown } from "@/utils/helpers";
import { useEffect, useState } from "react";
import styles from "../../evento.module.css"


interface CountdownProps {
    targetDate: string;
    status: string;
}
const Countdown = ({ targetDate, status }: CountdownProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [countdown, setCountdown] = useState(() => getCountdown(targetDate));

    useEffect(() => {
        setIsMounted(true);
        const interval = setInterval(() => {
            setCountdown(getCountdown(targetDate));
        }, 60000);

        return () => clearInterval(interval);
    }, [targetDate]);

    if (!isMounted || countdown.expired) {
        return null;
    }

    return (
        <section className={`${styles.eventSection} ${styles.countdownSection}`}>
            <h2>Tempo até o evento</h2>
            <div className={styles.countdown}>
                <div className={styles.countdownItem}>
                    <span className={styles.countdownValue}>{countdown.days}</span>
                    <span className={styles.countdownLabel}>dias</span>
                </div>
                <div className={styles.countdownItem}>
                    <span className={styles.countdownValue}>{countdown.hours}</span>
                    <span className={styles.countdownLabel}>horas</span>
                </div>
                <div className={styles.countdownItem}>
                    <span className={styles.countdownValue}>{countdown.minutes}</span>
                    <span className={styles.countdownLabel}>minutos</span>
                </div>
            </div>
        </section>
    )
}
export default Countdown