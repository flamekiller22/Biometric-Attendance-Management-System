import styles from './recentTransactions.module.scss'

const Transaction = (data) => (
    <div className={styles.transaction}>
        
    </div>
)

export default function RecentTransactions() {
  return (
    <div className={styles.recentTransactions}>
        <div className={styles.recentTransactionsContainer}>
            <div className={styles.heading}>
                <h3>Recent Transactions</h3>
            </div>
            <div className={styles.body}>
                <Transaction data={} />
            </div>
        </div>
    </div>
  )
}
