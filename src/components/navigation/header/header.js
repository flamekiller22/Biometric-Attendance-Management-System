import styles from './header.module.scss'

export default function SiteHeader() {
  return (
    <header className={styles.header}>
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <p>Cyber<span>Pe</span></p>
            </div>
            <div className={styles.right}>
                <p>
                    Log Out
                    <i className='fa fa-sign-out' />
                </p>
            </div>
        </div>
    </header>
  )
}
