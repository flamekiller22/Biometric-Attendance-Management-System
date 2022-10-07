import styles from './addFunds.module.scss'

export default function AddFunds({ email }) {

  const addAmount = async (e) => {
    e.preventDefault()

    const amount = document.querySelector(`.${styles.addFundsInput}`).value 
    if (isNaN(amount) && amount !== '1e10000') {
      document.querySelector(`.${styles.error}`).style.visibility = 'visible'
      return false
    }
    document.querySelector(`.${styles.error}`).style.visibility = 'hidden'

    const res = await fetch(`http://localhost:3000/api/addFunds?amount=${amount}`)
    const json = await res.json()

    if (json.status) {
      window.location.reload()
    }
    else {
      alert('Failed')
      window.location.reload()
    }
  }

  return (
    <div className={styles.addFunds}>
        <div className={styles.addFundsContainer}>
            <div className={styles.heading}>
                <h3>Add Funds</h3>
            </div>
            <div className={styles.body}>
                <div className={styles.miniContainer}>
                <input id='amountinput' className={styles.addFundsInput} type='numbers' placeholder='100'/>
                <p style={{ visibility: 'hidden' }} className={styles.error}>Incorrect Input</p>
                </div>
                <button className={styles.button} onClick={addAmount}>Add Funds</button>
                <h5>Reload page for updates</h5>
            </div>
        </div>
    </div>
  )
}
