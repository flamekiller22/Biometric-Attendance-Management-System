import styles from './addFunds.module.scss'

export default function AddFunds() {
  return (
    <div className={styles.addFunds}>
        <div className={styles.addFundsContainer}>
            <div className={styles.heading}>
                <h3>Add Funds</h3>
            </div>
            <div className={styles.body}>
                <h2>100</h2>
                <h5>Reload page for updates</h5>
            </div>
        </div>
    </div>
  )
}
