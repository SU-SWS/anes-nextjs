import {NodeStanfordEventSeries} from "@lib/gql/__generated__/drupal.d"
import {getFirstText} from "@lib/utils/text-tools"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

type Props = {
  node: NodeStanfordEventSeries
}
const StanfordEventSeriesMetadata = ({node}: Props) => {
  const description = node.suEventSeriesSubheadline || getFirstText(node.suEventSeriesComponents)

  return <NodePageMetadata pageTitle={node.title} description={description} />
}
export default StanfordEventSeriesMetadata
