import {NodeStanfordNews} from "@lib/gql/__generated__/drupal.d"
import {getFirstText} from "@lib/utils/text-tools"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

type Props = {
  node: NodeStanfordNews
}
const StanfordNewsMetadata = ({node}: Props) => {
  const description = node.suNewsDek || getFirstText(node.suNewsComponents)
  const image =
    node.suNewsFeaturedMedia?.mediaImage ||
    (node.suNewsBanner?.__typename === "MediaImage" && node.suNewsBanner.mediaImage)
  return (
    <NodePageMetadata pageTitle={node.title} description={description} image={image} ogType="article">
      {node.suNewsPublishingDate?.time && (
        <meta property="article:published_time" content={new Date(node.suNewsPublishingDate.time).toISOString()} />
      )}
    </NodePageMetadata>
  )
}
export default StanfordNewsMetadata
