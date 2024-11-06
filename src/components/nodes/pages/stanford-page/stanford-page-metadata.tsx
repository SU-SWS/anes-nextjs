import {NodeStanfordPage} from "@lib/gql/__generated__/drupal.d"
import {getFirstText} from "@lib/utils/text-tools"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

type Props = {
  node: NodeStanfordPage
  isHome?: true
}
const StanfordPageMetadata = ({node, isHome}: Props) => {
  const pageTitleBannerImage =
    node.suPageBanner?.__typename === "ParagraphStanfordPageTitleBanner" &&
    node.suPageBanner.suTitleBannerImage.mediaImage
  const bannerImage =
    node.suPageBanner?.__typename === "ParagraphStanfordBanner" && node.suPageBanner.suBannerImage?.mediaImage
  const image = node.suPageImage?.mediaImage || pageTitleBannerImage || bannerImage

  const description = node.suPageDescription || getFirstText(node.suPageComponents)
  return <NodePageMetadata pageTitle={isHome ? undefined : node.title} description={description} image={image} />
}

export default StanfordPageMetadata
