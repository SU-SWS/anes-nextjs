import {NodeStanfordOpportunity} from "@lib/gql/__generated__/drupal.d"
import {getCleanDescription, getFirstText} from "@lib/utils/text-tools"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

type Props = {
  node: NodeStanfordOpportunity
}
const StanfordOpportunityMetadata = ({node}: Props) => {
  const description = getCleanDescription(node.suOppSummary?.processed, 2) || getFirstText(node.suOppComponents)
  const image = node.suOppImage?.mediaImage
  return <NodePageMetadata pageTitle={node.title} description={description} image={image} />
}
export default StanfordOpportunityMetadata
