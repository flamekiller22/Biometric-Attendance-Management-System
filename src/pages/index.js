import Head from 'next/head'
import CurrentFunds from '../components/CurrentFunds/currentfunds'
import SiteHeader from '../components/navigation/header/header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>CyberPe - Chalo bhid kam kare</title>
        <meta name="description" content="Bringing forth a solution to the huge waiting lines everywhere on VIT Bhopals campus cuz UPI payments take forever." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css" integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY=" crossOrigin="anonymous"></link>
      </Head>

      <SiteHeader />
      <div className='main'>
        <div className='currentfunds'>
          <CurrentFunds />
        </div>
        <div className='currentfunds'>
          <CurrentFunds />
        </div>
      </div>
    </div>
  )
}
