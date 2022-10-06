import styles from './recentTransactions.module.scss'

const Transaction = (data) => (
    <div className={styles.transaction}>
        <div className={styles.transactionContainer}>
            <div className={styles.transactionInfo}>
                CRCL Mess VIT Bhopal
            </div>
            <div className={styles.transactionAmount}>
                -100.00
            </div>
        </div>
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
                <div className={styles.transactionsContainer}>
                    <Transaction />
                    <Transaction />
                    <Transaction />
                    <Transaction />
                    <Transaction />
                    <Transaction />
                </div>
                <h5>Reload page for updates</h5>
            </div>
        </div>
    </div>
  )
}
