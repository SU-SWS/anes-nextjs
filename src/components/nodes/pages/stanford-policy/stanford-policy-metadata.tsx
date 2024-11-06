import {NodeStanfordPolicy} from "@lib/gql/__generated__/drupal.d"
import {getCleanDescription} from "@lib/utils/text-tools"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

type Props = {
  node: NodeStanfordPolicy
}
const StanfordPolicyMetadata = ({node}: Props) => {
  const description = getCleanDescription(node.body?.processed)

  return <NodePageMetadata pageTitle={node.title} description={description} />
}
export default StanfordPolicyMetadata
