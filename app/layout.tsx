"use cache"

import "../src/styles/index.css"
import {Icon} from "next/dist/lib/metadata/types/metadata-types"
import DrupalWindowSync from "@components/elements/drupal-window-sync"
import UserAnalytics from "@components/elements/user-analytics"
import {twJoin} from "tailwind-merge"
import GlobalPage from "@components/layouts/global-page"
import {getHomePagePath} from "@lib/gql/gql-queries"
import {Source_Sans_3, Source_Serif_4} from "next/font/google"
import localFont from "next/font/local"
import {getRandomGradient} from "@lib/utils/get-random-gradient"

const appleIcons: Icon[] = [60, 72, 76, 114, 120, 144, 152, 180].map(size => ({
  url: `https://www-media.stanford.edu/assets/favicon/apple-touch-icon-${size}x${size}.png`,
  sizes: `${size}x${size}`,
}))

const icons: Icon[] = [16, 32, 96, 128, 192, 196].map(size => ({
  url:
    size === 128
      ? `https://www-media.stanford.edu/assets/favicon/favicon-${size}.png`
      : `https://www-media.stanford.edu/assets/favicon/favicon-${size}x${size}.png`,
  sizes: `${size}x${size}`,
}))

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
  variable: "--font-source-sans",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
  variable: "--font-source-serif",
})

const stanford = localFont({
  src: "../public/fonts/stanford.woff2",
  weight: "300",
  variable: "--font-stanford",
})

/**
 * Metadata that does not change often.
 */
export const metadata = {
  metadataBase: new URL("https://somesite.stanford.edu"),
  icons: {
    icon: [{url: "/favicon.ico"}, ...icons],
    apple: appleIcons,
  },
}

const RootLayout = async ({children, modal}: {children: React.ReactNode; modal: React.ReactNode}) => {
  const homePath = await getHomePagePath()
  const gradient = getRandomGradient()
  return (
    <html lang="en" className={twJoin(sourceSans3.variable, sourceSerif.variable, stanford.variable)}>
      <UserAnalytics />
      <DrupalWindowSync homePath={homePath} />
      <body className={gradient}>
        <nav aria-label="Skip Links">
          <a href="#main-content" className="skiplink">
            Skip to main content
          </a>
        </nav>
        <GlobalPage>{children}</GlobalPage>
        <div>{modal}</div>
      </body>
    </html>
  )
}
export default RootLayout
