// import { unstable_getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]'
import Head from 'next/head'
import AddFunds from '../components/AddFunds/addFunds'
import CurrentFunds from '../components/CurrentFunds/currentfunds'
import SiteHeader from '../components/navigation/header/header'
import RecentTransactions from '../components/RecentTransactions/recentTransactions'
import { getSession } from 'next-auth/react'

export default function Home({ name, email, balance, tranhist }) {
  return (
    <div>
      <Head>
        <title>CyberPe - Chalo bhid kam kare</title>
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
          <CurrentFunds balance={balance.balance} />
        </div>
        <div className='currentfunds'>
          <RecentTransactions tranhist={tranhist.history} />
        </div>
      </div>
      <div className='main-2'>
        <div className='addfunds'>
          <AddFunds email={email} />
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

  const email = await session.user.email
  const name = await session.user.name

  const balance = await fetch(`http://127.0.0.1:5000/check-balance?email=${email}`).then(res => res.json())
  const tranhist = await fetch(`http://127.0.0.1:5000/transaction-history?email=${email}`).then(res => res.json())

  return {
    props: {
      name,
      email,
      balance,
      tranhist
    },
  };
}
