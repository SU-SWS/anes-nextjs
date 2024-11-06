import {NodeStanfordCourse} from "@lib/gql/__generated__/drupal.d"
import {getCleanDescription} from "@lib/utils/text-tools"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

type Props = {
  node: NodeStanfordCourse
}
const StanfordCourseMetadata = ({node}: Props) => {
  const description = getCleanDescription(node.body?.processed)

  return <NodePageMetadata pageTitle={node.title} description={description} />
}
export default StanfordCourseMetadata
