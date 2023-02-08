// import { unstable_getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]'
import Head from 'next/head'
import AverageAttendance from '../components/AverageAttendance/AverageAttendance'
import SiteHeader from '../components/navigation/header/header'
import AllClasses from '../components/AllClases/AllClasses'
import { getSession } from 'next-auth/react'
import { readFileSync } from 'fs';

export default function Home({ name, attendance, attendanceHistory }) {
  return (
    <div>
      <Head>
        <title>VIT Bhopal</title>
        <meta name="description" content="Bringing forth a solution to the huge waiting lines everywhere on VIT Bhopals campus cuz UPI payments take forever." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css" integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY=" crossOrigin="anonymous"></link>
      </Head>

      <SiteHeader />
      <div className='welcome'>
        <p>Welcome, {name}</p>
      </div>
      <div className='main-1'>
        <div className='currentfunds'>
          <AverageAttendance attendance={attendance.average} />
        </div>
        {/* <div className='currentfunds'>
          <RecentTransactions tranhist={tranhist} />
        </div> */}
      </div>
      <div className='main-2'>
        <div className='addfunds'>
          {/* <AddFunds email={email} /> */}
          <AllClasses attendanceHistory={attendanceHistory} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/signin?error=SessionRequired'
      }
    };
  }

  const email = session.user.email
  const name = session.user.name
  let rollno

  if (email === 'dbharath2204d@gmail.com') rollno = '21BCY10043'
  else rollno = '21BCY10021'
  const data = readFileSync(`src/components/Data/${rollno}.json`)
  const json = JSON.parse(data)
  const attendanceHistory = json.classes;
  attendanceHistory.map((c) => {
    if (c.total_classes === 0) return c.attendance_percentage = '-'
    return c.attendance_percentage = Math.round((parseInt(c.attended_classes) / parseInt(c.total_classes)) * 100)
  })
  let count = 0;
  let total = 0;
  for (let c of attendanceHistory) {
    if (c.attendance_percentage === '-') continue
    total += c.attendance_percentage;
    count += 1;
  }
  if (total === 0) total = '-'
  else total = Math.round(total / count)
  const attendance = { average: total }

  // const balance = await fetch(`http://127.0.0.1:5000/check-balance?email=${email}`).then(res => res.json())
  // const tranhist = await fetch(`http://127.0.0.1:5000/transaction-history?email=${email}`).then(res => res.json())

  // const attendance = { average: 78 }
  // const attendanceHistory = [
  //   {
  //     class_id: 1,
  //     class_name: 'DLD',
  //     attendance_percentage: 76
  //   },
  //   {
  //     class_id: 2,
  //     class_name: 'Math',
  //     attendance_percentage: 78
  //   },
  //   {
  //     class_id: 3,
  //     class_name: 'ECE',
  //     attendance_percentage: 80
  //   },
  //   {
  //     class_id: 4,
  //     class_name: 'English',
  //     attendance_percentage: 76
  //   },
  //   {
  //     class_id: 5,
  //     class_name: 'Forensics',
  //     attendance_percentage: 80
  //   },
  // ]

  return {
    props: {
      name,
      email,
      attendance,
      attendanceHistory
    },
  };
}
