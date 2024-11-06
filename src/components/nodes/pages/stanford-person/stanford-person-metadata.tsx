import {NodeStanfordPerson} from "@lib/gql/__generated__/drupal.d"
import {getCleanDescription} from "@lib/utils/text-tools"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

type Props = {
  node: NodeStanfordPerson
}
const StanfordPersonMetadata = ({node}: Props) => {
  const description = node.suPersonFullTitle || getCleanDescription(node.body?.processed)
  const image = node.suPersonPhoto?.mediaImage

  return (
    <NodePageMetadata pageTitle={node.title} description={description} image={image} ogType="profile">
      <meta property="profile:first_name" content={node.suPersonFirstName} />
      <meta property="profile:last_name" content={node.suPersonLastName} />
    </NodePageMetadata>
  )
}
export default StanfordPersonMetadata
