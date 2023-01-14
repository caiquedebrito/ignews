import Header from "../components/Header"

import { SessionProvider } from "next-auth/react"
import { PrismicProvider } from "@prismicio/react"
import { PrismicPreview } from "@prismicio/next"
import { repositoryName } from "../../prismicio"

import "../styles/global.scss"
import Link from "next/link"

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <PrismicProvider
        internalLinkComponent={({ href, ...props }) => (
          <Link href={href}>
            <a {...props} />
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <Header />
          <Component {...pageProps} />

        </PrismicPreview>

      </PrismicProvider>
    </SessionProvider>
  )
}

export default MyApp
