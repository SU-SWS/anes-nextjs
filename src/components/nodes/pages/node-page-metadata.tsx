import {getConfigPageField} from "@lib/gql/gql-queries"
import {Image, StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import {JSX} from "react"
import {OpenGraphType} from "next/dist/lib/metadata/types/opengraph-types"

type Props = {
  /**
   * Page title without the site name, undefined if the home page.
   */
  pageTitle?: string
  /**
   * Short description of the page.
   */
  description?: string
  /**
   * Drupal image.
   */
  image?: false | Image
  /**
   * Additional meta data if desired.
   */
  children?: JSX.Element | JSX.Element[]
  /**
   * Page type.
   */
  ogType?: OpenGraphType
  /**
   * Twitter card style.
   */
  twitterCard?: "summary" | "summary_large_image" | "app" | "player"
}

const NodePageMetadata = async ({
  pageTitle,
  description,
  image,
  ogType = "website",
  twitterCard = "summary_large_image",
  children,
}: Props) => {
  const siteName =
    (await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suSiteName"]>(
      "StanfordBasicSiteSetting",
      "suSiteName"
    )) || "Stanford University"

  const title = pageTitle ? `${pageTitle} | ${siteName}` : siteName

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />

      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}

      {image && (
        <>
          <meta property="og:image" content={image.url} />
          <meta property="og:image:width" content={image.width.toString()} />
          <meta property="og:image:height" content={image.height.toString()} />
          {image.alt && <meta property="og:image:alt" content={image.alt} />}

          <meta name="twitter:image" content={image.url} />
          <meta name="twitter:image:width" content={image.width.toString()} />
          <meta name="twitter:image:height" content={image.height.toString()} />
          {image.alt && <meta name="twitter:image:alt" content={image.alt} />}
        </>
      )}

      {children}
    </>
  )
}
export default NodePageMetadata
