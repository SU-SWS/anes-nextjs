import Rows from "@components/paragraphs/rows/rows"
import {notFound} from "next/navigation"
import {getEntityFromPath} from "@lib/gql/gql-queries"
import {NodeStanfordPage} from "@lib/gql/__generated__/drupal.d"
import {isPreviewMode} from "@lib/drupal/is-preview-mode"
import BannerParagraph from "@components/paragraphs/stanford-banner/banner-paragraph"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false
export const dynamic = "force-static"
// https://vercel.com/docs/functions/runtimes#max-duration
export const maxDuration = 30

const Home = async () => {
  const {entity} = await getEntityFromPath<NodeStanfordPage>("/", isPreviewMode())
  if (!entity) notFound()

  return (
    <article>
      <NodePageMetadata pageTitle={undefined} metatags={entity.metatag} />
      {entity.suPageBanner?.__typename === "ParagraphStanfordBanner" && (
        <header>
          <BannerParagraph paragraph={entity.suPageBanner} eagerLoadImage />
        </header>
      )}
      {entity.suPageComponents && <Rows components={entity.suPageComponents} />}
    </article>
  )
}

export default Home
