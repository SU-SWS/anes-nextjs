import {NodeStanfordPublication} from "@lib/gql/__generated__/drupal.d"
import {getFirstText} from "@lib/utils/text-tools"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

type Props = {
  node: NodeStanfordPublication
}
const StanfordPublicationMetadata = ({node}: Props) => {
  const description = getFirstText(node.suPublicationComponents)
  const image = node.suPublicationImage?.mediaImage

  return <NodePageMetadata pageTitle={node.title} description={description} image={image} />
}
export default StanfordPublicationMetadata
