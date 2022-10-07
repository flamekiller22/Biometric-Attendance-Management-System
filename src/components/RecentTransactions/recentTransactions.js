import styles from './recentTransactions.module.scss'

const Transaction = ({ data }) => (
    <div className={styles.transaction}>
        <div className={styles.transactionContainer}>
            <div className={styles.transactionInfo}>
                {data.store_id === 'VITBPL' ? 'Add Funds' : data.store_id}
            </div>
            <div className={styles.transactionAmount}>
                {data.trn_type === 'Payment' ? '-' : '+'}{data.amount}
            </div>
        </div>
    </div>
)

export default function RecentTransactions({ tranhist }) {
  return (
    <div className={styles.recentTransactions}>
        <div className={styles.recentTransactionsContainer}>
            <div className={styles.heading}>
                <h3>Recent Transactions</h3>
            </div>
            <div className={styles.body}>
                <div className={styles.transactionsContainer}>
                    {tranhist.length > 0 && tranhist.map(transaction => <Transaction key={transaction.trn_id} data={transaction} />)}
                    {tranhist.length === 0 && <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-45%, -50%)', fontSize: '2rem' }}>None</p>}
                </div>
                <h5>Reload page for updates</h5>
            </div>
        </div>
    </div>
  )
}
