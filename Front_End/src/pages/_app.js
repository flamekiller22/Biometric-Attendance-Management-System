import { SessionProvider } from "next-auth/react"
import styles from '../styles/globals.css'

export default function App({
  Component, session, pageProps,
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
