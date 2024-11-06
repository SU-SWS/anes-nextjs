import {NodeStanfordEvent} from "@lib/gql/__generated__/drupal.d"
import {getCleanDescription} from "@lib/utils/text-tools"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

type Props = {
  node: NodeStanfordEvent
}
const StanfordEventMetadata = ({node}: Props) => {
  const description = node.suEventSubheadline || getCleanDescription(node.body?.processed)

  return <NodePageMetadata pageTitle={node.title} description={description} />
}
export default StanfordEventMetadata
