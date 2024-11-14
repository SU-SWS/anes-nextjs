import Link from "@components/elements/link"
import {H2, H3} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {NodeStanfordOpportunity} from "@lib/gql/__generated__/drupal.d"
import ImageCard from "@components/patterns/image-card"
import Wysiwyg from "@components/elements/wysiwyg"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordOpportunity
  headingLevel?: "h2" | "h3"
}

const StanfordOpportunityCard = ({node, headingLevel, ...props}: Props) => {
  const image = node.suOppImage?.mediaImage
  const Heading = headingLevel === "h3" ? H3 : H2

  return (
    <ImageCard {...props} aria-labelledby={node.id} imageUrl={image?.url} isArticle>
      <Heading className="[&_a]:text-black" id={node.id}>
        <Link href={node.suOppSource?.url || node.path}>{node.title}</Link>
      </Heading>
      <Wysiwyg html={node.suOppSummary?.processed || node.body?.summary} />
    </ImageCard>
  )
}
export default StanfordOpportunityCard
