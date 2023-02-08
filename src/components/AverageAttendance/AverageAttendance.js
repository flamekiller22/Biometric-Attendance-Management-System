import { getSession } from 'next-auth/react';
import styles from './averageAttendance.module.scss';

export default function AverageAttendance({ attendance }) {
  return (
    <div className={styles.averageAttendance}>
        <div className={styles.averageAttendanceContainer}>
            <div className={styles.heading}>
                <h3>Average Attendance</h3>
            </div>
            <div className={styles.body}>
                <h2 style={{ color: attendance === '-' ? 'black' : attendance > 75 ? 'forestgreen' : 'red' }}>{attendance}</h2>
                <h5>Reload page for updates</h5>
            </div>
        </div>
    </div>
  )
}