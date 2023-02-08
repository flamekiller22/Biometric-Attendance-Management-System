import styles from './allClasses.module.scss'

const Class = ({ data, keyprop }) => (
    <div key={keyprop} className={styles.class}>
        <div className={styles.classContainer}>
            <div className={styles.classInfo}>
                {data.class_name}
            </div>
            <div className={styles.classAttendance}>
                <span>{data.attended_classes}</span>
                <span>{data.total_classes}</span>
                <span style={{ color: data.attendance_percentage === '-' ? 'black' : data.attendance_percentage > 75 ? 'forestgreen' : 'red' }}>{data.attendance_percentage}%</span>
            </div>
        </div>
    </div>
)

export default function AllClasses({ attendanceHistory }) {
  return (
    <div className={styles.allClasses}>
        <div className={styles.allClassesContainer}>
            <div className={styles.heading}>
                <h3>Your classes</h3>
            </div>
            <div className={styles.body}>
                <div className={styles.classesContainer}>
                    <div className={styles.class}>
                        <div className={styles.classContainer}>
                            <div className={styles.classInfo}>
                                <strong>Class Name</strong>
                            </div>
                            <div className={styles.classAttendance}>
                                <span><strong>Attended</strong></span>
                                <span><strong>Total</strong></span>
                                <span><strong>~%</strong></span>
                            </div>
                        </div>
                    </div>
                    {attendanceHistory.length > 0 && attendanceHistory.map(transaction => <Class key={transaction.class_id} keyprop={transaction.class_id} data={transaction} />)}
                    {attendanceHistory.length === 0 && <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-45%, -50%)', fontSize: '2rem' }}>None</p>}
                </div>
                <h5>Reload page for updates</h5>
            </div>
        </div>
    </div>
  )
}
