import { getSession } from 'next-auth/react';
import styles from './currentfunds.module.scss';

export default function CurrentFunds({ balance }) {
  return (
    <div className={styles.currentFunds}>
        <div className={styles.currentFundsContainer}>
            <div className={styles.heading}>
                <h3>Current Funds</h3>
            </div>
            <div className={styles.body}>
                <h2>{balance}</h2>
                <h5>Reload page for updates</h5>
            </div>
        </div>
    </div>
  )
}